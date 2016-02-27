import { createStore, applyMiddleware, compose } from "redux"
import thunkMiddleware from "redux-thunk"
import createLogger from "redux-logger"

import reducers from "./reducers"

import cMiddlewares from "./middlewares";
const loggerMiddleware = createLogger();



const middlewares = [thunkMiddleware, loggerMiddleware, cMiddlewares.authMiddleware, cMiddlewares.getPlayerOnRaspberryChange];

export default function configureStore(initialState) {
	const finalCreateStore = compose(
    applyMiddleware(...middlewares)
  )(createStore);

  const store = finalCreateStore(reducers, initialState);

  return store;
}