import { 
	REQUEST, FAIL, SUCCESS, LOGOUT, NOT_LOGGED_IN
} from "../actions/UserActions"

function user(state = {
  isFetching: false,
  hasFailed: false,
  token: null,
  username: ""
}, action) {
	switch (action.type) {
		case REQUEST:
			return {...state, hasFailed: false, error: "", isFetching: true, token: null};
		case FAIL:
			return {...state, hasFailed: true, error: action.error, isFetching: false, token: null};
		case NOT_LOGGED_IN:
			return {...state, hasFailed: (!!action.error), error: action.error, isFetching: false, token: null}
		case SUCCESS:
			return {...state, hasFailed: false, error: "", isFetching: false, token: action.token};
		case LOGOUT: 
			return {...state, username: "", token: null};
     	default:
     		return {...state};
	}
}

export default {
  user
};