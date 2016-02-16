import Settings from "../settings";
import UserAPI from "../apis/UserAPI";

const PLAYER_API = "/api/modules/music/players";
const PLAYLIST_API = "/api/modules/music/playlists";

export const SET_PLAYER = "SET_PLAYER";
export const SET_STATUS = "SET_STATUS";
export const SET_PLAYLIST = "SET_PLAYLIST";

export const SET_PLAYING = "SET_PLAYING_IN_PLAYLIST";
export const CLEAR = "CLEAR_PLAYLIST";
export const ADD = "ADD_IN_PLAYLIST";
export const REMOVE = "REMOVE_FROM_PLAYLIST";


export function setPlayer(player) {
	return {
		type: SET_PLAYER,
		player
	}
}
export function setPlaylist(playlist) {
	return {
		type: SET_PLAYLIST,
		playlist
	}
}
export function clear() {
	return {
		type: CLEAR
	}
}
export function playing(trackPlaying) {
	return {
		type: SET_PLAYING,
		playing: trackPlaying
	}
}


export function status(status) {
		    	console.log("SET_STATUS");
	return {
		type: SET_STATUS,
		status
	}
}


export function getPlaylist(user, player) {
  if (!user || !user.token) throw new Error("missing user or token in getPlaylist");
	return dispatch => {
		return fetch(Settings.getServerUrl() + PLAYLIST_API + "/" + player.name, {
			headers: {
				    'Accept': 'application/json',
				    'Content-Type': 'application/json',
				    "Authorization": "Bearer " + user.token
				}
			})
			.then(response => response.json())
			.then(json => {
				if (json.status === "error") {
					// TODO
				} else {
					dispatch(setPlaylist(json.playlist));
				}
			})
	}
}

export function getPlayer(user, raspberry) {
  if (!user || !user.token) throw new Error("missing user or token in getPlayer");
	return dispatch => {
		return fetch(Settings.getServerUrl() + PLAYER_API + "/" + raspberry.name, {
			headers: {
				    'Accept': 'application/json',
				    'Content-Type': 'application/json',
				    "Authorization": "Bearer " + user.token
				}
			})
			.then(response => response.json())
			.then(json => {
				if (json.status === "error") {
					console.log("ERROR ", json);
				} else {
					console.log("got player => ", json);
					dispatch(setPlayer(json.data));
					dispatch(getPlaylist(user, json.data));
				}
			})
	}
}
