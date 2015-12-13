import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import MusicSearchAPI from '../apis/MusicSearchAPI.js';


var running = {};

export default {
	search(query) {
		console.log("search ", query);
		MusicSearchAPI.search(query)
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
		/*
		Dispatcher.handleViewAction({
			type: Constants.MusicSearchActionTypes.START_LOADING
		});
*/
		MusicSearchAPI.search(query, type, null, nb, offset)
			.then(function(results) {
				delete running[key];
				Dispatcher.handleViewAction({
			        type: Constants.MusicSearchActionTypes.ADD_RESULTS,
			      	results: results
			    });
			})
			.catch(function(err) {
				
			});
	}
}