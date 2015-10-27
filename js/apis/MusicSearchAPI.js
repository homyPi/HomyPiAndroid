
import UserAPI from "./UserAPI.js"
var config = require("../config.js");
var superagent = require('superagent');

export default {
	search(request, type, nb) {
		return new Promise((resolve, reject) => {
			let url = config.server_url + "/api/modules/music/search?q=" + request;
			if (type) {
				url += "&type=" + type;
			}
			if (nb) {
				url += "&limit=" + nb
			}
			url += "&source=spotify";
			console.log(url);
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