"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _express = _interopRequireDefault(require("express"));

var _fs = _interopRequireDefault(require("fs"));

var _https = _interopRequireDefault(require("https"));

var _path = _interopRequireDefault(require("path"));

var _url = _interopRequireDefault(require("url"));

var _ws = _interopRequireDefault(require("ws"));

var _crypto = _interopRequireDefault(require("crypto"));

var _festival = _interopRequireDefault(require("festival"));

var _config = _interopRequireDefault(require("../../config.js"));

var sessions = new Map();
var calls = [];
var onlineTranslators = new Set(); //const admins = new Set();

var callSubscribers = [];
var secret = _config.default.secret;
console.log(_config.default.secret);

function getKey(callId) {
  var hmac = _crypto.default.createHmac("sha256", secret);

  hmac.update(callId);
  var correctKey = hmac.digest("hex");
  console.log("requesting key for", callId, correctKey);
  return correctKey;
}

function generatePrivateFiles(callId, userInformation) {
  console.log("generating private files", callId, userInformation);
  var correctKey = getKey(callId);
  Object.entries(userInformation).map(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    if (key === "name") return;
    var filename = "./dist/static/private/".concat(callId, "_").concat(correctKey, "_").concat(key, ".mp3");
    console.log("calling festival", value, filename);

    _festival.default.toSpeech(value, filename);
  });
}

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
      if (sessions.has(ws)) sessions.delete(ws); //if(admins.has(ws)) admins.delete(ws);

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
    /*sendAdminCalls() {
        const callRequests = calls.filter(call => call.callRequest);
        admins.forEach(adminWs => {
            this.send(ws, "state.calls", callRequests);
        });
    }*/

  }, {
    key: "test",
    value: function test(ws, session, content) {
      console.log("got test request", content);
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
    value: function setOnlineStatus(ws, session, _ref3) {
      var onlineStatus = _ref3.onlineStatus,
          translatorInformation = _ref3.translatorInformation;

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

      try {
        generatePrivateFiles(content.callId, session.userInformation);
      } catch (err) {
        console.log("error generating private files", err);
      }

      content.privateFields = Object.keys(session.userInformation);
      if (!Array.isArray(session.callRequests)) session.callRequests = [];
      session.callRequests.push(content);
      calls.push({
        callRequest: content,
        userSession: session
      });
      console.log("searching for translator for call request", content);
      var availableTranslators = Array.from(onlineTranslators.values()).filter(function (ts) {
        // @TODO don't match translators that are already on calls
        var matches = ts.translatorInformation.selectedLanguages.includes(content.voiceLanguage);
        return matches;
      });
      console.log("available translators that match: ", availableTranslators);

      if (availableTranslators.length > 0) {
        var translator = availableTranslators[0]; // @TODO add algorithm to select translator

        console.log("matched to translator", translator.translatorInformation);
        content.status = "AWAITING_RESPONSE";
        translator.callInformation = {
          userSession: session,
          callRequest: content
        }; // @TODO clean up this object before sending it to the translator

        this.send(translator.ws, "state.callInformation", translator.callInformation.callRequest);
      }

      this.send(ws, "state.callRequests", session.callRequests); //this.sendAdminCalls();
    }
  }, {
    key: "acceptCall",
    value: function acceptCall(ws, session, content) {
      if (session.userType !== "TRANSLATOR") return console.error("attempt to accept call by non-translator");
      if (!session.callInformation) return console.error("no call assigned to be accepted");
      if (session.callInformation.callRequest.status !== "AWAITING_RESPONSE") return console.error("call not in status to be accepted");
      session.callInformation.callRequest.status = "CONNECTED";
      this.send(ws, "state.callInformation", session.callInformation.callRequest);
      this.send(session.callInformation.userSession.ws, "state.callRequests", session.callInformation.userSession.callRequests); //this.sendAdminCalls();
    }
  }, {
    key: "completeCall",
    value: function completeCall(ws, session, content) {
      if (session.userType !== "TRANSLATOR") return console.error("attempt to accept call by non-translator");
      if (!session.callInformation) return console.error("no call assigned to be completed");
      if (session.callInformation.callRequest.status !== "CONNECTED") return console.error("call not in status to be completed");
      session.callInformation.callRequest.status = "COMPLETE";
      session.callInformation.callRequest.result = content;
      this.send(ws, "state.callInformation", session.callInformation.callRequest);
      this.send(session.callInformation.userSession.ws, "state.callRequests", session.callInformation.userSession.callRequests); //this.sendAdminCalls();
    }
  }, {
    key: "sendPrivate",
    value: function sendPrivate(ws, session, content) {
      var _this = this;

      if (session.userType !== "TRANSLATOR") return console.error("attempt to accept call by non-translator");
      if (!session.callInformation) return console.error("no call assigned to send private info");
      if (session.callInformation.callRequest.status !== "CONNECTED") return console.error("call not in status to send private info");
      if (!session.callInformation.userSession.userInformation[content]) return console.error("requested private field is not available");
      var callId = session.callInformation.callRequest.callId;
      var correctKey = getKey(callId);
      callSubscribers[callId].forEach(function (subWs) {
        _this.send(subWs, "playSound", "/static/private/".concat(callId, "_").concat(correctKey, "_").concat(content, ".mp3"));
      });
    }
  }, {
    key: "subscribeCall",
    value: function subscribeCall(ws, session, _ref4) {
      var callId = _ref4.callId,
          submittedKey = _ref4.key;
      var correctKey = getKey(callId);
      if (submittedKey !== correctKey) return console.error("attempt to subscribe without proper authorization");
      if (!callSubscribers[callId]) callSubscribers[callId] = [];
      callSubscribers[callId].push(ws);
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
    console.log("closed session");
    service.cleanUpSession(ws, sess);
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
var port = process.env.port || 8443;
server.listen(port, "0.0.0.0", function () {
  return console.log("Listening on port ".concat(port, "!"));
});