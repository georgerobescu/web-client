import { routerMiddleware } from "connected-react-router";
import { applyMiddleware, compose, createStore } from "redux";
import debounceMiddleware from "redux-debounced";
import { createPromise } from "redux-promise-middleware";
import thunk from "redux-thunk";
import apiErrorHandlerMiddleware from "shared/middlewares/api-error-handler-middleware/api-error-handler-middleware";
import clearOnceMetaMiddleware from "shared/middlewares/clear-once-meta-middleware/clear-once-meta-middleware";
import gtmMiddleware from "shared/middlewares/gtm-middleware/gtm-middleware";
import refreshTokenMiddleware from "shared/middlewares/refresh-token-middleware/refresh-token-middleware";
import { updateAccountCurrencyMiddleware } from "shared/middlewares/update-account-settings-middleware/update-account-settings-middleware";
import {
  FAILURE_SUFFIX,
  REQUEST_SUFFIX,
  SUCCESS_SUFFIX
} from "shared/reducers/reducer-creators/api-reducer";
import authApi from "shared/services/api-client/auth-api";
import authService from "shared/services/auth-service";
import history from "shared/utils/history";

import rootReducer from "../reducers";

const suffixes = [REQUEST_SUFFIX, SUCCESS_SUFFIX, FAILURE_SUFFIX];

const reduxDevTools =
  process.env.NODE_ENV === "development" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__();

const initialState = {};
const enhancers = [];
if (reduxDevTools) {
  enhancers.push(reduxDevTools);
}
const middleware = [
  debounceMiddleware(),
  gtmMiddleware(),
  clearOnceMetaMiddleware(),
  thunk,
  refreshTokenMiddleware(authService, authApi.updateAuthToken.bind(authApi)),
  createPromise({ promiseTypeSuffixes: suffixes }),
  apiErrorHandlerMiddleware({ failureSuffix: FAILURE_SUFFIX }),
  routerMiddleware(history),
  updateAccountCurrencyMiddleware
];

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
