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

var sessions = new Map();
var calls = [];
var onlineTranslators = new Set();

var Service =
/*#__PURE__*/
function () {
  function Service() {
    (0, _classCallCheck2.default)(this, Service);
  }

  (0, _createClass2.default)(Service, [{
    key: "cleanUpSession",
    // @TODO these two methods need to be protected, so they can't be called from the client
    value: function cleanUpSession(ws, session) {
      if (sessions.has(session)) sessions.delete(session);
      if (onlineTranslators.has(session)) onlineTranslators.delete(session);
    }
  }, {
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
    key: "setLanguage",
    value: function setLanguage(ws, session, content) {
      session.language = content;
      this.send(ws, "state.language", session.language);
    }
  }, {
    key: "setUserType",
    value: function setUserType(ws, session, content) {
      if (content !== "USER" && content !== "TRANSLATOR") {
        console.error("invalid userType", content);
        return;
      }

      session.userType = content;
      this.send(ws, "state.userType", session.userType);
    }
  }, {
    key: "setOnlineStatus",
    value: function setOnlineStatus(ws, session, _ref) {
      var onlineStatus = _ref.onlineStatus,
          translatorInformation = _ref.translatorInformation;

      if (session.userType !== "TRANSLATOR") {
        console.error("attempt to set online status for non-translator");
        return;
      }

      if (typeof onlineStatus !== "boolean") {
        console.error("attempt to set online status to non-boolean value");
        return;
      }

      if (!translatorInformation.selectedLanguages.includes(session.language)) translatorInformation.selectedLanguages.push(session.language); // add translators when they go online

      if (onlineStatus && !onlineTranslators.has(session)) {
        onlineTranslators.add(session);
      } // delete translators that go offline


      if (!onlineStatus && onlineTranslators.has(session)) {
        onlineTranslators.delete(session);
      }

      session.translatorInformation = translatorInformation;
      session.onlineStatus = onlineStatus;
      this.send(ws, "state.onlineStatus", session.onlineStatus);
    }
  }, {
    key: "setUserInformation",
    value: function setUserInformation(ws, session, content) {
      if (session.userType !== "USER") {
        console.error("attempt to set user information for non-user");
        return;
      } // @TODO validate this


      session.userInformation = content;
      this.send(ws, "state.userInformation", session.userInformation);
    }
  }, {
    key: "requestCall",
    value: function requestCall(ws, session, content) {
      console.log("received call request", content);
      if (session.userType !== "USER") return console.error("attempt to request call as a non-user");
      if (!Array.isArray(session.callRequests)) session.callRequests = [];
      session.callRequests.push(content);
      calls.push({
        callRequest: content,
        userSession: session
      });
      console.log("searching for translator for call request", content);
      var availableTranslators = Array.from(onlineTranslators.values()).filter(function (ts) {
        console.log("check translator", ts); // @TODO don't match translators that are already on calls

        var matches = ts.translatorInformation.selectedLanguages.includes(content.voiceLanguage);
        console.log("matches?", matches);
        return matches;
      });
      console.log("available translators that match: ", availableTranslators);

      if (availableTranslators.length > 0) {
        var translator = availableTranslators[0]; // @TODO add algorithm to select translator

        console.log("matched to translator", translator);
        content.status = "AWAITING_RESPONSE";
        translator.callInformation = {
          userSession: session,
          callRequest: content
        }; // @TODO clean up this object before sending it to the translator

        this.send(translator.ws, "state.callInformation", translator.callInformation.callRequest);
      }

      this.send(ws, "state.callRequests", session.callRequests);
    }
  }, {
    key: "acceptCall",
    value: function acceptCall(ws, session, content) {
      if (session.userType !== "TRANSLATOR") return console.error("attempt to accept call by non-translator");
      if (!session.callInformation) return console.error("no call assigned to be accepted");
      if (session.callInformation.callRequest.status !== "AWAITING_RESPONSE") return console.error("call not in status to be accepted");
      session.callInformation.callRequest.status = "CONNECTED";
      this.send(session, "state.callInformation", session.callInformation.callRequest);
      this.send(session.callInformation.userSession, "state.callRequests", session.callInformation.userSession.callRequests);
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
        sess.ws = ws;
        service[method](ws, sess, body.content);
      } else {
        console.log("unknown message type", message);
        return;
      }
    } catch (error) {
      console.log("error!!!", error);
    }
  });
  ws.on("close", function () {
    var sess = sessions.get(ws);
    console.log("closed session", sess);
    service.cleanUpSession(sess);
  });
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