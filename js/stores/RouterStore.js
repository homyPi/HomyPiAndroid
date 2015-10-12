var Dispatcher = require( '../Dispatcher');
var Constants = require('../Constants');
var BaseStore = require('./BaseStore');
var assign = require('object-assign');

// data storage
let route = null;

var setRoute = function(newRoute) {
  route = newRoute;
}

// Facebook style store creation.
const RouterStore = assign({}, BaseStore, {
  // public methods used by Controller-View to operate on data
  getRoute() {
    return route;
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: Dispatcher.register(function(payload) {
    let action = payload.action;
    switch(action.type) {
      case Constants.RouterActionTypes.SET:
        newRoute = action.route;
        setRoute(newRoute);
        RouterStore.emitChange();
        break;
      default:
        break;

      // add more cases for other actionTypes...
    }
  })
});

module.exports = RouterStore;
