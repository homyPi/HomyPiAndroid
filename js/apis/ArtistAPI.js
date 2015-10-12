import UserAPI from "../apis/UserAPI"
var config = require("../config.js");


export default {
	getArtist(id) {
		return new Promise((resolve, reject) => {
			fetch(config.server_url + "/api/spotify/artists/" + id,
				{
					method: "GET",
				    headers: {
					    'Accept': 'application/json',
					    'Content-Type': 'application/json',
					    "Authorization": "Bearer " + UserAPI.getToken()
					}
				}).then(function(response) {
					return response.json();
				}).then(function(json) {
					return resolve(json.artist);
				}).catch(function(err) {
					console.log("...", err);
					return reject(err);
				});
		});
	},
	getMyArtists() {
		console.log("get my art");
		return new Promise((resolve, reject) => {
			fetch(config.server_url + "/api/users/me/artists?limit=25",
				{
					method: "GET",
				    headers: {
					    'Accept': 'application/json',
					    'Content-Type': 'application/json',
					    "Authorization": "Bearer " + UserAPI.getToken()
					}
				}).then(function(response) {
					return response.json();
				}).then(function(json) {
					return resolve(json.artists);
				}).catch(function(err) {
					console.log("...", err);
					return reject(err);
				});
		});
	}
};