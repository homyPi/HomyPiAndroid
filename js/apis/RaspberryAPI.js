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
						console.log(err.stack);
						console.log(err);
					} else {
						console.log(res)
						return resolve(JSON.parse(res.text).raspberries);
					}
				});
		});
	}
};