
import UserAPI from "./UserAPI.js"
var config = require("../config.js");
var superagent = require('superagent');

export default {
	search(request, type, nb, offset) {
		return new Promise((resolve, reject) => {
			let url = config.server_url + "/api/modules/music/search?q=" + request;
			if (type) {
				url += "&type=" + type;
			}
			if (nb) {
				url += "&limit=" + nb
			}
			if (offset) {
				url += "&offset=" + offset
			}
			url += "&source=spotify";
			superagent.get(url)
				.set("Authorization", "Bearer " + UserAPI.getToken())
				.end(function(err, res) {
					if (err) {
						console.log(err.stack);
						return console.log(err);
					}
					return resolve(JSON.parse(res.text));
				});
		});
	}
}