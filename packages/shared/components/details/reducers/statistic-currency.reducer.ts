import { ACCOUNT_CURRENCY_KEY } from "shared/middlewares/update-account-settings-middleware/update-account-settings-middleware";
import defaultReducer from "shared/reducers/reducer-creators/default-reducer";
import { loadData } from "shared/utils/localstorage";
import { ActionType, CurrencyEnum } from "shared/utils/types";

export type StatisticCurrencyDataType = CurrencyEnum;
export type TStatisticCurrencyAction = ActionType<StatisticCurrencyDataType>;
export type StatisticCurrencyState = StatisticCurrencyDataType;

const initialState: StatisticCurrencyState =
  (loadData(ACCOUNT_CURRENCY_KEY) as StatisticCurrencyDataType) || "BTC";

const statisticCurrencyReducerCreator = (type: string) => (
  state: StatisticCurrencyState = initialState,
  action: TStatisticCurrencyAction
): StatisticCurrencyDataType =>
  defaultReducer<TStatisticCurrencyAction, StatisticCurrencyDataType>(
    action,
    state,
    initialState,
    type
  );

export default statisticCurrencyReducerCreator;
