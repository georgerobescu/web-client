import "shared/components/details/details-description-section/details-statistic-section/details-chart-section/details-chart-section.scss";

import { FundBalanceChart as FundBalanceChartType } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import DetailsChartLoader from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-chart-loader";
import Surface from "shared/components/surface/surface";
import { HandlePeriodChangeType } from "shared/utils/types";

import { FundDetailsProfitChart } from "../../services/fund-details.types";
import FundDetailsChartElements from "./fund-details-chart-elements";

const _FundDetailsChart: React.FC<Props> = ({
  t,
  period,
  onPeriodChange,
  profitChart,
  balanceChart
}) => (
  <Surface className="surface--horizontal-paddings details-chart">
    <h3>{t("fund-details-page.chart.heading")}</h3>
    <FundDetailsChartElements
      condition={!!profitChart && !!balanceChart}
      loader={<DetailsChartLoader />}
      profitChart={profitChart!}
      balanceChart={balanceChart!}
      period={period}
      onPeriodChange={onPeriodChange}
    />
  </Surface>
);

interface Props extends InjectedTranslateProps {
  period: ChartDefaultPeriod;
  onPeriodChange: HandlePeriodChangeType;
  profitChart?: FundDetailsProfitChart;
  balanceChart?: FundBalanceChartType;
}

const FundDetailsChart = React.memo(translate()(_FundDetailsChart));
export default FundDetailsChart;
