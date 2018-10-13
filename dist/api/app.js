"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _express = _interopRequireDefault(require("express"));

var _fs = _interopRequireDefault(require("fs"));

var _https = _interopRequireDefault(require("https"));

var _path = _interopRequireDefault(require("path"));

var _url = _interopRequireDefault(require("url"));

var _ws = _interopRequireDefault(require("ws"));

var Service =
/*#__PURE__*/
function () {
  function Service() {
    (0, _classCallCheck2.default)(this, Service);
  }

  (0, _createClass2.default)(Service, [{
    key: "send",
    value: function send(ws, topic, content) {
      ws.send(JSON.stringify({
        topic: topic,
        content: content
      }));
    }
  }, {
    key: "test",
    value: function test(ws, session, content) {
      console.log("got test request", content, session);
      this.send(ws, "state.test", {
        message: "hello"
      });
      ws.send(JSON.stringify({
        topic: "state.test",
        content: {
          message: "hello"
        }
      }));
    }
  }, {
    key: "setNativeLanguage",
    value: function setNativeLanguage(ws, session, content) {
      session.nativeLanguage = session;
      this.send(ws, "state.nativeLanguage", session.nativeLanguage);
    }
  }, {
    key: "setRole",
    value: function setRole(ws, session, content) {
      if (content !== "USER" && content !== "TRANSLATOR") {
        console.error("invalid role", content);
        return;
      }

      session.role = content;
      this.send(ws, "state.role", session.role);
    }
  }]);
  return Service;
}();

;
var service = new Service();
var app = (0, _express.default)();
app.use("/static", _express.default.static(_path.default.join(process.cwd(), "dist", "static"), {
  index: "index.html"
}));

var key = _fs.default.readFileSync(_path.default.join(process.cwd(), "server.key"), "utf8");

var cert = _fs.default.readFileSync(_path.default.join(process.cwd(), "server.crt"), "utf8");

var server = _https.default.createServer({
  key: key,
  cert: cert
}, app);

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

      if (!body.topic || typeof body.topic !== "string") {
        console.log("invalid message", message);
        return;
      }

      if (body.topic.startsWith("api.")) {
        var method = body.topic.substr(4);

        if (!(0, _typeof2.default)(service[method]) === "function") {
          console.log("unhandled service method", method, message);
          return;
        }

        var sess = sessions.get(ws);
        service[method](ws, sess, body.content);
      } else {
        console.log("unknown message type", message);
        return;
      }
    } catch (error) {
      console.log("error!!!", error);
    }
  });
  ws.send('something');
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