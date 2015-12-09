import UserAPI from "./UserAPI.js"

var config = require("../config.js");
var superagent = require('superagent');
var serverUrl = (config.server_url || "") + "/api/modules/music/players";

export default {
	getAll() {
		return new Promise((resolve, reject) => {
			let url = serverUrl;
			superagent.get(url)
				.set("Authorization", "Bearer " + UserAPI.getToken())
				.end(function(err, res) {
					if(err || !res.text) {
						return reject(err)
					} else {
						var resp = JSON.parse(res.text);
						if (resp.status === "error") {
							return reject(resp.error);
						} else {
							return resolve(resp.data.items);
						}
					}
				});
		});
	}
}