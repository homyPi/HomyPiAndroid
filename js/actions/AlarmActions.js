import Settings from "../settings";
import UserAPI from "../apis/UserAPI";
import AlarmAPI from "../apis/AlarmAPI";

const API = "/api/modules/alarms";

export const REQUEST_ALL = "ALARM_REQUEST_ALL";
export const RECEIVE_ALL = "ALARM_RECEIVE_ALL";
export const NEW = "ALARM_NEW";
export const DELETED = "ALARM_DELETED";
export const UPDATED = "ALARM_UPDATED";

export function requestAll(alarms) {
  return {
    type: REQUEST_ALL,
    alarms
  }
}
export function receiveAll(data) {
  return {
    type: RECEIVE_ALL,
    ...data
  }
}
export function added(data) {
  return {
    type: NEW,
    alarm: data
  }
}
export function deleted(alarm) {
  return {
    type: DELETED,
    alarm
  }
}
export function updated(data) {
  return {
    type: UPDATED,
    alarm: data
  }
}

export function fetchAll(user, raspberry) {
  if (!user || !user.token) throw new Error("missing user or token");
  return dispatch => {
    if (!raspberry || !raspberry.name) return new Error("missing raspberry name");
    dispatch(requestAll())
    return fetch(Settings.getServerUrl() + API + "/raspberries/" + raspberry.name, {
      headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + user.token
        }
      })
      .then(response => response.json())
      .then(json => {
        if (json.status === "error") {
              return reject(resp.error);
        } else {
            dispatch(receiveAll(json.data));
        }
      })
  }
}

export function setEnable(user, alarm, enable) {
  if (!user || !user.token) throw new Error("missing user or token");
  return dispatch => {
    return fetch(Settings.getServerUrl() + API + "/" + alarm._id, {
        headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": "Bearer " + user.token
        },
        method: "put",
        body: JSON.stringify({
          enable
        })
      })
      .then(response => response.json())
      .then(json => {
        console.log("RESPONSE = ", json);
        if (json.status === "error") {
              return reject(resp.error);
        } else {
            alarm.enable  = enable
            dispatch(updated(alarm));
        }
      })
  }
}

export function addAlarm(user, raspberry, alarm) {
  if (!user || !user.token) throw new Error("missing user or token");
  return dispatch => {
    return fetch(Settings.getServerUrl() + API + "/", {
        headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": "Bearer " + user.token
        },
        method: "post",
        body: JSON.stringify({ alarm, raspberry })
      })
      .then(response => response.json())
      .then(json => {
        console.log("add alarm RESPONSE = ", json);
        if (json.status === "error") {
              return reject(json.error);
        } else {
            console.log("dispatch", alarm, json.alarm._id);
            alarm._id = json.alarm._id;
            dispatch(added(alarm));
        }
      })
  }
}

export function removeAlarm(user, alarm) {
  if (!user || !user.token) throw new Error("missing user or token");
  return dispatch => {
    return fetch(Settings.getServerUrl() + API + "/" + alarm._id, {
        headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": "Bearer " + user.token
        },
        method: "delete"
      })
      .then(response => response.json())
      .then(json => {
        console.log("RESPONSE = ", json);
        if (json.status === "error") {
              return reject(resp.error);
        } else {
            dispatch(deleted(alarm));
        }
      })
  }
}
