import Settings from "../settings";

import {AsyncStorage} from "react-native";

export const REQUEST = "CONNECTION_REQUESTED";
export const SUCCESS = "CONNECTION_SUCCESS";
export const FAIL = "CONNECTION_FAILED";
export const LOGOUT = "LOGOUT";


export function connection_requested() {
	return {
		type: REQUEST
	}
}
export function connection_success(token, onLoggedIn) {
	return {
		type: SUCCESS,
		token,
		onLoggedIn
	}
}
export function connection_failed(error) {
	return {
		type: FAIL,
		error
	}
}

export function loadToken(onLoggedIn) {
	return dispatch => {
		AsyncStorage.getItem("homyToken", function(err, savedToken) {
			dispatch(connection_success(savedToken, onLoggedIn));
		});
	}
}
export function logout(onLoggedIn) {
	AsyncStorage.setItem("homyToken", "");
	dispatch({
		type: LOGOUT
	})
}

export function login(username, password, onLoggedIn) {
	console.log("request login to ", Settings.getServerUrl(), "with ", username, password);
	return dispatch => {
		dispatch(connection_requested())
	    return fetch(Settings.getServerUrl() + "/api/users/login", {
			headers: {
	        	"Accept": "application/json",
				"Content-Type": "application/json"
			},
			method: "post",
			body: JSON.stringify({
				username, password
			})
		})
		.then(response => response.json())
		.then(json => {
			if (json.status === "error") {
				dispatch(connection_failed(json.data));
			} else {
				console.log(json);
				dispatch(connection_success(json.token, onLoggedIn));
			}
		})
	}
}
