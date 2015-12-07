import UserAPI from "./UserAPI"

var config = require("../config.js");
var superagent = require('superagent');

export default {
	getAll() {
		return new Promise((resolve, reject) => {
			let url = config.server_url + "/api/raspberries/";
			
			superagent.get(url)
				.set("Authorization", "Bearer " + UserAPI.getToken())
  				.set('Accept', 'application/json')
				.end(function(err, res) {
					if(err) {
						console.log("errrrr");
						console.log(err.stack);
						console.log(err);
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
	}
};