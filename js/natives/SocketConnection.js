import {NativeModules, DeviceEventEmitter} from 'react-native';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import ToastModuleBis from './PlayerNotification';

console.log(NativeModules);
var socket = NativeModules.SocketConnection;
var addListenerOn;
export default {
	addListenerOn: addListenerOn,
	createSocket: function(serverUrl, token) {
		console.log("creating socket with token", token);
	    socket.createSocket(serverUrl, token);
	    ToastModuleBis.setSocketListeners();
	},
	connect: socket.connect,
	clearEvents: socket.clearEvents,
	on: function(event, callback) {
			socket.on(event);
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
	emit(event, data) {
		if (!data) {
			return socket.emit(event, null);
		}
		return socket.emit(event, JSON.stringify(data));
	}
};