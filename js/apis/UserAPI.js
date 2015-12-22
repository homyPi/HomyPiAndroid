var Io = require('../io.js');
import Settings from "../settings";

var config = require("../config.js");
var AsyncStorage = require('react-native').AsyncStorage;


var token = null;



var setToken = function(newToken) {
	token = newToken;
	AsyncStorage.setItem("homyToken", token)
    //localStorage.setItem('token', token);
}

var getToken = function() {
	return token;
};

var loadStoredToken = function(callback) {
	AsyncStorage.getItem("homyToken", function(err, savedToken) {
		setToken(savedToken);
		callback(err, token);
	});
};


export default {
	loadStoredToken: loadStoredToken,
	getToken: getToken,
	login(username, password) {
		console.log("login with ", username, password, " to ", Settings.getServerUrl() + "/api/users/login");
		return new Promise(function(resolve, reject) {
			fetch(Settings.getServerUrl() + "/api/users/login",
				{
					method: "POST",
				    body: JSON.stringify({ username: username, password: password }),
				    headers: {
					    'Accept': 'application/json',
					    'Content-Type': 'application/json'
					}
				}).then(function(response) {
					console.log("post login =>", response);
					return response.json();
				}).then(function(json) {
					setToken(json.token);
					return resolve(json.token);
				}).catch(function(err) {
					console.log("login...", err);
					return reject(err);
				});
			});
	},
	logout: function() {
		setToken("");
		console.log("out: ", token);
	}
};