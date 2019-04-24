import "shared/components/details/details-description-section/details-statistic-section/details-statistic-section.scss";

import { FundBalanceChart } from "gv-api-web";
import * as React from "react";
import {
  ChartDefaultPeriod,
  DEFAULT_PERIOD
} from "shared/components/chart/chart-period/chart-period.helpers";
import FundDetailsChartSection from "shared/components/funds/fund-details/fund-details-statistics-section/fund-details-chart-section/fund-details-chart-section";
import FundDetailsStatistic from "shared/components/funds/fund-details/fund-details-statistics-section/fund-details-statistics/fund-details-statistics";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";
import { HandlePeriodChangeType } from "shared/utils/types";

import {
  FundDetailsProfitChart,
  FundDetailsStatistic as FundDetailsStatisticType,
  FundStatisticResult
} from "../services/fund-details.types";

class FundDetailsStatisticSection extends React.PureComponent<Props, State> {
  state = {
    period: DEFAULT_PERIOD,
    statistic: undefined,
    profitChart: undefined,
    balanceChart: undefined,
    prevProps: undefined
  };

  static getDerivedStateFromProps = (props: Props, state: State): State => {
    let newState: State = {};
    if (state.prevProps !== props) {
      newState.prevProps = props;
      newState.statistic = props.statistic;
      newState.profitChart = props.profitChart;
      newState.balanceChart = props.balanceChart;
      return newState;
    }
    return state;
  };

  handlePeriodChange: HandlePeriodChangeType = period => {
    const { programId, currency, getFundStatistic } = this.props;

    getFundStatistic(programId, currency, period).then(data => {
      this.setState({ period, ...data });
    });
  };

  render() {
    const { statistic, profitChart, balanceChart, period } = this.state;
    return (
      <div className="details-statistic-section">
        <div className="details-statistic-section__statistic">
          <FundDetailsStatistic statistic={statistic} period={period} />
        </div>
        <div className="details-statistic-section__chart">
          <FundDetailsChartSection
            profitChart={profitChart}
            balanceChart={balanceChart}
            period={period}
            onPeriodChange={this.handlePeriodChange}
          />
        </div>
      </div>
    );
  }
}

interface Props {
  currency: CURRENCIES;
  programId: string;
  getFundStatistic: (
    programId: string,
    currency: CURRENCIES,
    period: ChartDefaultPeriod
  ) => Promise<FundStatisticResult>;
  statistic?: FundDetailsStatisticType;
  profitChart?: FundDetailsProfitChart;
  balanceChart?: FundBalanceChart;
}

interface State {
  period?: ChartDefaultPeriod;
  statistic?: FundDetailsStatisticType;
  profitChart?: FundDetailsProfitChart;
  balanceChart?: FundBalanceChart;
  prevProps?: Props;
}

export default FundDetailsStatisticSection;