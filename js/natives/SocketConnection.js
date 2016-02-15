import {NativeModules, DeviceEventEmitter} from "react-native";
import RCTDeviceEventEmitter from "RCTDeviceEventEmitter";
import ToastModuleBis from "./PlayerNotification";

var socket = NativeModules.SocketConnection;
var listeners = {};

function addListener(id, event, callback) {
	if (!listeners[event]) {
		listeners[event] = [];
	}
	listeners[event].push({id: id, callback: callback});
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
	    ToastModuleBis.setSocketListeners();
	},
	connect: socket.connect,
	clearEvents: socket.clearEvents,
	on: function(event, callback) {
			socket.on(event, function(listenerId) {
				addListener(listenerId, event, callback);
			});
			DeviceEventEmitter.addListener(event, function(data) {
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
	emit(event, data) {
		if (!data) {
			return socket.emit(event, null);
		}
		return socket.emit(event, JSON.stringify(data));
	}
};