import { SLUG_URL_REGEXP } from "shared/utils/constants";

export const PROGRAMS_FAVORITES_TAB_NAME = "favorites";
export const PROGRAMS_EXPLORE_TAB_NAME = "";
export const PROGRAM_SLUG_URL_PARAM_NAME = "programSlugUrl";

export const PROGRAMS_ROUTE = "/programs";
export const PROGRAM_ROUTE = `${PROGRAMS_ROUTE}/:programId`;
export const PROGRAM_DETAILS_ROUTE = `${PROGRAMS_ROUTE}/:${PROGRAM_SLUG_URL_PARAM_NAME}`;
export const PROGRAM_DETAILS_ROUTE_REGEX = `${PROGRAMS_ROUTE}/:${PROGRAM_SLUG_URL_PARAM_NAME}(${SLUG_URL_REGEXP})`;

export const FACETS = "facets";
export const PROGRAMS_FACET_ROUTE = `${PROGRAMS_ROUTE}/${FACETS}/:${PROGRAM_SLUG_URL_PARAM_NAME}`;
export const PROGRAMS_FACET_ROUTE_REGEX = `${PROGRAMS_ROUTE}/${FACETS}/:${PROGRAM_SLUG_URL_PARAM_NAME}(${SLUG_URL_REGEXP})`;
export const PROGRAMS_TAB_ROUTE = `${PROGRAMS_ROUTE}/:tab`;
export const PROGRAMS_EXPLORE_TAB_ROUTE = `${PROGRAMS_ROUTE}/:tab(${PROGRAMS_EXPLORE_TAB_NAME})`;
export const PROGRAMS_FAVORITES_TAB_ROUTE = `${PROGRAMS_ROUTE}/:tab(${PROGRAMS_FAVORITES_TAB_NAME})`;