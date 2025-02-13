import { combineReducers } from "redux";
import apiReducerFactory from "shared/reducers/reducer-creators/api-reducer";

import { CREATE_FUND } from "../actions/create-fund.actions";

const createFundReducer = apiReducerFactory({
  apiType: CREATE_FUND
});

const fundSettingsReducer = combineReducers({
  form: createFundReducer
});

export default fundSettingsReducer;
