import express from "express";
import http from "http";
import path from "path";
import WebSocket from "ws";

const app = express();
app.use("/static", express.static(path.join(process.cwd(), "dist", "static"), {index: "index.html"}));
const port = process.env.port || 9080;
const server = app.listen(port, () => console.log(`Listening on port ${port}!`));
const wss = new WebSocket.Server({server});
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