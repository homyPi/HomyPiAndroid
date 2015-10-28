
import UserAPI from "./UserAPI.js"

var config = require("../config.js");
var superagent = require('superagent');

export default {

	loadPlaylist() {
		return new Promise((resolve, reject) => {
			let url = config.server_url + "/api/modules/music/playlists/";
			try {
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
			}catch(e) {console.log(e.stack);}
		});
	}
};