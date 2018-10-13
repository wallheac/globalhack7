import express from "express";
import http from "http";
import path from "path";
import url from "url";
import WebSocket from "ws";

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
        } catch(error) {
            ws.send(JSON.stringify(error));
        }
    });
    ws.send("Connected to WebSocket server");
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