
import UserAPI from "./UserAPI.js"

var config = require("../config.js");
var superagent = require('superagent');
var serverUrl = (config.server_url || "") + "/api/modules/music/playlists";

export default {
	loadPlaylist(raspberry) {
		return new Promise((resolve, reject) => {
			var url = serverUrl + "/" + raspberry.name;
			superagent.get(url)
				.set("Authorization", "Bearer " + UserAPI.getToken())
				.end(function(err, res) {
					if(err || !res.text) {
						if (err) {
							console.log(err.stack);
						}
						console.log(err)
						return reject(err);
					} else {
						return resolve(JSON.parse(res.text).playlist);
					}
				});
		});
	}
};