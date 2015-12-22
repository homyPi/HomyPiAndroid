import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import MusicSearchAPI from '../apis/MusicSearchAPI.js';


var running = {};

export default {
	search(query, type) {
		console.log("search ", query);
		MusicSearchAPI.search(query, type)
			.then(function(results) {
				Dispatcher.handleViewAction({
			        type: Constants.MusicSearchActionTypes.SET_RESULTS,
			      	results: results
			    });
			})
			.catch(function(err) {
				
			});
	},
	searchMore(query, type, nb, offset) {
		var key = query + ", " + type + ", " + nb + ", " + offset;
		if (running[key]) {
			return;
		}
		running[key] = true;
		MusicSearchAPI.search(query, type, null, nb, offset)
			.then(function(results) {
				delete running[key];
				Dispatcher.handleViewAction({
			        type: Constants.MusicSearchActionTypes.ADD_RESULTS,
			      	results: results
			    });
			})
			.catch(function(err) {
				console.log("error in MusicSearchAPI.search");
				console.log(err);
			});
	}
}