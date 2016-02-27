import { SUCCESS, NOT_LOGGED_IN } from "../actions/UserActions";
import { RECEIVE_ALL, SELECTED_RASPBERRY, STATE_CHANGED, selectedDefaultRaspberry } from "../actions/RaspberryActions";
import { getPlayer } from "../actions/PlayerActions";
import {AsyncStorage} from "react-native";
import Io from "../io";

import {Actions} from "react-native-router-flux";

const authMiddleware = store => next => action => {
	if (action.type === SUCCESS) {
		
		AsyncStorage.setItem("homyToken", action.token);
		
		Io.connect(action.token);
		next(action);
		Actions.app();
	} else if (action.type === NOT_LOGGED_IN) {
		Actions.login();
	}
	return next(action);
}

const getPlayerOnRaspberryChange  = store => next => action => {
	if (action.type === RECEIVE_ALL) {
		next(action);
		store.dispatch(selectedDefaultRaspberry(store.getState().raspberries.items));
	} else if (action.type === STATE_CHANGED) {
		next(action);
		let {user, selectedRaspberry, raspberries} = store.getState();
		switch(action.state) {
			case "UP":
				if (!selectedRaspberry || !selectedRaspberry.name) {
					store.dispatch(selectedDefaultRaspberry(raspberries.items));
				}
			case "DOWN":
				if (selectedRaspberry && selectedRaspberry.name === action.name) {
					store.dispatch(selectedDefaultRaspberry(raspberries.items));
				}
			default:
				break;
		}
		
	} else if(action.type === SELECTED_RASPBERRY) {
		next(action);
		let {user, selectedRaspberry} = store.getState();
		
		if (selectedRaspberry && selectedRaspberry.name) {
			for (var i = 0; i < selectedRaspberry.modules.length; i++) {
				if (selectedRaspberry.modules[i].name == "music" && selectedRaspberry.modules[i].state === "UP") {
						
						store.dispatch(getPlayer(user, selectedRaspberry));
					}
			}
		}
	} else {
		return next(action);
	}

};

export default {
	authMiddleware,
	getPlayerOnRaspberryChange
};