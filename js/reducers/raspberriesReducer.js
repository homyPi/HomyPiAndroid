import { combineReducers } from 'redux'
import { 
	REQUEST_ALL, RECEIVE_ALL,
	SELECTED_RASPBERRY, SELECTED_DEFAULT

} from '../actions/RaspberryActions'


function selectedRaspberry(raspberry = null, action) {
	switch(action.type) {
		case SELECTED_RASPBERRY:
			return Object.assign({}, raspberry, action.raspberry)
		case SELECTED_DEFAULT:
			let defaultRasp = null;
			let {items} = raspberries(undefined, {});
			if (items.length) {
				defaultRasp = items[0];
			}
			return Object.assign({}, raspberry, defaultRasp)
		default:
			return raspberry;
	}
}

function raspberries(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
	switch (action.type) {
		case REQUEST_ALL:
			return Object.assign({}, state, {
	        	isFetching: true
	      	});
    	case RECEIVE_ALL:
      		return Object.assign({}, state, {
        		isFetching: false,
        		didInvalidate: false,
        		items: action.items,
        		lastUpdated: action.receivedAt
     		});
     	default:
     		return state;
	}
}

const raspberriesReducer = combineReducers({
  raspberries,
  selectedRaspberry
});

export default raspberriesReducer;