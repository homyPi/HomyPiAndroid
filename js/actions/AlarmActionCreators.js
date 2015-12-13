import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import AlarmAPI from '../apis/AlarmAPI';

export default {
  clear() {
    Dispatcher.handleViewAction({
      type: Constants.ActionTypes.CLEAR
    });
  },
  loadAlarms(raspberry) {
    AlarmAPI.getAlarms(raspberry).then(function(alarms){
      Dispatcher.handleViewAction({
        type: Constants.ActionTypes.SET_ALARMS,
        alarms: alarms
      });
    }).catch(function(err) {
      
    });
  },
  deleteAlarm(alarm) {
    AlarmAPI.deleteAlarm(alarm).then(function(alarm) {
    Dispatcher.handleViewAction({
        type: Constants.ActionTypes.DELETE_ALARM,
        alarm: alarm
      });
    }).catch(function(err) {
      
    })
  },
  addAlarm(raspberry, alarm) {
    AlarmAPI.insertAlarm(raspberry, alarm).then(function(alarm) {
      
    Dispatcher.handleViewAction({
        type: Constants.ActionTypes.ADD_ALARM,
        alarm: alarm,
        raspberry: raspberry
      });
    })
  },
  editAlarm(raspberry, alarm) {
    let apiFunction;
    alarm.hours = alarm.date.getHours();
    alarm.minutes = alarm.date.getMinutes();
    if(!alarm._id) {
      apiFunction = AlarmAPI.insertAlarm;
    } else {
      apiFunction = AlarmAPI.updateAlarm;
    }
    apiFunction(raspberry, alarm).then(function() {
      Dispatcher.handleViewAction({
        type: Constants.ActionTypes.UPDATE_ALARM,
        alarm: alarm
      });
    }).catch(function(err) {
      
    });
  },
  enableAlarm(alarm, enabled) {
    alarm.enable = enabled;
    console.log(alarm);
    Dispatcher.handleViewAction({
      type: Constants.ActionTypes.UPDATE_ALARM,
      alarm: alarm
    });
    AlarmAPI.enableAlarm(alarm, enabled).then(function() {
      
    }).catch(function(err) {
      alarm.enable = !enabled;
      Dispatcher.handleViewAction({
        type: Constants.ActionTypes.UPDATE_ALARM,
        alarm: alarm
      });
    });
  }
};
