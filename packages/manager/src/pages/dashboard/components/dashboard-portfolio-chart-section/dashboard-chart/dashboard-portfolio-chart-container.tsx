import * as React from "react";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import FundProfitChart from "shared/components/funds/fund-details/fund-details-statistics-section/fund-details-chart-section/fund-profit-chart-section/fund-profit-chart";
import ProgramProfitChart from "shared/components/programs/program-details/program-details-statistic-section/program-details-chart-section/program-profit-chart-section/program-profit-chart";
import { ASSETS_TYPES } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import { CurrencyEnum } from "shared/utils/types";

import { IDashboardAssetChart } from "../../../reducers/dashboard.reducers";
import { getAssetChart, setPeriod } from "../../../services/dashboard.service";

class _DashboardPortfolioChartContainer extends React.PureComponent<Props> {
  handleChangePeriod = (period: ChartDefaultPeriod) => {
    const { service, assetChart } = this.props;
    service.setPeriod(period);
    service.getAssetChart(assetChart.id, assetChart.title, assetChart.type);
  };

  render() {
    const { assetChart, currency, period } = this.props;
    return (
      <>
        <h3 className="dashboard-portfolio-chart-section__heading">
          {assetChart.title}
        </h3>
        <ChartPeriod period={period} onChange={this.handleChangePeriod} />
        <div className="dashboard-portfolio-chart-section__chart">
          {assetChart.type === ASSETS_TYPES.Program && (
            <ProgramProfitChart
              equityChart={assetChart.equityChart}
              pnlChart={assetChart.pnLChart!}
              currency={currency}
            />
          )}
          {assetChart.type === ASSETS_TYPES.Fund && (
            <FundProfitChart equityChart={assetChart.equityChart} />
          )}
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { getAssetChart, setPeriod },
    dispatch
  )
});

interface Props extends DispatchProps, OwnProps {}

interface ServiceThunks extends ActionCreatorsMapObject {
  getAssetChart: typeof getAssetChart;
  setPeriod: typeof setPeriod;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface OwnProps {
  assetChart: IDashboardAssetChart;
  currency: CurrencyEnum;
  period: ChartDefaultPeriod;
}

const DashboardPortfolioChartContainer = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  connect(
    null,
    mapDispatchToProps
  )
)(_DashboardPortfolioChartContainer);
export default DashboardPortfolioChartContainer;