import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

let _data = {albums: {items: []}, tracks: {items: []}, artists: {items: []}};
let loading = false;

function pushAll(target, values) {
  for(var i = 0; i < values.length; i++) {
    target.push(values[i]);
  }
}

function setList(resTracks, resAlbums, resArtists) {
  _data = {albums: resAlbums, tracks: resTracks, artists: resArtists};
}
function addToList(resTracks, resAlbums, resArtists) {
  pushAll(_data.tracks.items, resTracks.items);
  pushAll(_data.albums.items, resAlbums.items);
  pushAll(_data.artists.items, resArtists.items);
}
// Facebook style store creation.
const MusicSearchStore = assign({}, BaseStore, {
  // public methods used by Controller-View to operate on data
  getAll() {
    return {
      tracks: _data.tracks,
      albums: _data.albums,
      artists: _data.artists,
      loading: loading
    };
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: Dispatcher.register(function(payload) {
    let action = payload.action;
    var tracks, albums, artists;
    switch(action.type) {
      case Constants.MusicSearchActionTypes.START_LOADING:
        loading = true;
        break;
      case Constants.MusicSearchActionTypes.CLEAR:
        setList({items: []}, {items: []}, {items: []});
        MusicSearchStore.emitChange();
        break;
      case Constants.MusicSearchActionTypes.SET_RESULTS:
        tracks = action.results.tracks;
        albums = action.results.albums;
        artists = action.results.artists;
        setList(tracks ||{items: []}, albums ||{items: []}, artists ||{items: []});
        loading = false;
        MusicSearchStore.emitChange();
        break;
      case Constants.MusicSearchActionTypes.ADD_RESULTS:
        tracks = action.results.tracks;
        albums = action.results.albums;
        artists = action.results.artists;
        addToList(tracks ||{items: []}, albums ||{items: []}, artists ||{items: []});
        loading = false;
        MusicSearchStore.emitChange();
        break;
      default:
        break;

      // add more cases for other actionTypes...
    }
  })
});

export default MusicSearchStore;
