import Settings from "../settings";

import {AsyncStorage} from "react-native";

export const REQUEST = "CONNECTION_REQUESTED";
export const SUCCESS = "CONNECTION_SUCCESS";
export const FAIL = "CONNECTION_FAILED";
export const LOGOUT = "LOGOUT";

export const NOT_LOGGED_IN = "NOT_LOGGED_IN";


export function connection_requested() {
	return {
		type: REQUEST
	}
}
export function connection_success(token) {
	return {
		type: SUCCESS,
		token
	}
}
export function connection_failed(error) {
	return {
		type: FAIL,
		error
	}
}

export function not_logged_in(error) {
	return {
		type: NOT_LOGGED_IN,
		error
	}
}

export function loadToken() {
	return dispatch => {
		AsyncStorage.getItem("homyToken", function(err, savedToken) {
			if (err || !savedToken)
				return dispatch(not_logged_in(err));
			else
				return dispatch(connection_success(savedToken));
		});
	}
}
export function logout() {
	return dispatch => {
		AsyncStorage.setItem("homyToken", "");
		dispatch({
			type: LOGOUT
		});

	}
}

export function login(username, password, ) {
	
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
			
			if (json.status === "error" || !json.token) {
				dispatch(connection_failed(json.data));
			} else {
				dispatch(connection_success(json.token));
			}
		})
	}
}
