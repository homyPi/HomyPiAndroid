import Settings from "../settings";
import UserAPI from "../apis/UserAPI";

import SocketConnection from "../natives/SocketConnection";
let  {switchRaspberryTopic} = SocketConnection;
const API = "/api/raspberries";

export const REQUEST_ALL = "RASPBERRY_REQUEST_ALL";
export const RECEIVE_ALL = "RASPBERRY_RECEIVE_ALL";

export const SELECTED_RASPBERRY = "SELECTED_RASPBERRY";
export const SELECTED_DEFAULT = "SELECTED_DEFAULT";

export const STATE_CHANGED = "RASPBERRY_STATE_CHANGED";

export function requestAll(raspberries) {
	return {
		type: REQUEST_ALL,
		raspberries
	}
}
export function receiveAll(data) {
	return {
		type: RECEIVE_ALL,
		...data
	}
}

export function fetchAll(user) {
	return dispatch => {
		dispatch(requestAll())
		console.log(Settings.getServerUrl() + API + "/");
		return fetch(Settings.getServerUrl() + API + "/", {
			headers: {
				    "Accept": "application/json",
				    "Content-Type": "application/json",
				    "Authorization": "Bearer " + user.token
				}
			})
			.then(response => response.json())
			.then(json => {
				if (json.status === "error") {
					// TODO
				} else {
					dispatch(receiveAll(json.data));
					//dispatch(selectedDefaultRaspberry());
				}
			})
	}
}

export function stateChanged(name, state) {
	return {
		type: STATE_CHANGED,
		name,
		state
	}
}

export function selectedRaspberry(raspberry) {
	if (raspberry && raspberry.name)
		switchRaspberryTopic(raspberry.name)
	return {
		type: SELECTED_RASPBERRY,
		raspberry: raspberry
	}
}
export function selectedDefaultRaspberry(raspberries) {
	return selectedRaspberry(selectRaspberry(raspberries));
}

function selectRaspberry(raspberries, current) {
	let found = null;
	if (!current && raspberries && raspberries.length) {
		raspberries.every((rasp) => {
			if (rasp.state === "UP") {
				found = rasp;
				return false;
			}
			return true;
		});
		return found;
	}
}
