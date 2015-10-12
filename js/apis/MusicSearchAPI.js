
import UserAPI from "./UserAPI.js"
var config = require("../config.js");


export default {
	search(request, type, nb) {
		return new Promise((resolve, reject) => {
			let url = config.server_url + "/api/spotify/search?q=" + request;
			if (type) {
				url += "&type=" + type;
			}
			if (nb) {
				url += "&nb_items=" + nb
			}
			console.log("fetch " + url);
			fetch(url,
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
					return resolve(json);
				}).catch(function(err) {
					return reject(err);
				});
			});
	}
}