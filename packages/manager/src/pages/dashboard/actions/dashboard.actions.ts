import {
  FundsList,
  ManagerAssets,
  ManagerPortfolioEvents,
  ProgramsList
} from "gv-api-web";
import { Action } from "redux";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import { ComposeFiltersAllType } from "shared/components/table/components/filtering/filter.type";
import managerApi from "shared/services/api-client/manager-api";
import { ActionType } from "shared/utils/types";

import { IDashboardAssetChart } from "../reducers/dashboard.reducers";

export const DASHBOARD_PORTFOLIO_CHART = "DASHBOARD_PORTFOLIO_CHART";
export const DASHBOARD_PORTFOLIO_EVENTS = "DASHBOARD_PORTFOLIO_EVENTS";
export const DASHBOARD_IN_REQUESTS = "DASHBOARD_IN_REQUESTS";
export const DASHBOARD_PROGRAMS = "DASHBOARD_PROGRAMS";
export const DASHBOARD_PROGRAMS_FILTERS = "DASHBOARD_PROGRAMS_FILTERS";
export const DASHBOARD_FUNDS = "DASHBOARD_FUNDS";
export const DASHBOARD_FUNDS_FILTERS = "DASHBOARD_FUNDS_FILTERS";
export const DASHBOARD_CANCEL_FUND_REQUESTS = "DASHBOARD_CANCEL_FUND_REQUESTS";
export const DASHBOARD_CANCEL_PROGRAM_REQUESTS =
  "DASHBOARD_CANCEL_PROGRAM_REQUESTS";

export const DASHBOARD_ASSET_CHART = "DASHBOARD_ASSET_CHART";
export const DASHBOARD_ASSETS = "DASHBOARD_ASSETS";
export const DASHBOARD_PERIOD = "DASHBOARD_PERIOD";

export const CLEAR_DASHBOARD_ASSETS_TABLE = "CLEAR_DASHBOARD_ASSETS_TABLE";

export const fetchPortfolioEventsAction = (
  auth: string,
  filters: ComposeFiltersAllType
): ActionType<Promise<ManagerPortfolioEvents>> => ({
  type: DASHBOARD_PORTFOLIO_EVENTS,
  payload: managerApi.v10ManagerEventsGet(auth, filters)
});

export const fetchInRequestsAction = (
  auth: string,
  skip: number,
  take: number
): ActionType<Promise<any>> => ({
  type: DASHBOARD_IN_REQUESTS,
  payload: managerApi.v10ManagerRequestsBySkipByTakeGet(skip, take, auth)
});

export const fetchDashboardProgramsAction = (
  auth: string,
  filters?: ComposeFiltersAllType
): ActionType<Promise<ProgramsList>> => ({
  type: DASHBOARD_PROGRAMS,
  payload: managerApi.v10ManagerProgramsGet(auth, filters)
});

export const fetchDashboardFundsAction = (
  auth: string,
  filters?: ComposeFiltersAllType
): ActionType<Promise<FundsList>> => ({
  type: DASHBOARD_FUNDS,
  payload: managerApi.v10ManagerFundsGet(auth, filters)
});

export const cancelProgramRequestAction = (
  auth: string,
  id: string
): ActionType<Promise<any>> => ({
  type: DASHBOARD_CANCEL_PROGRAM_REQUESTS,
  payload: managerApi.v10ManagerProgramsRequestsByIdCancelPost(id, auth)
});

export type TDashboardChartAction = ActionType<IDashboardAssetChart>;
export const dashboardChartAction = (
  assetChart: IDashboardAssetChart
): TDashboardChartAction => ({
  type: DASHBOARD_ASSET_CHART,
  payload: assetChart
});

export const fetchAssetsAction = (
  auth: string
): ActionType<Promise<ManagerAssets>> => ({
  type: DASHBOARD_ASSETS,
  payload: managerApi.v10ManagerAssetsGet(auth)
});

export type TSetPeriodAction = ActionType<ChartDefaultPeriod>;
export const setPeriodAction = (
  payload: ChartDefaultPeriod
): TSetPeriodAction => ({
  type: DASHBOARD_PERIOD,
  payload
});

export const clearDashboardAssetsTableAction = (): Action => ({
  type: CLEAR_DASHBOARD_ASSETS_TABLE
});

// TODO move actions to shared
