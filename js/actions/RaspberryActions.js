import Settings from "../settings";
import UserAPI from "../apis/UserAPI"

const API = "/api/raspberries";

export const REQUEST_ALL = "REQUEST_ALL";
export const RECEIVE_ALL = "RECEIVE_ALL";

export const SELECTED_RASPBERRY = "SELECTED_RASPBERRY";
export const SELECTED_DEFAULT = "SELECTED_DEFAULT";

export const UPDATE_STATUS = "UPDATE_STATUS";
export const NEW = "NEW";
export const REMOVE = "REMOVE";

export function requestAll(raspberries) {
	return {
		type: REQUEST_ALL,
		raspberries
	}
}
export function receiveAll(data) {
	console.log("receiveAll===>", data)
	return {
		type: RECEIVE_ALL,
		...data
	}
}

export function fetchAll(raspberries) {
	return dispatch => {
		dispatch(requestAll())
		return fetch(Settings.getServerUrl() + API + "/", {
			headers: {
				    'Accept': 'application/json',
				    'Content-Type': 'application/json',
				    "Authorization": "Bearer " + UserAPI.getToken()
				}
			})
			.then(response => response.json())
			.then(json => {
				if (json.status === "error") {
					// TODO
				} else {
					dispatch(receiveAll(json.data));
					dispatch(selectedDefaultRaspberry());
				}
			})
	}
}

export function selectedRaspberry(raspberry) {
	return {
		type: SELECTED_RASPBERRY,
		raspberry: raspberry
	}
}
export function selectedDefaultRaspberry() {
	return {
		type: SELECTED_DEFAULT
	}
}
SELECTED_DEFAULT