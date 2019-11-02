import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";
import {
  TAG_FILTER_DEFAULT_VALUE,
  TAG_FILTER_NAME
} from "shared/components/table/components/filtering/tag-filter/tag-filter.constants";
import { programsTagFilter } from "shared/components/table/components/filtering/tag-filter/tag-filter.helpers";
import { IComposeDefaultFilter } from "shared/components/table/components/table.types";
import {
  CURRENCY_MAP_VALUE,
  programsCurrencyMap,
  programsDateRangeFilter
} from "shared/modules/programs-table/components/programs-table/programs.constants";
import { FILTER_TYPE } from "shared/components/table/helpers/filtering.helpers";

export const CURRENCY_MAP_NAME = "currency";
export const DATE_RANGE_FILTER_NAME = "dateRange";

export const SORTING_FILTER_VALUE = "ByProfitDesc";

const METATRADER = "MetaTrader";
const EXTERNAL = "External";
const CRYPTO = "Crypto";

const FOLLOW_TYPE_FILTER_VALUE = undefined;

export const FOLLOW_TYPES = [METATRADER, EXTERNAL, CRYPTO];

export const FOLLOW_TYPE_FILTER_NAME = "type";

export const followTypeFilter = {
  name: FOLLOW_TYPE_FILTER_NAME,
  type: FILTER_TYPE.GENERAL,
  defaultValue: FOLLOW_TYPE_FILTER_VALUE
};

export const FOLLOW_TABLE_FILTERS: IComposeDefaultFilter[] = [
  followTypeFilter,
  programsCurrencyMap,
  programsTagFilter,
  programsDateRangeFilter
];

export const FOLLOW_COLUMNS: SortingColumn[] = [
  {
    name: "name"
  },
  {
    name: "subscribers"
  },
  {
    name: "age"
  },
  {
    name: "trades"
  },
  {
    name: "drawdown",
    sortingName: "ByDrawdown"
  },
  {
    name: "profit",
    sortingName: "ByProfit"
  },
  {
    name: "chart"
  }
];

export const DEFAULT_FOLLOW_TABLE_FILTERS = {
  [FOLLOW_TYPE_FILTER_NAME]: FOLLOW_TYPE_FILTER_VALUE,
  [CURRENCY_MAP_NAME]: CURRENCY_MAP_VALUE,
  [DATE_RANGE_FILTER_NAME]: DEFAULT_DATE_RANGE_FILTER_VALUE,
  [TAG_FILTER_NAME]: TAG_FILTER_DEFAULT_VALUE
};