var assign = require('object-assign');
var Constants = require('../Constants');
var {EventEmitter} = require('events');

module.exports = assign({}, EventEmitter.prototype, {
  // Allow Controller-View to register itself with store
  addChangeListener(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },

  // triggers change listener above, firing controller-view callback
  emitChange() {
    try {
    this.emit(Constants.CHANGE_EVENT);
     }catch(e){console.log(e);}
  }
});
