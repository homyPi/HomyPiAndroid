import UserAPI from "./UserAPI.js"
import Settings from "../settings";

var superagent = require('superagent');
var serverUrl = "/api/modules/music/players";

export default {
	getAll() {
		return new Promise((resolve, reject) => {
			let url = Settings.getServerUrl() + serverUrl;
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