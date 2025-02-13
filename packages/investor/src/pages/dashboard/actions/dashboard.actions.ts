import {
  CancelablePromise,
  DashboardChartValue,
  FundsListOld,
  InvestmentEventViewModels,
  ProgramRequests,
  ProgramsListOld,
  SignalsList
} from "gv-api-web";
import { Action } from "redux";
import { EVENTS_ACTION_TYPE } from "shared/components/portfolio-events-table/portfolio-events-table.constants";
import {
  EVENT_LOCATION,
  fetchPortfolioEventsWithoutTable
} from "shared/components/programs/program-details/services/program-details.service";
import { ComposeFiltersAllType } from "shared/components/table/components/filtering/filter.type";
import investorApi from "shared/services/api-client/investor-api";
import { ActionType } from "shared/utils/types";

export const DASHBOARD_PROGRAMS = "DASHBOARD_PROGRAMS";
export const DASHBOARD_FUNDS = "DASHBOARD_FUNDS";
export const DASHBOARD_COPYTRADING = "DASHBOARD_COPYTRADING";
export const DASHBOARD_PORTFOLIO_CHART = "DASHBOARD_PORTFOLIO_CHART";
export const DASHBOARD_PORTFOLIO_EVENTS = "DASHBOARD_PORTFOLIO_EVENTS";
export const DASHBOARD_IN_REQUESTS = "DASHBOARD_IN_REQUESTS";
export const DASHBOARD_CANCEL_FUND_REQUESTS = "DASHBOARD_CANCEL_FUND_REQUESTS";
export const DASHBOARD_CANCEL_PROGRAM_REQUESTS =
  "DASHBOARD_CANCEL_PROGRAM_REQUESTS";

export const CLEAR_DASHBOARD_ASSETS_TABLE = "CLEAR_DASHBOARD_ASSETS_TABLE";

export const fetchEventsAction = (
  filters: ComposeFiltersAllType,
  eventLocation: EVENT_LOCATION
): ActionType<CancelablePromise<InvestmentEventViewModels>> => ({
  type: EVENTS_ACTION_TYPE,
  payload: fetchPortfolioEventsWithoutTable(eventLocation, filters)
});

export const fetchDashboardProgramsAction = (
  auth: string,
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<ProgramsListOld>> => ({
  type: DASHBOARD_PROGRAMS,
  payload: investorApi.getPrograms(auth, filters)
});

export const fetchDashboardFundsAction = (
  auth: string,
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<FundsListOld>> => ({
  type: DASHBOARD_FUNDS,
  payload: investorApi.getFunds(auth, filters)
});

export const fetchDashboardCopytradingAction = (
  auth: string,
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<SignalsList>> => ({
  type: DASHBOARD_COPYTRADING,
  payload: investorApi.getSignalPrograms(auth, filters)
});

export const fetchPortfolioChartAction = (
  auth: string,
  filters?: ComposeFiltersAllType
): ActionType<CancelablePromise<DashboardChartValue>> => ({
  type: DASHBOARD_PORTFOLIO_CHART,
  payload: investorApi.getPortfolioChart(auth, filters)
});

export const fetchPortfolioEventsAction = (
  auth: string,
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<InvestmentEventViewModels>> => ({
  type: DASHBOARD_PORTFOLIO_EVENTS,
  payload: investorApi.getEvents(auth, filters)
});

export const fetchInRequestsAction = (
  auth: string,
  skip: number,
  take: number
): ActionType<CancelablePromise<ProgramRequests>> => ({
  type: DASHBOARD_IN_REQUESTS,
  payload: investorApi.getRequests(skip, take, auth)
});

export const cancelProgramRequestAction = (
  auth: string,
  id: string
): ActionType<CancelablePromise<any>> => ({
  type: DASHBOARD_CANCEL_PROGRAM_REQUESTS,
  payload: investorApi.cancelRequest(id, auth)
});

export const clearDashboardAssetsTableAction = (): Action => ({
  type: CLEAR_DASHBOARD_ASSETS_TABLE
});
