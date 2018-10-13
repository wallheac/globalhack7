import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import Main from "./main";

if(!location.hash) {
    location.hash = Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

ReactDOM.render(React.createElement(Main, {}), document.getElementById("container"));
