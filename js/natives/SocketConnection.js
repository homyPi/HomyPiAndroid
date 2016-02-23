import {NativeModules, DeviceEventEmitter} from "react-native";
import RCTDeviceEventEmitter from "RCTDeviceEventEmitter";
import PlayerNotification from "./PlayerNotification";

var socket = NativeModules.SocketConnection;
var listeners = {};

var subscribedTo = [];

function addListener(id, event, callback) {
	if (!listeners[event]) {
		listeners[event] = [];
	}
	listeners[event].push({id: id, callback: callback});
}
function exist(event, callback) {
	if (!listeners[event]) return false;
	for (var i = 0; i < listeners[event].length; i++) {
	    if (listeners[event][i].callback === callback) {
	    	return true;
	    }
	}
	return false;
}
function off(event, callback) {
	if (!listeners[event]) return;
	i = listeners[event].length;
	while (i--) {
	    if (listeners[event][i].callback === callback) {
	    	socket.off(listeners[event][i].id);
	        listeners[event].splice(i, 1);
	    }
	}
}

export default {
	createSocket: function(serverUrl, token) {
		socket.createSocket(serverUrl, token);
		//DeviceEventEmitter.addListener("MQTT_STATUS", function(status) {
			setTimeout(function(){
		socket.subscribe("default");
	});
		//});
	},
	subscribe: function(topic) {
		socket.subscribe(topic);
		subscribedTo.push(topic);
	},
	unsubscribe: function(topic) {
		socket.unsubscribe(topic);
		var i = subscribedTo.indexOf(topic);
		if (i != -1)
			subscribedTo.slice(i, 1);
	},
	switchRaspberryTopic: socket.switchRaspberryTopic,
	subscribedTo: subscribedTo,
	connect: socket.connect,
	clearEvents: socket.clearEvents,
	publishToPi(event, data) {
		if (!data) {
			return socket.publishToPi(event);
		}
		return socket.publishToPi(event, JSON.stringify(data));
	},
	on: function(event, callback) {
			if (exist(event, callback)) return;
			socket.on(event, function(listenerId) {
				console.log("id = " + listenerId);
				addListener(listenerId, event, callback);
			});
			console.log("=> added ", event);
			DeviceEventEmitter.addListener(event, function(data) {
				console.log("got " + event, " with data ", data);
				var json;
				if(data) {
					try {
						json = JSON.parse(data);
					} catch(e) {
						console.log(e);
						return;
					}
				}
				callback(json);
			});

	},
	off: off,
	publish(topic="default", event, data) {
		if (!data) {
			return socket.publish(topic, event, null);
		}
		return socket.publish(topic, event, JSON.stringify(data));
	}
};