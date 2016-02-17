import { 
	REQUEST_ALL, RECEIVE_ALL,
	SELECTED_RASPBERRY, SELECTED_DEFAULT, STATE_CHANGED
} from "../actions/RaspberryActions"

const defaultRaspberry = {
	_id: null,
	ip: null,
	modules: [],
	name: null,
	socketId: null,
	state: "DOWN"
};



function selectedRaspberry(state = defaultRaspberry, action) {
	switch (action.type) {
		case SELECTED_RASPBERRY:
			return {...state, ...action.raspberry};
		default:
			return state;
	}
}

function raspberry(state = defaultRaspberry, action) {

}

function raspberries(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
	switch (action.type) {
		case REQUEST_ALL:
			return {...state, isFetching: true};
    	case RECEIVE_ALL:
      		return {...state,
        		isFetching: false,
        		didInvalidate: false,
        		items: action.items,
        		lastUpdated: action.receivedAt
     		};
     	case STATE_CHANGED:
            var items;
            var index = 0;
            var item = state.items.find(function(rasp, i) {
                if (rasp.name === action.name) {
                    index = i;
                    return true;
                }
                return false;
            });
            if (item) {
                item = {...item, state: action.state};
                items = [
                    ...state.items.slice(0, index),
                    item,
                    ...state.items.slice(++index)
                ];
            }
            return {
                ...state,
                items: items || state.items
            }
     	case SELECTED_RASPBERRY:
			return {...state, ...action.raspberry};
     	default:
     		return {...state};
	}
}

export default {
  selectedRaspberry,
  raspberries
};