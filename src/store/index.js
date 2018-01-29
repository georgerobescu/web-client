import { createStore, applyMiddleware, compose } from "redux";
import { loadingBarMiddleware } from "react-redux-loading-bar";
import { routerMiddleware } from "react-router-redux";
import promiseMiddleware from "redux-promise-middleware";
import thunk from "redux-thunk";

import history from "../utils/history";
import rootReducer from "../reducers";
import apiErrorHandlerMiddleware from "../shared/middleware/api-error-handler-middleware/api-error-handler-middleware";

const failureSuffix = "FAILURE";
const suffixes = ["REQUEST", "SUCCESS", failureSuffix];

const initialState = {};
const enhancers = [];
const middleware = [
  thunk,
  promiseMiddleware({ promiseTypeSuffixes: suffixes }),
  apiErrorHandlerMiddleware({ failureSuffix: failureSuffix }),
  routerMiddleware(history),
  loadingBarMiddleware({
    promiseTypeSuffixes: suffixes
  })
];

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
