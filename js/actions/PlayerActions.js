import Settings from "../settings";
import UserAPI from "../apis/UserAPI";

const PLAYER_API = "/api/modules/music/players";
const PLAYLIST_API = "/api/modules/music/playlists";

export const SET_PLAYER = "SET_PLAYER";
export const SET_STATUS = "SET_STATUS";
export const REMOVE_PLAYER = "REMOVE_PLAYER";

export const SET_PLAYLIST = "SET_PLAYLIST";
export const SET_PLAYING = "SET_PLAYING_IN_PLAYLIST";
export const CLEAR = "CLEAR_PLAYLIST";
export const ADD_TRACK = "ADD_TRACK";
export const ADD_TRACKSET = "ADD_TRACKSET";
export const REMOVE = "REMOVE_FROM_PLAYLIST";


export function setPlayer(player) {
	return {
		type: SET_PLAYER,
		player
	}
}
export function removePlayer() {
	return {
		type: REMOVE_PLAYER
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
export function playing(idPlaying) {
	return {
		type: SET_PLAYING,
		idPlaying
	}
}
export function status(status, idPlaying) {
	return {
		type: SET_STATUS,
		status,
		idPlaying
	}
}
export function add(data) {
	if (data.track) {
		return {
			type: ADD_TRACK,
			track: data.track
		}
	}
	if (data.trackset) {
		return {
			type: ADD_TRACKSET,
			track: data.trackset
		}
	}
}


export function getPlaylist(user, player) {
  if (!user || !user.token) throw new Error("missing user or token in getPlaylist");
	return dispatch => {
		return fetch(Settings.getServerUrl() + PLAYLIST_API + "/" + player.name, {
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
					dispatch(setPlaylist(json.playlist));
				}
			})
	}
}

export function getPlayer(user, raspberry) {
	return dispatch => {
  	if (!user || !user.token || !raspberry || !raspberry.name) return;
		console.log("fetch " + (Settings.getServerUrl() + PLAYER_API + "/" + raspberry.name));
		return fetch(Settings.getServerUrl() + PLAYER_API + "/" + raspberry.name, {
			headers: {
				    "Accept": "application/json",
				    "Content-Type": "application/json",
				    "Authorization": "Bearer " + user.token
				}
			})
			.then(response => response.json())
			.then(json => {
				if (json.status === "error") {
					console.log("ERROR ", json);
				} else {
					console.log("got player => ", json);
					if (json.data && json.data.name) {
						dispatch(setPlayer(json.data));
						dispatch(getPlaylist(user, json.data));
					}
				}
			})
	}
}
