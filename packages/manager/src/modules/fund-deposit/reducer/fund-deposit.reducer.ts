import { FundInvestInfo } from "gv-api-web";
import {
  FETCH_DEPOSIT_FUND_INFO,
  INVEST_TO_FUND_BY_ID
} from "modules/fund-deposit/fund-deposit.constants";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/api-reducer/api-reducer";

const depositInfo = apiReducerFactory<FundInvestInfo>({
  apiType: FETCH_DEPOSIT_FUND_INFO
});
const investFundSubmitReducer = apiReducerFactory<any>({
  apiType: INVEST_TO_FUND_BY_ID
});

export type FundDepositState = Readonly<{
  readonly info: IApiState<FundInvestInfo>;
  readonly submit: IApiState<any>;
}>;

export default combineReducers<FundDepositState>({
  info: depositInfo,
  submit: investFundSubmitReducer
});
