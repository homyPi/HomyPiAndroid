import {Actions} from "react-native-router-flux";

function router(state = {}, action) {
	switch (action.type) {
		case Actions.BEFORE_ROUTE:
			return {...state, ready: false};
		case Actions.AFTER_FOCUS:
			return {...state, ready: true};
		default:
			return state;
	}
}

export default {
  router
};