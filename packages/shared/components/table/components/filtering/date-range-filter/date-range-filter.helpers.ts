import moment from "moment";
import { DurationInputArg2 } from "moment";

import { FILTER_TYPE } from "../../../helpers/filtering.helpers";
import { IComposeDefaultFilter } from "../../table.types";
import { IDefaultFilter } from "../filter.type";
import {
  ComposedRequestDataRangeValue,
  DATE_RANGE_FILTER_NAME,
  DATE_RANGE_FILTER_TYPE,
  DEFAULT_DATE_RANGE_FILTER_VALUE,
  IDataRangeFilterValue,
  SERVER_DATE_RANGE_MAX_FILTER_NAME,
  SERVER_DATE_RANGE_MIN_FILTER_NAME
} from "./date-range-filter.constants";

export const validateDateRange = (value: IDataRangeFilterValue): boolean => {
  if (
    !value.type ||
    !Object.values(DATE_RANGE_FILTER_TYPE).includes(value.type)
  )
    return false;
  if (value.type === DATE_RANGE_FILTER_TYPE.CUSTOM) {
    const start = moment(value.dateStart);
    const end = moment(value.dateEnd);
    if (!start.isValid() || !end.isValid() || start.isAfter(end)) return false;
  }
  return true;
};

const dateFrom = (
  subtract?: DurationInputArg2,
  date: moment.MomentInput = new Date()
): string =>
  moment(date)
    .subtract(1, subtract)
    .startOf("minute")
    .toISOString();

const dateTo = (): string =>
  moment()
    .add(1, "minute")
    .startOf("minute")
    .toISOString();

export const composeRequestValueFunc = (
  fromFilterName: string = SERVER_DATE_RANGE_MIN_FILTER_NAME,
  toFilterName: string = SERVER_DATE_RANGE_MAX_FILTER_NAME
) => (value: IDataRangeFilterValue): ComposedRequestDataRangeValue => {
  switch (value.type) {
    case DATE_RANGE_FILTER_TYPE.ALL:
      return {
        [fromFilterName]: dateFrom(undefined, 20181001),
        [toFilterName]: dateTo()
      };
    case DATE_RANGE_FILTER_TYPE.LAST_MONTH:
      return {
        [fromFilterName]: dateFrom("month"),
        [toFilterName]: dateTo()
      };
    case DATE_RANGE_FILTER_TYPE.LAST_WEEK:
      return {
        [fromFilterName]: dateFrom("week"),
        [toFilterName]: dateTo()
      };
    case DATE_RANGE_FILTER_TYPE.CUSTOM:
    default:
      return {
        [fromFilterName]: moment(value.dateStart)
          .startOf("day")
          .toISOString(),
        [toFilterName]: moment(value.dateEnd)
          .add(1, "day")
          .startOf("day")
          .toISOString()
      };
  }
};

export const composeDefaultDateRangeFilter = ({
  name = DATE_RANGE_FILTER_NAME,
  type = FILTER_TYPE.CUSTOM,
  defaultValue = DEFAULT_DATE_RANGE_FILTER_VALUE,
  composeApiRequestValue = composeRequestValueFunc()
} = {}): IDefaultFilter<IDataRangeFilterValue> => ({
  name,
  type,
  composeRequestValue: composeApiRequestValue,
  defaultValue
});
