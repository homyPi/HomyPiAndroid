import UserAPI from "./UserAPI.js"

var config = require("../config.js");
var superagent = require('superagent');
var serverUrl = config.server_url + "/api/modules/alarms";

export default {
	getAlarms(raspberry) {
		return new Promise((resolve, reject) => {
			let url = serverUrl + "/raspberries/" + raspberry.name;
			console.log("LOAD ALARMS ", url)
			superagent.get(url)
				.set("Authorization", "Bearer " + UserAPI.getToken())
				.end(function(err, res) {
					console.log("AAAALARMS", err, res);
					if(err || !res.text) {
						return reject(err)
					} else {
						var resp = JSON.parse(res.text);
						if(resp.status === "success") {
							return resolve(resp.data.items);
						} else {
							return reject(resp.error);
						}
					}
				});
		});
	},
	deleteAlarm(alarm) {
		return new Promise((resolve, reject) => {
			let url = serverUrl + "/" + alarm._id;
			superagent.delete(url)
				.set("Authorization", "Bearer " + UserAPI.getToken())
				.end(function(err, res) {
					if (!err) {
						return resolve(alarm);
					} else {
						return reject(err);
					}
				});
		});
	},
	insertAlarm(raspberry, alarm) {
		let url = serverUrl + "/";
		return new Promise((resolve, reject) => {
			superagent.post(url)
				.send({ alarm: alarm, raspberry: raspberry })
				.set("Authorization", "Bearer " + UserAPI.getToken())
				.end(function(err, res) {
					if(err ) {
						reject(err)
					} else {
						var resp = JSON.parse(res.text)
						if (resp.error) {
							return reject(resp.error);
						} else {
							alarm._id = resp.alarm._id;
							return resolve(alarm);
						}
					}
				});
		});
	},
	updateAlarm(alarm) {
		alarm.raspberry = raspberry;
		return new Promise((resolve, reject) => {
			var url = serverUrl + "/" + alarm._id;
			superagent.put(url)
				.send({
						hours: alarm.hours,
						minutes: alarm.minutes
				})
				.set("Authorization", "Bearer " + UserAPI.getToken())
				.end(function(err, res) {
					if(err ) {
						reject(err)
					} else {
						resolve(alarm);
					}
				});
		});
	},
	enableAlarm(alarm, enabled) {
		return new Promise(function(resolve, reject) {
			var url = serverUrl + "/" + alarm._id;
			console.log(url);
			superagent.put(url)
				.send({ enable: enabled})
				.set("Authorization", "Bearer " + UserAPI.getToken())
				.end(function(err, res) {
					if(err ) {
						reject(err)
					} else {
						alarm.enable = enabled;
						resolve(alarm);
					}
				});
		});
	}
};