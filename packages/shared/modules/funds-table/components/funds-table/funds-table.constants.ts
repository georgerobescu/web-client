import {
  DATA_RANGE_FILTER_TYPES,
  DEFAULT_DATE_RANGE_FILTER_VALUE,
  SERVER_STATISTIC_DATE_RANGE_MAX_FILTER_NAME,
  SERVER_STATISTIC_DATE_RANGE_MIN_FILTER_NAME
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  composeDefaultDateRangeFilter,
  composeRequestValueFunc,
  validateDateRange
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";
import { fundAssetFilter } from "shared/components/table/components/filtering/fund-asset-filter/fund-asset-filter.helpers";
import { FILTER_TYPE } from "shared/components/table/helpers/filtering.helpers";

export const CURRENCY_FILTER_NAME = "currency";
export const DATE_RANGE_FILTER_NAME = "dateRange";
export const SORTING_FILTER_VALUE = "ByProfitDesc";

export const CURRENCY_FILTER_VALUE = undefined;

const fundsDateRangeFilter = {
  ...composeDefaultDateRangeFilter({
    composeApiRequestValue: composeRequestValueFunc(
      SERVER_STATISTIC_DATE_RANGE_MIN_FILTER_NAME,
      SERVER_STATISTIC_DATE_RANGE_MAX_FILTER_NAME
    ),
    defaultValue: {
      ...DEFAULT_DATE_RANGE_FILTER_VALUE,
      type: DATA_RANGE_FILTER_TYPES.LAST_MONTH
    }
  }),
  validate: validateDateRange
};

export const fundCurrencyFilter = {
  name: CURRENCY_FILTER_NAME,
  type: FILTER_TYPE.GENERAL,
  defaultValue: CURRENCY_FILTER_VALUE
};

export const FUNDS_TABLE_FILTERS = [
  fundCurrencyFilter,
  fundAssetFilter,
  fundsDateRangeFilter
];

export const FUNDS_TABLE_COLUMNS: SortingColumn[] = [
  {
    name: "title"
  },
  {
    name: "balance",
    sortingName: "ByBalance"
  },
  {
    name: "assets"
  },
  {
    name: "investors",
    sortingName: "ByInvestors"
  },
  {
    name: "age"
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

export const sortableColumns: string[] = FUNDS_TABLE_COLUMNS.filter(
  x => !!x.sortingName
).map(x => x.sortingName as string);

export const DEFAULT_ITEMS_ON_PAGE = 12;
