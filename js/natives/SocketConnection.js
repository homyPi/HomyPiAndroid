import {NativeModules, DeviceEventEmitter} from 'react-native';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import ToastModuleBis from './PlayerNotification';


var socket = NativeModules.SocketConnection;
var addListenerOn;
export default {
	addListenerOn: addListenerOn,
	createSocket: function(serverUrl, token) {
	    socket.createSocket(serverUrl, token);
	    ToastModuleBis.setSocketListeners();
	},
	connect: socket.connect,
	on: function(event, callback) {
			socket.on(event);
			DeviceEventEmitter.addListener(event, function(data) {
				var json;
				console.log("got event " + event + " with data", data);
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
	emit(event, data) {
		try {
		console.log("emit '" + event + "'", data);
		if (!data) {
			return socket.emit(event, null);
		}
		return socket.emit(event, JSON.stringify(data));
	} catch(e) {
		console.log(e);
	}
	}
};