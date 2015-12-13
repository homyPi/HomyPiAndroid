
import UserAPI from "./UserAPI.js"
var config = require("../config.js");
var superagent = require('superagent');
var serverUrl = (config.server_url || "") + "/api/modules/music";


export default {
	search(request, type, source, nb, offset) {
		return new Promise((resolve, reject) => {
			console.log("in api");
			let url = serverUrl + "/search?q=" + request;
			if (type) {
				url += "&type=" + type;
			}
			if (nb) {
				url += "&limit=" + nb
			}
			if (offset) {
				url += "&offset=" + offset
			}
			source = source || "spotify";
			url += "&source=" + source;
			superagent.get(url)
				.set("Authorization", "Bearer " + UserAPI.getToken())
				.end(function(err, res) {
					if(err || !res.body) {
						return reject(err)
					} else {
						var resp = res.body
						resolve(resp);
					}
				});
			
		});
	}
}