import UserAPI from "./UserAPI.js"
import Settings from "../settings";

var superagent = require("superagent");
var serverUrl = "/api/modules/music";


export default {
	search(request, type, source, nb, offset) {
		return new Promise((resolve, reject) => {
			
			let url = Settings.getServerUrl() + serverUrl + "/search?q=" + request;
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