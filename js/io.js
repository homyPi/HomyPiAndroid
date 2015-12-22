var React = require("react-native");
window.navigator.userAgent = "react-native";
var io = require('socket.io-client/socket.io');
var socket;
var config = require("./config.js");
import playlistSocket from "./sockets/playlistSocket"
import raspberrySocket from "./sockets/raspberrySocket"
import Settings from "./settings";

import SocketConnection from './natives/SocketConnection';

export default {
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
    playlistSocket(SocketConnection);
    raspberrySocket(SocketConnection);
    
    SocketConnection.connect();
    this.socket = SocketConnection;
  },
  socket: socket
}
