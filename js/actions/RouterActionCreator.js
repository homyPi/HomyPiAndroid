var Dispatcher = require('../Dispatcher');
var Constants = require('../Constants');

module.exports = {
	set(route) {
		Dispatcher.handleViewAction({
			type: Constants.RouterActionTypes.SET_ROUTE,
			route: route
      	});
	}
}