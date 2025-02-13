import { combineReducers } from "redux";
import { StatisticCurrencyState } from "shared/components/details/reducers/statistic-currency.reducer";
import { StatisticPeriodState } from "shared/components/details/reducers/statistic-period.reducer";
import statisticCurrencyReducer from "shared/components/programs/program-details/reducers/statistic-currency.reducer";
import statisticPeriodReducer from "shared/components/programs/program-details/reducers/statistic-period.reducer";
import clearableReducer from "shared/reducers/clearable.reducer";

import programBalanceChartReducer, {
  ProgramBalanceChartState
} from "./balance-chart.reducer";
import programDescriptionReducer, {
  ProgramDescriptionState
} from "./description.reducer";
import levelParametersReducer, {
  LevelParametersState
} from "./level-parameters.reducer";
import programProfitChartReducer, {
  ProgramProfitChartState
} from "./profit-chart.reducer";
import programHistoryReducer, {
  ProgramHistoryState
} from "./program-history.reducer";

type ProgramDetailsDataType = Readonly<{
  statisticPeriod: StatisticPeriodState;
  statisticCurrency: StatisticCurrencyState;
  profitChart: ProgramProfitChartState;
  balanceChart: ProgramBalanceChartState;
  description: ProgramDescriptionState;
  levelParameters: LevelParametersState;
  programHistory: ProgramHistoryState;
}>;

export type ProgramDetailsState = ProgramDetailsDataType;

const programDetailsReducer = clearableReducer(
  combineReducers<ProgramDetailsState>({
    statisticPeriod: statisticPeriodReducer,
    statisticCurrency: statisticCurrencyReducer,
    levelParameters: levelParametersReducer,
    description: programDescriptionReducer,
    profitChart: programProfitChartReducer,
    balanceChart: programBalanceChartReducer,
    programHistory: programHistoryReducer
  })
);

export default programDetailsReducer;
