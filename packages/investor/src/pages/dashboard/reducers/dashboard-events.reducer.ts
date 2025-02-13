import { InvestmentEventViewModels } from "gv-api-web";
import { InvestorRootState } from "reducers";
import {
  DASHBOARD_PORTFOLIO_EVENTS_DEFAULT_FILTERING,
  DASHBOARD_PORTFOLIO_EVENTS_FILTERS,
  EVENTS_ACTION_TYPE
} from "shared/components/portfolio-events-table/portfolio-events-table.constants";
import { tableSelectorCreator } from "shared/components/table/helpers/table.selector";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import tableReducerFactory from "shared/components/table/reducers/table.reducer";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import { apiSelector } from "shared/utils/selectors";
import { AuthRootState } from "shared/utils/types";

import { DASHBOARD_PORTFOLIO_EVENTS } from "../actions/dashboard.actions";

export type DashboardEventsState = IApiState<InvestmentEventViewModels>;

export const dashboardEventsSelector = apiSelector<
  InvestmentEventViewModels,
  AuthRootState
>(state => state.dashboard.eventsData);

export const dashboardEventsReducer = apiReducerFactory<
  InvestmentEventViewModels
>({
  apiType: DASHBOARD_PORTFOLIO_EVENTS
});

export const dashboardEventsAllSelector = (state: InvestorRootState) =>
  state.dashboard.eventsTable;

export const dashboardEventsAllTableSelector = tableSelectorCreator<
  InvestorRootState,
  InvestmentEventViewModels,
  InvestmentEventViewModels
>(dashboardEventsAllSelector, "events", {
  items: undefined,
  total: 0
});

export const dashboardEventsAllReducer = tableReducerFactory<
  InvestmentEventViewModels
>({
  clearable: true,
  type: EVENTS_ACTION_TYPE,
  paging: DEFAULT_PAGING,
  filtering: DASHBOARD_PORTFOLIO_EVENTS_DEFAULT_FILTERING,
  defaultFilters: DASHBOARD_PORTFOLIO_EVENTS_FILTERS
});
