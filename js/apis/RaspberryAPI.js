import UserAPI from "./UserAPI"
import Settings from "../settings";

var superagent = require("superagent");

export default {
	getAll() {
		return new Promise((resolve, reject) => {
			let url = Settings.getServerUrl() + "/api/raspberries/";
			
			superagent.get(url)
				.set("Authorization", "Bearer " + UserAPI.getToken())
  				.set("Accept", "application/json")
				.end(function(err, res) {
					if(err) {
						
						
						return reject(err);
					} else {
						var parsed = JSON.parse(res.text);
						if (parsed.status === "error") {
							return reject(parsed.error);
						} else {
							return resolve(parsed.data.items);
						}
					}
				});
		});
	},
	
};