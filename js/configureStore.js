import { createStore, applyMiddleware, compose } from "redux"
import thunkMiddleware from "redux-thunk"
import createLogger from "redux-logger"


import freezeState from "redux-freeze-state";
import reducers from "./reducers"

import cMiddlewares from "./middlewares";
const loggerMiddleware = createLogger();



const middlewares = [thunkMiddleware, loggerMiddleware, cMiddlewares.authMiddleware, cMiddlewares.getPlayerOnRaspberryChange];
console.log(middlewares);
export default function configureStore(initialState) {
	const finalCreateStore = compose(
    applyMiddleware(...middlewares)
  )(createStore);

  const store = finalCreateStore(freezeState(reducers), initialState);

  return store;
}