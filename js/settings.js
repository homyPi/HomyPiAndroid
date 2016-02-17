var AsyncStorage = require("react-native").AsyncStorage;

var serverUrl = null;

var isValidUrl = function(url) {
	var urlregex = /^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/;
    if (!url.endsWith("/")) {
    	url = url + "/";
    }
    return urlregex.test(url);
}

var setServerUrl = function(newServerUrl) {
	if(!isValidUrl(newServerUrl)) {
		newServerUrl = null;
	}
	serverUrl = newServerUrl;
	AsyncStorage.setItem("homyServerUrl", serverUrl);
}

var getServerUrl = function() {
	return serverUrl;
};

var loadStoredServerUrl = function(callback) {
	AsyncStorage.getItem("homyServerUrl", function(err, saved) {
		setServerUrl(saved);
		callback(err, serverUrl);
	});
};

export default {
	isValidUrl: isValidUrl,
	getServerUrl: getServerUrl,
	setServerUrl: setServerUrl,
	loadStoredServerUrl: loadStoredServerUrl
}