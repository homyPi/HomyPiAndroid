import { 
	SET_PLAYER, SET_PLAYLIST, SET_STATUS,
	CLEAR, SET_PLAYING
} from "../actions/PlayerActions";

console.log(SET_PLAYLIST);
const defaultTrack = {
	album: {images:[{}]},
	images: [],
	artists: []
}

const defaultPlaylistState = {
	tracks: [],
	playing: defaultTrack
};

function getPlaying(idPlaying, trackset) {
	if(!idPlaying || !trackset || !trackset.length) return defaultTrack;
	console.log("searching...");
	for(let i = 0; i < trackset.length; i++) {
		if (trackset[i]._id === idPlaying) return trackset[i];
	}
	return defaultTrack
}

function playlist(state = defaultPlaylistState, action) {
	switch (action.type) {
		case SET_PLAYLIST:
			return {
				...state,
				tracks: action.playlist.trackset,
				playing: action.playing || getPlaying(action.playlist.idPlaying, action.playlist.trackset)

			}
		case SET_PLAYING: {
			return {
				...state,
				playing: action.playing
			}
		}
		case CLEAR:
			return {
				...state,
				tracks: [],
				playing: {...defaultTrack}
			}
		default:
			return state;
	}
}

function player(state = {}, action) {
	switch (action.type) {
		case SET_PLAYER:
			console.log(action);
			return {...state, ...action.player};
		case SET_STATUS:
			console.log(action);
			return {...state, status: action.status};
     	default:
     		return state;
	}
}

export default {
  player,
  playlist
};