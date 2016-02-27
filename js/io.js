var React = require("react-native");
window.navigator.userAgent = "react-native";
var socket;
var config = require("./config.js");
import playlistSocket from "./sockets/playlistSocket"
import raspberrySocket from "./sockets/raspberrySocket"
import Settings from "./settings";
import URL from "url";


import {setSocketListeners as setPlayerNotifSocketListeners} from "./natives/PlayerNotification";
import SocketConnection from "./natives/SocketConnection";

var store = null;

function getMQTTUrl(serverUrl, token) {
  return new Promise((resolve, reject) => {
    
    fetch(serverUrl + "api/config", {
      headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
      })
      .then(response => response.json())
      .then(json => {
        
        if (json.status === "success") {
          resolve(json.config.mqtt.url);
        }
      })
  });
}

export default {
  setStore: function(s) {store = s},
  connect(token, connectedCallback, disconnectedCallback) {
    
    
    var objUrl = URL.parse(Settings.getServerUrl() + "/");
    var url = "tcp://" + objUrl.hostname + ":3005";
    SocketConnection.createSocket(url, token);
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

    setPlayerNotifSocketListeners();

    SocketConnection.connect();
  },
  socket: SocketConnection
}
