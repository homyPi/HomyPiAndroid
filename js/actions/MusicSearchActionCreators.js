import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import MusicSearchAPI from '../apis/MusicSearchAPI.js';


var running = {};

export default {
	search(query, type, nb) {
		var key = query + ", " + type + ", " + nb;
		if (running[key]) {
			console.log("request exists ", key, running);
			return;
		}
		running[key] = true;
		Dispatcher.handleViewAction({
			type: Constants.MusicSearchActionTypes.START_LOADING
		});
		Dispatcher.handleViewAction({
			type: Constants.MusicSearchActionTypes.CLEAR
		});
		MusicSearchAPI.search(query, type, nb)
			.then(function(results) {
				delete running[key];
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
		Dispatcher.handleViewAction({
			type: Constants.MusicSearchActionTypes.START_LOADING
		});
		Dispatcher.handleViewAction({
			type: Constants.MusicSearchActionTypes.START_LOADING
		});
		MusicSearchAPI.search(query, type, nb, offset)
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