import {
  CancelablePromise,
  FundBalanceChart,
  FundDetailsFull,
  FundProfitChart,
  ReallocationsViewModel
} from "gv-api-web";
import {
  ChartDefaultPeriod,
  getDefaultPeriod
} from "shared/components/chart/chart-period/chart-period.helpers";
import { TStatisticCurrencyAction } from "shared/components/details/reducers/statistic-currency.reducer";
import { TStatisticPeriodAction } from "shared/components/details/reducers/statistic-period.reducer";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import fundsApi from "shared/services/api-client/funds-api";
import { ApiAction, CurrencyEnum } from "shared/utils/types";

import { FundAssetsViewModel } from "../reducers/fund-history.reducer";
import { FundProfitChartDataType } from "../reducers/profit-chart.reducer";

export const SET_FUND_STATISTIC_PERIOD = "SET_FUND_STATISTIC_PERIOD";
export const SET_FUND_STATISTIC_CURRENCY = "SET_FUND_STATISTIC_CURRENCY";
export const FETCH_FUND_PROFIT_CHART = "FETCH_FUND_PROFIT_CHART";
export const FETCH_FUND_BALANCE_CHART = "FETCH_FUND_BALANCE_CHART";
export const FETCH_FUND_DESCRIPTION = "FETCH_FUND_DESCRIPTION";

export const FUND_REALLOCATE_HISTORY = "FUND_REALLOCATE_HISTORY";
export const FUND_STRUCTURE = "FUND_STRUCTURE";

const sendFundChartRequest = (
  { start, end }: ChartDefaultPeriod,
  id: string,
  currency: CurrencyEnum
): CancelablePromise<FundProfitChart> =>
  fundsApi.getFundProfitChart(id, {
    dateFrom: start,
    dateTo: end,
    maxPointCount: 100,
    currency
  });

export const fetchFundProfitChartAction = (
  id: string,
  period = getDefaultPeriod(),
  currencies: CurrencyEnum[]
): ApiAction<FundProfitChartDataType> => ({
  type: FETCH_FUND_PROFIT_CHART,
  payload: Promise.all(
    currencies.map(currency => sendFundChartRequest(period, id, currency))
  ) as CancelablePromise<FundProfitChartDataType>
});

export const fetchFundBalanceChartAction = (
  id: string,
  period = getDefaultPeriod(),
  currency: CurrencyEnum
): ApiAction<FundBalanceChart> => ({
  type: FETCH_FUND_BALANCE_CHART,
  payload: fundsApi.getFundBalanceChart(id, {
    currency,
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  })
});

export const fetchFundDescriptionAction = (
  id: string,
  authorization: string
): ApiAction<FundDetailsFull> => ({
  type: FETCH_FUND_DESCRIPTION,
  payload: fundsApi.getFundDetails(id, { authorization })
});

export const statisticCurrencyAction = (
  currency: CurrencyEnum
): TStatisticCurrencyAction => ({
  type: SET_FUND_STATISTIC_CURRENCY,
  payload: currency
});

export const statisticPeriodAction = (
  period: ChartDefaultPeriod
): TStatisticPeriodAction => ({
  type: SET_FUND_STATISTIC_PERIOD,
  payload: period
});

export const fundReallocateHistoryAction = (
  fundId: string,
  filters?: FilteringType
): ApiAction<ReallocationsViewModel> => ({
  type: FUND_REALLOCATE_HISTORY,
  payload: fundsApi.getReallocationsHistory(fundId, filters)
});

export const fundStructureAction = (
  fundId: string
): ApiAction<FundAssetsViewModel> => ({
  type: FUND_STRUCTURE,
  payload: fundsApi
    .getFundAssets(fundId)
    .then(data => ({ ...data, total: data.assets.length }))
});
