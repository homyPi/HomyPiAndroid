import {NativeModules} from "react-native";
var RCTDeviceEventEmitter = require("RCTDeviceEventEmitter");

let PlayerNotification = NativeModules.PlayerNotification;
let store;
let unsubscribe;

var setPlaying = function(player, track) {

	if (track && track.name) {
		PlayerNotification.setPlayerName(player.name);
		PlayerNotification.setTrackName(track.name);
		if (track.artists) {
			var artistsStr = "";
			track.artists.forEach(function(artist) {
				artistsStr += artist.name + "; ";
			});
			PlayerNotification.setArtists(artistsStr);
		}
		if (track.album && track.album.images &&
			track.album.images.length) {
			PlayerNotification.setCover(track.album.images[0].url);
		}
		PlayerNotification.show();
	}
};
export function subscribe(newStore) {
	if (unsubscribe) unsubscribe();
	store = newStore;
	var currentState = store.getState().playlist;
	store.subscribe(() => {
    	let nextState = store.getState().playlist;
    	if (currentState.playing !== nextState.playing) {
    		setPlaying(store.getState().player, nextState.playing);
    	}
    	currentState = nextState;
	});
}

export function setSocketListeners() {
	PlayerNotification.setSocketListeners();
}

export default PlayerNotification;
