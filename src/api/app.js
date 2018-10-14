import express from "express";
import fs from "fs";
import https from "https";
import path from "path";
import url from "url";
import WebSocket from "ws";

const sessions = new Map();
const calls = [];
const onlineTranslators = new Set();
//const admins = new Set();
const callSubscribers = [];

class Service {
    // @TODO these two methods need to be protected, so they can't be called from the client
    cleanUpSession(ws, session) {
        if(sessions.has(ws)) sessions.delete(ws);
        //if(admins.has(ws)) admins.delete(ws);
        if(onlineTranslators.has(session)) onlineTranslators.delete(session);
    }
    send(ws, topic, content) {
        ws.send(JSON.stringify({topic, content}));
    }
    /*sendAdminCalls() {
        const callRequests = calls.filter(call => call.callRequest);
        admins.forEach(adminWs => {
            this.send(ws, "state.calls", callRequests);
        });
    }*/
    test(ws, session, content) {
        console.log("got test request", content);
        this.send(ws, "state.test", {message: "hello"});
        ws.send(JSON.stringify({topic: "state.test", content: {message: "hello"}}));
    }
    setLanguage(ws, session, content) {
        session.language = content;
        this.send(ws, "state.language", session.language);
    }
    setUserType(ws, session, content) {
        if(content !== "USER" && content !== "TRANSLATOR") {
            console.error("invalid userType", content);
            return;
        }
        session.userType = content;
        this.send(ws, "state.userType", session.userType);
    }
    setOnlineStatus(ws, session, {onlineStatus, translatorInformation}) {
        if(session.userType !== "TRANSLATOR") {
            console.error("attempt to set online status for non-translator");
            return;
        }

        if(typeof onlineStatus !== "boolean") {
            console.error("attempt to set online status to non-boolean value");
            return;
        }

        if(!translatorInformation.selectedLanguages.includes(session.language)) translatorInformation.selectedLanguages.push(session.language);
        // add translators when they go online
        if(onlineStatus && !onlineTranslators.has(session)) {
            onlineTranslators.add(session);
        }
        // delete translators that go offline
        if(!onlineStatus && onlineTranslators.has(session)) {
            onlineTranslators.delete(session);
        }

        session.translatorInformation = translatorInformation;
        session.onlineStatus = onlineStatus;
        this.send(ws, "state.onlineStatus", session.onlineStatus);
    }
    setUserInformation(ws, session, content) {
        if(session.userType !== "USER") {
            console.error("attempt to set user information for non-user");
            return;
        }

        // @TODO validate this
        session.userInformation = content;

        this.send(ws, "state.userInformation", session.userInformation);
    }
    requestCall(ws, session, content) {
        console.log("received call request", content);
        if(session.userType !== "USER") return console.error("attempt to request call as a non-user");

        if(!Array.isArray(session.callRequests)) session.callRequests = [];
        session.callRequests.push(content);

        calls.push({callRequest: content, userSession: session});
        console.log("searching for translator for call request", content);

        const availableTranslators = Array.from(onlineTranslators.values()).filter(ts => {
            console.log("check translator", ts);
            // @TODO don't match translators that are already on calls
            const matches = ts.translatorInformation.selectedLanguages.includes(content.voiceLanguage);
            console.log("matches?", matches);
            return matches;
        });

        console.log("available translators that match: ", availableTranslators);
        if(availableTranslators.length > 0) {
            const translator = availableTranslators[0]; // @TODO add algorithm to select translator
            console.log("matched to translator", translator);
            content.status = "AWAITING_RESPONSE";
            translator.callInformation = {userSession: session, callRequest: content};
            // @TODO clean up this object before sending it to the translator
            this.send(translator.ws, "state.callInformation", translator.callInformation.callRequest);
        }
        this.send(ws, "state.callRequests", session.callRequests);
        //this.sendAdminCalls();
    }
    acceptCall(ws, session, content) {
        if(session.userType !== "TRANSLATOR") return console.error("attempt to accept call by non-translator");
        if(!session.callInformation) return console.error("no call assigned to be accepted");
        if(session.callInformation.callRequest.status !== "AWAITING_RESPONSE") return console.error("call not in status to be accepted");

        session.callInformation.callRequest.status = "CONNECTED";
        this.send(ws, "state.callInformation", session.callInformation.callRequest);
        this.send(session.callInformation.userSession, "state.callRequests", session.callInformation.userSession.callRequests);
        //this.sendAdminCalls();
    }
    completeCall(ws, session, content) {
        if(session.userType !== "TRANSLATOR") return console.error("attempt to accept call by non-translator");
        if(!session.callInformation) return console.error("no call assigned to be completed");
        if(session.callInformation.callRequest.status !== "CONNECTED") return console.error("call not in status to be completed");

        session.callInformation.callRequest.status = "COMPLETE";
        session.callInformation.callRequest.result = content;

        this.send(ws, "state.callInformation", session.callInformation.callRequest);
        this.send(session.callInformation.userSession, "state.callRequests", session.callInformation.userSession.callRequests);
        //this.sendAdminCalls();

    }
    sendPrivate(ws, session, content) {
        if(session.userType !== "TRANSLATOR") return console.error("attempt to accept call by non-translator");
        if(!session.callInformation) return console.error("no call assigned to send private info");
        if(session.callInformation.callRequest.status !== "CONNECTED") return console.error("call not in status to send private info");

        callSubscribers[session.callInformation.callRequest.callId].forEach(subWs => {
            this.send(subWs, "playSound", "urlhere");
        });
    }
    subscribeCall(ws, session, content) {
        if(!callSubscribers[content]) callSubscribers[content] = [];
        callSubscribers[content].push(ws);
    }
};
const service = new Service();
const app = express();
app.use("/static", express.static(path.join(process.cwd(), "dist", "static"), {index: "index.html"}));
const key = fs.readFileSync(path.join(process.cwd(), "server.key"), "utf8");
const cert = fs.readFileSync(path.join(process.cwd(), "server.crt"), "utf8");
const server = https.createServer({key, cert}, app);
const wss = new WebSocket.Server({noServer: true});
wss.on("connection", (ws, req) => {
    sessions.set(ws, {});
    ws.on("message", message => {
        console.log("received: %s", message);
        try {
            const body = JSON.parse(message);
            if(!body.topic || typeof body.topic !== "string") {
                console.log("invalid message", message);
                return;
            }
            if(body.topic.startsWith("api.")) {
                const method = body.topic.substr(4);
                if(!typeof service[method] === "function") {
                    console.log("unhandled service method", method, message);
                    return;
                }
                const sess = sessions.get(ws);
                sess.ws = ws;
                (service[method])(ws, sess, body.content);
            } else {
                console.log("unknown message type", message);
                return;
            }
        } catch(error) {
            console.log("error!!!", error);
        }
    });
    ws.on("close", () => {
        const sess = sessions.get(ws);
        console.log("closed session", sess);
        service.cleanUpSession(ws, sess);
    });
});
server.on("upgrade", (req, socket, head) => {
    const pathname = url.parse(req.url).pathname;
    console.log(pathname);
    if(pathname === "/test") {
        wss.handleUpgrade(req, socket, head, ws => {
            wss.emit("connection", ws, req);
        });
    }
});
const port = process.env.port || 9080;
server.listen(port, () => console.log(`Listening on port ${port}!`));
