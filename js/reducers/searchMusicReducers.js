import { 
	REQUEST, RECEIVED, RECEIVED_MORE
} from '../actions/MusicSearchActions'

const defaultStates = {
	  	isFetching: false,
	  	query: "gorillaz",
		items:[],
		limit: 0,
		offset:0,
		total:0
}

function searchAlbums(state=defaultStates, action) {
	switch (action.type) {
		case REQUEST:
			return {
				...state,
				query: action.query,
				isFetching: true
			}
     	case RECEIVED:
     		if (!action.albums || !Array.isArray(action.albums.items)) return state;
			return {
				...state,
				isFetching: false,
				...action.albums
			};
     	case RECEIVED_MORE:
     		if (!action.albums || !Array.isArray(action.albums.items)) return state;
			return {
				...state,
				isFetching: false,
				...action.albums,
				items: state.items.concat(action.albums.items)
			};
		default:
     		return state;
	}
}
function searchArtists(state=defaultStates, action) {
	switch (action.type) {
		case REQUEST:
			return {
				...state,
				query: action.query,
				isFetching: true
			}
     	case RECEIVED:
     		if (!action.artists || !Array.isArray(action.artists.items)) return state;
			return {
				...state,
				isFetching: false,
				...action.artists
			};
     	case RECEIVED_MORE:
     		if (!action.artists || !Array.isArray(action.artists.items)) return state;
			return {
				...state,
				isFetching: false,
				...action.artists,
				items: state.items.concat(action.artists.items)
			};
		default:
     		return state;
	}
}
function searchTracks(state=defaultStates, action) {
	switch (action.type) {
		case REQUEST:
			return {
				...state,
				query: action.query,
				isFetching: true
			}
     	case RECEIVED:
     		if (!action.tracks || !Array.isArray(action.tracks.items)) return state;
			return {
				...state,
				isFetching: false,
				...action.tracks
			};
     	case RECEIVED_MORE:
     		if (!action.tracks || !Array.isArray(action.tracks.items)) return state;
			return {
				...state,
				isFetching: false,
				...action.tracks,
				items: state.items.concat(action.tracks.items)
			};
		default:
     		return state;
	}
}

function searchMusic(state = {
  isFetching: false,
  didInvalidate: false,
  query: "gorillaz",
  albums: defaultStates,
  artists: defaultStates,
  tracks: defaultStates
}, action) {
	switch (action.type) {
		case REQUEST:
			return {
				...state,
				isFetching: true,
				query: action.query,
				albums: searchAlbums(state.albums, action),
				artists: searchArtists(state.artists, action),
				tracks: searchTracks(state.tracks, action)
			};
     	case RECEIVED:
			return {
				...state,
				isFetching: false,
				albums: searchAlbums(state.albums, action),
				artists: searchArtists(state.artists, action),
				tracks: searchTracks(state.tracks, action)
			};
     	case RECEIVED_MORE:
			return {
				...state,
				isFetching: false,
				albums: searchAlbums(state.albums, action),
				artists: searchArtists(state.artists, action),
				tracks: searchTracks(state.tracks, action)
			};
     	default:
     		return state;
	}
}

export default {
  searchMusic,
  searchAlbums,
  searchArtists,
  searchTracks
};