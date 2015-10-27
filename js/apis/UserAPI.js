var Io = require('../io.js');

var config = require("../config.js");
var AsyncStorage = require('react-native').AsyncStorage;


var token = null;

var setToken = function(newToken) {
	token = newToken;
	try {
		//Io.connect(token);
	} catch(e) {
		console.log(e);
	}
	AsyncStorage.setItem("homyToken", token);
    //localStorage.setItem('token', token);
}

var getToken = function() {
	return token;
};

var loadStoredToken = function(callback) {
	AsyncStorage.getItem("homyToken", function(err, savedToken) {
		setToken(savedToken);
		console.log(token);
		callback(err, token);
	});
};


export default {
	loadStoredToken: loadStoredToken,
	getToken: getToken,
	login(username, password) {
		return new Promise(function(resolve, reject) {
			fetch(config.server_url + "/api/users/login",
				{
					method: "POST",
				    body: JSON.stringify({ username: username, password: password }),
				    headers: {
					    'Accept': 'application/json',
					    'Content-Type': 'application/json'
					}
				}).then(function(response) {
					return response.json();
				}).then(function(json) {
					setToken(json.token);
					return resolve(json.token);
				}).catch(function(err) {
					console.log("login...", err);
					return reject(err);
				});
			});
	}
};