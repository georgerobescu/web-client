import { FundsListOld } from "gv-api-web";
import {
  DASHBOARD_FUNDS_DEFAULT_FILTERING,
  DASHBOARD_FUNDS_FILTERS
} from "shared/components/dashboard/dashboard.constants";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import tableReducerFactory from "shared/components/table/reducers/table.reducer";

import {
  CLEAR_DASHBOARD_ASSETS_TABLE,
  DASHBOARD_FUNDS
} from "../actions/dashboard.actions";

const dashboardFundsReducer = tableReducerFactory<FundsListOld>({
  type: DASHBOARD_FUNDS,
  paging: DEFAULT_PAGING,
  filtering: DASHBOARD_FUNDS_DEFAULT_FILTERING,
  defaultFilters: DASHBOARD_FUNDS_FILTERS,
  clearable: true,
  clearableActionType: CLEAR_DASHBOARD_ASSETS_TABLE
});

export default dashboardFundsReducer;
