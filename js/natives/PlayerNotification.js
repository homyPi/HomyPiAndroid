import {NativeModules} from 'react-native';
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

var PlaylistStore = require("../stores/PlaylistStore");
var ToastModuleBis = NativeModules.ToastModuleBis
var setPlaying = function() {
	track = PlaylistStore.getAll().playing;
	if (track && track.name) {
		ToastModuleBis.setTrackName(track.name);
		if (track.artists) {
			var artistsStr = "";
			track.artists.forEach(function(artist) {
				artistsStr += artist.name + "; ";
			});
			ToastModuleBis.setArtists(artistsStr);
		}
		if (track.album && track.album.images &&
			track.album.images.length) {
			ToastModuleBis.setCover(track.album.images[0].url);
		}
		ToastModuleBis.show();
	}
};
PlaylistStore.addChangeListener(setPlaying);
setPlaying();

export default ToastModuleBis;