var React = require("react-native");
window.navigator.userAgent = "react-native";
var io = require('socket.io-client/socket.io');
var socket;

module.exports = {
	connect: function(token) {
		console.log("connecting to socketIo");
		this.socket = io("localhost:3000", {
    		query: 'token=' + token,
  			jsonp: false
  		});
  		this.socket.on("connect", function() {
  			console.log("connected");
  		});
	},
	socket: socket
}