import { ReallocationsViewModel } from "gv-api-web";
import { tableSelectorCreator } from "shared/components/table/helpers/table.selector";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import tableReducerFactory from "shared/components/table/reducers/table.reducer";
import { RootState } from "shared/reducers/root-reducer";

import { FUND_REALLOCATE_HISTORY } from "../actions/fund-details.actions";
import {
  FUND_REBALANCING_DEFAULT_FILTERS,
  FUND_REBALANCING_FILTERS
} from "../fund-details.constants";

const fundReallocateHistorySelector = (state: RootState) =>
  state.fundDetails.fundHistory.reallocateHistory;

export const fundReallocateHistoryTableSelector = tableSelectorCreator<
  RootState,
  ReallocationsViewModel,
  ReallocationsViewModel
>(fundReallocateHistorySelector, "reallocations");

const fundReallocateHistoryReducer = tableReducerFactory<
  ReallocationsViewModel
>({
  type: FUND_REALLOCATE_HISTORY,
  paging: DEFAULT_PAGING,
  filtering: FUND_REBALANCING_FILTERS,
  defaultFilters: FUND_REBALANCING_DEFAULT_FILTERS
});

export default fundReallocateHistoryReducer;
