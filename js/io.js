var React = require("react-native");
window.navigator.userAgent = "react-native";
var socket;
var config = require("./config.js");
import playlistSocket from "./sockets/playlistSocket"
import raspberrySocket from "./sockets/raspberrySocket"
import Settings from "./settings";

import SocketConnection from "./natives/SocketConnection";

var store = null;

export default {
  setStore: function(s) {store = s},
  connect(token, connectedCallback, disconnectedCallback) {
    
    console.log("connect socket");
    SocketConnection.createSocket(Settings.getServerUrl() + "/", token);
    SocketConnection.clearEvents();
    if (connectedCallback && typeof connectedCallback === "function") {
      SocketConnection.on("connect", connectedCallback);
      SocketConnection.on("reconnect", connectedCallback);
    }
    if (disconnectedCallback && typeof disconnectedCallback === "function") {
      SocketConnection.on("disconnect", disconnectedCallback);
    }
    playlistSocket(SocketConnection, store);
    raspberrySocket(SocketConnection, store);
    
    SocketConnection.connect();
  },
  socket: SocketConnection
}
