import { combineReducers } from "redux"

import raspberriesReducers from "./raspberriesReducer";
import alarmsReducers from "./alarmsReducers";
import playerReducers from "./playerReducers";
import searchMusicReducers from "./searchMusicReducers";
import userReducers from "./userReducers";
import routerReducers from "./routerReducers";

const reducer = combineReducers({
	...raspberriesReducers,
	...alarmsReducers,
	...playerReducers,
	...searchMusicReducers,
	...userReducers,
	...routerReducers
});

export default reducer;