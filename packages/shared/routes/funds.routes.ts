import { SLUG_URL_REGEXP } from "shared/utils/constants";

export const FUNDS_FAVORITES_TAB_NAME = "favorites";
export const FUNDS_EXPLORE_TAB_NAME = "";
export const FUNDS_SLUG_URL_PARAM_NAME = "fundsSlugUrl";

export const FUNDS_ROUTE = "/funds";
export const FUND_DETAILS_ROUTE = `${FUNDS_ROUTE}/:${FUNDS_SLUG_URL_PARAM_NAME}`;
export const FUND_DETAILS_ROUTE_REGEX = `${FUNDS_ROUTE}/:${FUNDS_SLUG_URL_PARAM_NAME}(${SLUG_URL_REGEXP})`;
export const FUND_SETTINGS = "settings";
export const FUND_SETTINGS_ROUTE = `${FUND_DETAILS_ROUTE_REGEX}/${FUND_SETTINGS}`;

export const FUNDS_FACET_ROUTE = `${FUNDS_ROUTE}/facets/:${FUNDS_SLUG_URL_PARAM_NAME}`;
export const FUNDS_FACET_ROUTE_REGEX = `${FUNDS_ROUTE}/facets/:${FUNDS_SLUG_URL_PARAM_NAME}(${SLUG_URL_REGEXP})`;
export const FUNDS_TAB_ROUTE = `${FUNDS_ROUTE}/:tab`;
export const FUNDS_EXPLORE_TAB_ROUTE = `${FUNDS_ROUTE}/:tab(${FUNDS_EXPLORE_TAB_NAME})`;
export const FUNDS_FAVORITES_TAB_ROUTE = `${FUNDS_ROUTE}/:tab(${FUNDS_FAVORITES_TAB_NAME})`;
