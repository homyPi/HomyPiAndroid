import Settings from "../settings";
import UserAPI from "../apis/UserAPI";

const API = "/api/modules/music";

export const REQUEST = "SEARCH_MUSIC_REQUEST_ALL";
export const RECEIVED = "SEARCH_MUSIC_RECEIVED";
export const RECEIVED_MORE = "SEARCH_MUSIC_RECEIVED_MORE";


export function requestAll(query) {
	return {
		type: REQUEST,
		query
	}
}
export function received(data) {
	return {
		type: RECEIVED,
		...data
	}
}
export function receivedMore(data) {
	return {
		type: RECEIVED_MORE,
		...data
	}
}


export function search(user, query, type, nb, offset, source="spotify") {
	let request = "q=" + query + "&source=" + source;
	request += (type)? ("&type=" + type) : "";
	request += (nb)? ("&limit=" + nb) : "";
	request += (offset)? ("&offset=" + offset) : "";
	
	return dispatch => {
		dispatch(requestAll(query))
		return fetch(Settings.getServerUrl() + API + "/search?" + request, {
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
					if (!offset)
						dispatch(received(json));
					else
						dispatch(receivedMore(json));
				}
			})
	}
}
