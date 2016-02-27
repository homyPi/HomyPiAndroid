import { 
	SET_PLAYER, REMOVE_PLAYER, SET_STATUS,
	SET_PLAYLIST, CLEAR, SET_PLAYING,
	ADD_TRACK, ADD_TRACKSET
} from "../actions/PlayerActions";


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
	
	for(let i = 0; i < trackset.length; i++) {
		
		if (trackset[i]._id === idPlaying) {
			
			return trackset[i];
		}
	}
	return defaultTrack
}

function playlist(state = defaultPlaylistState, action) {
	switch (action.type) {
		case SET_PLAYLIST:
			return {
				...state,
				tracks: action.playlist.tracks,
				playing: action.playing || getPlaying(action.playlist.idPlaying, action.playlist.tracks)

			}
		case SET_PLAYING: {
			return {
				...state,
				playing: getPlaying(action.idPlaying, state.tracks)
			}
		}
		case SET_STATUS : {
			if (action.idPlaying === undefined) return state;
			return {
				...state,
				playing: getPlaying(action.idPlaying, state.tracks)
			}
		}
		case ADD_TRACK: {
			var tracks = [
				...state.tracks,
				action.track
			];
			return {
				...state,
				tracks,
				playing: getPlaying(state.idPlaying, tracks)
			};
		}
		case ADD_TRACKSET: {
			var tracks = [
				...state.tracks,
				...action.trackset
			];
			return {
				...state,
				tracks,
				playing: getPlaying(state.idPlaying, tracks)
			};

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
			
			return {...state, ...action.player};
		case SET_STATUS:
			
			return {...state, status: action.status};
		case REMOVE_PLAYER:
			return {};
     	default:
     		return state;
	}
}

export default {
  player,
  playlist
};