var React = require("react-native");
window.navigator.userAgent = "react-native";
var io = require('socket.io-client/socket.io');
var socket;
var config = require("./config.js");
import playlistSocket from "./sockets/playlistSocket"
import raspberrySocket from "./sockets/raspberrySocket"

import SocketConnection from './natives/SocketConnection';

export default {
  connect(token) {
    
    console.log("connect socket");
    SocketConnection.createSocket(config.server_url + "/", token);
    SocketConnection.clearEvents();
    SocketConnection.on("connect", function() {
      console.log("socket connected");
    });
    playlistSocket(SocketConnection);
    raspberrySocket(SocketConnection);
    
    SocketConnection.connect();
    this.socket = SocketConnection;
  },
  socket: socket
}
