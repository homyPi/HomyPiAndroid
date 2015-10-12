import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import ArtistAPI from '../apis/ArtistAPI';

export default {
	getAll() {
		ArtistAPI.getMyArtists()
			.then(function(results) {
				console.log("got it", Constants);
				Dispatcher.handleViewAction({
			        type: Constants.ActionTypes.SET_MY_ARTISTS,
			      	artists: results
			    });
			})
			.catch(function(err) {
				
			});
	}
}