import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import Main from "./main";
import Model from "../model/app";

let callId = null;
let key = null;
if(!location.search) {
    callId = Math.floor(Math.random() * 0xFFFFFF).toString();
} else {
    const query = {};
    location.search.replace(/^\?/, "").split("&").forEach(part => {
        const [k, v] = part.split("=");
        query[decodeURIComponent(k)] = decodeURIComponent(v);
    });
    callId = query.callId;
    key = query.key;
    if(key) {
        console.log("Subsribe Call");
        Model.subscribeCall({callId, key});
    }
}

ReactDOM.render(React.createElement(Main, {key, callId}), document.getElementById("container"));
