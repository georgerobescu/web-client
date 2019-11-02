import "shared/components/details/details-description-section/details-statistic-section/details-statistic-section.scss";

import { ProgramBalanceChartElement } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import DetailsStatisticSection from "shared/components/details/details-statistic-section/details-statistic-section";
import { formatCurrencyValue } from "shared/utils/formatter";

import {
  profitChartDataLoaderData,
  statisticDataLoaderData
} from "../follow-details.loader-data";
import { programBalanceChartSelector } from "../reducers/balance-chart.reducer";
import { programStatusSelector } from "../reducers/description.reducer";
import { programProfitChartSelector } from "../reducers/profit-chart.reducer";
import { statisticCurrencySelector } from "../reducers/statistic-currency.reducer";
import FollowDetailsStatisticsElements, {
  IProgramStatisticData
} from "./follow-details-statistics/follow-details-statistics-elements";
import ProgramBalanceChart from "./program-details-chart-section/program-balance-chart-section/program-balance-chart";
import {
  useChartPeriod,
  useProgramChartStateValues
} from "./program-details-chart-section/program-details.chart.helpers";
import ProgramProfitChart from "./program-details-chart-section/program-profit-chart-section/program-profit-chart";

const _ProgramDetailsStatisticSection: React.FC = () => {
  const status = useSelector(programStatusSelector);
  const statisticCurrency = useSelector(statisticCurrencySelector);
  return (
    <DetailsStatisticSection
      loaderData={profitChartDataLoaderData}
      balanceChartSelector={programBalanceChartSelector}
      profitChartSelector={programProfitChartSelector}
      statisticCurrencySelector={statisticCurrencySelector}
      useChartStateValues={useProgramChartStateValues}
      useChartPeriod={useChartPeriod}
      renderProfitValue={({ chart }) => (
        <NumberFormat
          value={formatCurrencyValue(
            "timeframeProfit" in chart ? chart.timeframeProfit : 0,
            statisticCurrency
          )}
          thousandSeparator={" "}
          displayType="text"
          suffix={` ${statisticCurrency}`}
        />
      )}
      renderBalanceChart={({ color, currency, balanceChart }) => (
        <ProgramBalanceChart
          color={color}
          balanceChart={balanceChart as ProgramBalanceChartElement[]}
          currency={currency}
        />
      )}
      renderProfitChart={({ profitChart, chartCurrencies }) => (
        <ProgramProfitChart
          profitChart={profitChart}
          chartCurrencies={chartCurrencies}
        />
      )}
      renderDetailsStatisticsElements={({ period, statisticData }) => (
        <FollowDetailsStatisticsElements
          loaderData={statisticDataLoaderData}
          status={status}
          data={statisticData! as IProgramStatisticData}
          period={period}
        />
      )}
    />
  );
};

const FollowDetailsStatisticSection = React.memo(
  _ProgramDetailsStatisticSection
);
export default FollowDetailsStatisticSection;