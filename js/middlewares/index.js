import { SUCCESS } from "../actions/UserActions";
import { RECEIVE_ALL, SELECTED_RASPBERRY, selectedDefaultRaspberry } from "../actions/RaspberryActions";
import { getPlayer } from "../actions/PlayerActions";
import {AsyncStorage} from "react-native";
import Io from "../io";


const authMiddleware = store => next => action => {
	if (action.type === SUCCESS) {
		console.log("success in authMiddleware", action);
		AsyncStorage.setItem("homyToken", action.token);
		console.log("connect socket");
		Io.connect(action.token);
	}
	return next(action);
}

const getPlayerOnRaspberryChange  = store => next => action => {
	if (action.type === RECEIVE_ALL) {
		console.log("DDIIIIIIIIIIIIISPATCH", store, store.getState());
		next(action);
		store.dispatch(selectedDefaultRaspberry(store.getState().raspberries.items));
	} else if(action.type === SELECTED_RASPBERRY) {
		next(action);
		let {user, selectedRaspberry} = store.getState();
		store.dispatch(getPlayer(user, selectedRaspberry));
	}else {
		return next(action);
	}

};

export default {
	authMiddleware,
	getPlayerOnRaspberryChange
};