import { combineReducers } from 'redux'

import raspberriesReducers from "./raspberriesReducer";
import alarmsReducers from "./alarmsReducers";
import playerReducers from "./playerReducers";
import searchMusicReducers from "./searchMusicReducers";
import userReducers from "./userReducers";

const reducer = combineReducers({
	...raspberriesReducers,
	...alarmsReducers,
	...playerReducers,
	...searchMusicReducers,
	...userReducers
});

export default reducer;