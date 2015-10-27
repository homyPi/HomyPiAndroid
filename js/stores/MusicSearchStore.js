import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

let _data = {albums: {items: []}, tracks: {items: []}, artists: {items: []}};


function setList(resTracks, resAlbums, resArtists) {
  _data = {albums: resAlbums, tracks: resTracks, artists: resArtists};
}
// Facebook style store creation.
const MusicSearchStore = assign({}, BaseStore, {
  // public methods used by Controller-View to operate on data
  getAll() {
    return {
      tracks: _data.tracks,
      albums: _data.albums,
      artists: _data.artists
    };
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: Dispatcher.register(function(payload) {
    let action = payload.action;
    switch(action.type) {
      case Constants.MusicSearchActionTypes.SET_RESULTS:
        let {tracks, albums, artists} = action.results;
        setList(tracks ||{items: []}, albums ||{items: []}, artists ||{items: []});
        MusicSearchStore.emitChange();
        break;
      default:
        break;

      // add more cases for other actionTypes...
    }
  })
});

export default MusicSearchStore;
