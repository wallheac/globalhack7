import express from "express";
import http from "http";
import path from "path";
import url from "url";
import WebSocket from "ws";

class Service {
    test(ws, session, content) {
        console.log("got test request", content, session);
        ws.send(JSON.stringify({topic: "state.test", content: {message: "hello"}}));
    }
    setNativeLanguage(ws, session, content) {
        session.nativeLanguage = session;
    }
    setRole(ws, session, content) {
        if(content !== "USER" && content !== "TRANSLATOR") {
            console.error("invalid role", content);
            return;
        }
        session.role = content;
        ws.send(JSON.stringify({topic: "state.role", content: session.role}));
    }
};
const service = new Service();
const app = express();
app.use("/static", express.static(path.join(process.cwd(), "dist", "static"), {index: "index.html"}));
const server = http.createServer(app);
const wss = new WebSocket.Server({noServer: true});
const sessions = new Map();
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
