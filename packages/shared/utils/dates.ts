import dayjs from "dayjs";
import Calendar from "dayjs/plugin/calendar";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import RelativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(LocalizedFormat);
dayjs.extend(RelativeTime);
dayjs.extend(Calendar);

export const localizedDate = (date: Date | number | string): string => {
  return dayjs(date).format("ll");
};

export const formatDate = (date: Date | number | string): string => {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};

export const distanceDate = (
  dateStart: Date | number | string,
  dateEnd: Date | number | string = new Date(),
  addSuffix: boolean = false
): string => {
  return dayjs(dateStart).to(dayjs(dateEnd), !addSuffix);
};

export const subtractDate = (
  date: number | string | Date,
  amount: number,
  type: "day" | "week" | "month" | "quarter" | "year"
): Date => {
  if (type === "week") {
    return dayjs(date)
      .subtract(7 * amount, "day")
      .toDate();
  }
  if (type === "quarter") {
    return dayjs(date)
      .subtract(3 * amount, "month")
      .toDate();
  }
  return dayjs(date)
    .subtract(amount, type)
    .toDate();
};

export type TimeUnitName = "month" | "day" | "hour" | "minute";

export const TimeUnitName = {
  MONTHS: "month" as TimeUnitName,
  DAYS: "day" as TimeUnitName,
  HOURS: "hour" as TimeUnitName,
  MINUTES: "minute" as TimeUnitName
};

export const timeUnits = {
  [TimeUnitName.MONTHS]: 0,
  [TimeUnitName.DAYS]: 0,
  [TimeUnitName.HOURS]: 0,
  [TimeUnitName.MINUTES]: 0
};

const getString = (value: number, period: string) => {
  if (value === 0) return "";
  const str = `${value} ${period}`;
  return value === 1 ? str : str + "s";
};

export const humanizeDate = (
  start: string | number | Date,
  end: string | number | Date
): string => {
  let from = dayjs(start);
  const to = dayjs(end);

  const thisTimeUnits = { ...timeUnits };

  for (const period in thisTimeUnits) {
    thisTimeUnits[period] = dayjs(to).diff(from, period as TimeUnitName);
    from = dayjs(from).add(thisTimeUnits[period], period as TimeUnitName);
  }

  return Object.entries(thisTimeUnits)
    .filter(period => period[1] > 0)
    .slice(0, 2)
    .reduce((str, value) => {
      return `${str} ${getString(value[1], value[0])}`;
    }, "")
    .trim();
};
