import UserAPI from "../apis/UserAPI"
import Settings from "../settings";
var superagent = require('superagent');

var serverUrl = "/api/modules/music";


export default {
	getSources() {
		return new Promise((resolve, reject) => {
			let url = Settings.getServerUrl() + serverUrl + "/sources";
			superagent.get(url)
				.set("Authorization", "Bearer " + UserAPI.getToken())
				.end(function(err, res) {
					if(err || !res.text) {
						return reject(err);
					} else {
						return resolve(JSON.parse(res.text));
					}
				});
		});
	},
	updateFavoriteMusicSource(musicSource) {
		return new Promise((resolve, reject) => {
			let url = Settings.getServerUrl() + serverUrl + "/sources/music";
			superagent.post(url)
				.send({'source': musicSource})
				.set("Authorization", "Bearer " + UserAPI.getToken())
				.end(function(err, res) {
					if(err || !res.text) {
						reject(err)
					} else {
						resolve(resp);
					}
				});
		});
	},
	updateFavoritePlaylistSource(playlistSource) {
		return new Promise((resolve, reject) => {
			let url = Settings.getServerUrl() + serverUrl + "/sources/playlist";
			superagent.post(url)
				.send({'source': playlistSource})
				.set("Authorization", "Bearer " + UserAPI.getToken())
				.end(function(err, res) {
					if(err || !res.text) {
						reject(err)
					} else {
						resolve(resp);
					}
				});
		});
	}
}