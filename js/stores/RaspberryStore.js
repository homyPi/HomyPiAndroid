import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

// data storage
let raspberries = [];
let selected = null;
let selectedName = null;
let selectedKey = null;
var newRaspberryListeners = [];
var removeRaspberryListeners = [];
var onChangeRaspberryListeners = [];

function selectDefault() {
  //var favName = localStorage.getItem('selectedRaspberry');
  //var raspberry = getRaspberry(favName);
  var raspberry = null;
  if (raspberry && raspberry.state === "UP") {
      selected = raspberry;
      selectedName = favName;
      selectedKey = getRaspberryKey(favName);
  } else if (!selected) {
      selected = null;
      selectedName = null;
      selectedKey = null;
    if (raspberries.length) {
      for (var i = 0; i < raspberries.length; i++) {
        if (raspberries[i].state === "UP") {
          selectedName = raspberries[i].name;
          selected = raspberries[i];
          selectedKey = i;
          break;
        }
      }
    }
  }
  //localStorage.setItem('selectedRaspberry', selectedName);
}
function setRaspberries(list) {
  raspberries = [];
  for(var i = 0; i < list.length; i++) {
    addRaspberry(list[i]);
  }
  selectDefault();
}
function setRaspberry(raspberry) {
  var index = getRaspberryKey(raspberry.name);
  if (index < 0) {
    addRaspberry(raspberry)
  } else {
    raspberries[index] = raspberry;
  }
}
function addRaspberry(rasp) {
  var inList = getRaspberry(rasp.name);
  if (!inList)
    raspberries.push(rasp);
}
function removeRaspberry(name) {
  for(var i = 0; i < raspberries.length; i++) {
    if (raspberries[i].name == name) {
      raspberries.splice(i, 1);
    }
  }
  if (name == selectedName) {
    selected = null;
    selectedName = null;
    selectDefault();
  }
}
function disableRaspberry(name) {
  let rasp = getRaspberry(name);
  if (rasp) {
    rasp.status = "DOWN";
  }

}

function setSelected(raspberry) {
  selected = null;
  selectedName = raspberry.name;
  for(var i = 0; i < raspberries.length; i++) {
    if (raspberries[i].name == selectedName) {
      selected = raspberries[i];
      selectedKey = i;
    }
  }
  if (!selected) {
     selectDefault();
  }
  //localStorage.setItem('selectedRaspberry', selectedName);
}

function getRaspberry(name) {
  if (!name) return;
  for(var i = 0; i < raspberries.length; i++) {
    if (raspberries[i].name === name) {
      return raspberries[i];
    }
  }
  return;
}
function getRaspberryKey(name) {
  for(var i = 0; i < raspberries.length; i++) {
    if (raspberries[i].name === name) {
      return i;
    }
  }
  return -1;
}

function newModule(data) {
  console.log("newModule", data);
  console.log("raspberries", raspberries);
  for(var i = 0; i < raspberries.length; i++) {
      if (data.socketId ===  raspberries[i].socketId) {
        raspberries[i].modules = raspberries[i].modules || {};
        raspberries[i].modules[data.module] = data;
      }
  }
}


// Facebook style store creation.
const RaspberryStore = assign({}, BaseStore, {
  getAll() {
    return {
      raspberries: raspberries,
      selectedRaspberry: raspberries[selectedKey],
      getRaspberry: getRaspberry
    };
  },
  getRaspberry: getRaspberry,
  dispatcherIndex: Dispatcher.register(function(payload) {
    let action = payload.action;
    switch(action.type) {
      case Constants.RaspberryActionTypes.GET_ALL:
        try {
        let list = action.list;
        setRaspberries(list);
          RaspberryStore.emitChange();
        } catch(e) {
          console.log(e);
          console.log(e.stack);
        }
        break;
      case Constants.RaspberryActionTypes.GET:
        setRaspberry(action.raspberry);
        RaspberryStore.emitChange();
        break;
      case Constants.RaspberryActionTypes.SET_SELECTED:
        let selectedRaspberry = action.raspberry;
        setSelected(selectedRaspberry);
        RaspberryStore.emitChange();
        break;
      case Constants.RaspberryActionTypes.NEW:
        let raspberry = action.raspberry;
        addRaspberry(raspberry);
        selectDefault();
        RaspberryStore.emitChange();
        break;
      case Constants.RaspberryActionTypes.REMOVE:
        let nameRemoved = action.name;
        removeRaspberry(nameRemoved);
        RaspberryStore.emitChange();
        break;
      case Constants.RaspberryActionTypes.DISABLE:
        let nameDisable = action.name;
        disableRaspberry(nameDisable);
        RaspberryStore.emitChange();
        break;
      case Constants.RaspberryActionTypes.NEW_MODULE:
        newModule(action.data);
        RaspberryStore.emitChange();
        break;
      default:
        break;
      // add more cases for other actionTypes...
    }
  })
});

export default RaspberryStore;
