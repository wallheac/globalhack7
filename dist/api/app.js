"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _path = _interopRequireDefault(require("path"));

var _url = _interopRequireDefault(require("url"));

var _ws = _interopRequireDefault(require("ws"));

var app = (0, _express.default)();
app.use("/static", _express.default.static(_path.default.join(process.cwd(), "dist", "static"), {
  index: "index.html"
}));

var server = _http.default.createServer(app);

var wss = new _ws.default.Server({
  noServer: true
});
var sessions = new Map();
wss.on("connection", function (ws, req) {
  sessions.set(ws, {});
  ws.on("message", function (message) {
    console.log("received: %s", message);

    try {
      var body = JSON.parse(message);
    } catch (error) {
      ws.send(JSON.stringify(error));
    }
  });
  ws.send("Connected to WebSocket server");
});
server.on("upgrade", function (req, socket, head) {
  var pathname = _url.default.parse(req.url).pathname;

  console.log(pathname);

  if (pathname === "/test") {
    wss.handleUpgrade(req, socket, head, function (ws) {
      wss.emit("connection", ws, req);
    });
  }
});
var port = process.env.port || 9080;
server.listen(port, function () {
  return console.log("Listening on port ".concat(port, "!"));
});