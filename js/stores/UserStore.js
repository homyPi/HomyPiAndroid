var Dispatcher = require('../Dispatcher');
var Constants = require('../Constants');
var BaseStore = require('./BaseStore');
var assign = require('object-assign');

// data storage
let token = null;



// Facebook style store creation.
var UserStore = assign({}, BaseStore, {
  // public methods used by Controller-View to operate on data
  getAll() {
    return {
      token: token
    };
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: Dispatcher.register(function(payload) {
    let action = payload.action;
    switch(action.type) {
      case Constants.UserActionTypes.LOGIN_SUCCESS:
        
        token = action.token;
        localStorage.setItem('token', token);
        UserStore.emitChange();
        break;
      default:
        break;

      // add more cases for other actionTypes...
    }
  })
});

module.exports = UserStore;
