import "./chart-period.scss";

import classNames from "classnames";
import moment from "moment";
import * as React from "react";
import { useTranslation } from "react-i18next";
import GVButton from "shared/components/gv-button";
import withLoader from "shared/decorators/with-loader";
import { HandlePeriodChangeType } from "shared/utils/types";

import {
  ChartDefaultPeriod,
  ChartPeriodType,
  getPeriodStartDate
} from "./chart-period.helpers";

const _ChartPeriod: React.FC<Props> = ({ period, onChange }) => {
  const { t } = useTranslation();
  const handleChangePeriod = (newPeriodType: ChartPeriodType) => () => {
    if (period.type !== newPeriodType) {
      const start = getPeriodStartDate(newPeriodType);
      onChange({ type: newPeriodType, start });
    }
  };
  const renderDateRange = (): JSX.Element | null => {
    if (period.type === ChartPeriodType.all) return null;
    return (
      <span>
        {moment(period.start).format("ll")} - {moment(period.end).format("ll")}
      </span>
    );
  };
  const { type } = period;
  return (
    <div className="chart-period">
      <div className="chart-period__period">
        {Object.values(ChartPeriodType).map(x => (
          <GVButton
            key={x}
            className={classNames("chart-period__period-item", {
              "chart-period__period-item--active": type === x
            })}
            onClick={handleChangePeriod(x)}
            variant="text"
            color="secondary"
            disabled={type === x}
          >
            {t(`chart-period.${ChartPeriodType[x]}-short`)}
          </GVButton>
        ))}
      </div>
      <div className="chart-period__date-range">{renderDateRange()}</div>
    </div>
  );
};

interface Props {
  period: ChartDefaultPeriod;
  onChange: HandlePeriodChangeType;
}

const ChartPeriod = React.memo(withLoader(_ChartPeriod));
export default ChartPeriod;
