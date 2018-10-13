import express from "express";
import http from "http";
import path from "path";
import url from "url";
import WebSocket from "ws";

const sessions = new Map();
const calls = [];
const onlineTranslators = new Set();

class Service {
    cleanUpSession(ws, session) {
        if(sessions.has(session)) sessions.delete(session);
        if(onlineTranslators.has(session)) onlineTranslators.delete(session);
    }
    send(ws, topic, content) {
        ws.send(JSON.stringify({topic, content}));
    }
    test(ws, session, content) {
        console.log("got test request", content, session);
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
        if(session.userType !== "USER") {
            console.error("attempt to request call as a non-user");
            return;
        }

        if(!Array.isArray(session.callRequests)) session.callRequests = [];
        session.callRequests.push(content);

        calls.push({callRequest: content, userSession: session});
        console.log("searching for translator for call request", content);

        const availableTranslators = Array.from(onlineTranslators.values()).filter(ts => {
            console.log("check translator", ts);
            const matches = ts.translatorInformation.selectedLanguages.includes(content.voiceLanguage);
            console.log("matches?", matches);
            return  matches;
        });

        console.log("available translators that match: ", availableTranslators);


    }
};
const service = new Service();
const app = express();
app.use("/static", express.static(path.join(process.cwd(), "dist", "static"), {index: "index.html"}));
const server = http.createServer(app);
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
        service.cleanUpSession(sess);
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
