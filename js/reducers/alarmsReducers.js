import { 
	REQUEST_ALL, RECEIVE_ALL,
  NEW, DELETED, UPDATED

} from '../actions/AlarmActions'

function alarm(state = {}, action) {
  switch (action.type) {
    case NEW:
      return {
            ...state,
            ...action.alarm
           };
    case UPDATED:
      if (action.alarm._id === state._id) {
      return {
          ...state,
          ...action.alarm
        };
      } else {
        return state;
      }
    default:
      return state;
  }
}

function alarms(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
	switch (action.type) {
		case REQUEST_ALL:
			return {
            ...state,
	        	isFetching: true
	         };
    	case RECEIVE_ALL:
      		return {
            ...state,
        		isFetching: false,
        		didInvalidate: false,
        		items: action.items.map(a => alarm(undefined, {type: NEW, alarm: a})),
        		lastUpdated: action.receivedAt
     		   };
      case UPDATED:
        return {
          ...state,
          items: state.items.map(a => alarm(a, action))
        }
      case NEW:
        return {
          ...state,
          items: state.items.concat([alarm(undefined, action)])
        }
      case DELETED:
        let newItems = [];
        state.items.forEach(alarm => {
          if (action.alarm._id !== alarm._id)
            newItems.push(alarm);
        })
        return {
          ...state,
          items: newItems
        }
     	default:
     		return state;
	}
}


export default {
  alarms
};