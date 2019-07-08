import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import Surface from "shared/components/surface/surface";

import {
  ICopytradingTradesCounts,
  fetchCopytradingTradesCount
} from "../services/copytrading-tables.service";
import OpenTradesTable from "./open-trades-table";
import TradesHistoryTable from "./trades-history-table";
import TradesLogTable from "./trades-log-table";

class _CopytradingTablesSection extends React.PureComponent<
  ICopytradingTablesSectionProps & InjectedTranslateProps,
  ICopytradingTablesSectionState
> {
  state = {
    tab: TABS.OPEN_TRADES,
    openTradesCount: undefined,
    logCount: undefined,
    historyCount: undefined
  };

  componentDidMount() {
    fetchCopytradingTradesCount(this.props.currency).then(data => {
      this.setState({ ...data });
    });
  }

  handleTabChange = (e: any, tab: string) => {
    this.setState({ tab: tab as TABS });
  };

  render() {
    const { tab, openTradesCount, historyCount, logCount } = this.state;
    const { t, title, currency } = this.props;
    return (
      <Surface>
        <div className="dashboard-assets__head">
          <h3>{t("investor.copytrading-tables.title")}</h3>
          <div className="dashboard-assets__tabs">
            <GVTabs value={tab} onChange={this.handleTabChange}>
              <GVTab
                value={TABS.OPEN_TRADES}
                label={t("investor.copytrading-tables.open-trades")}
                count={openTradesCount}
              />
              <GVTab
                value={TABS.HISTORY}
                label={t("investor.copytrading-tables.history")}
                count={historyCount}
              />
              <GVTab
                value={TABS.LOG}
                label={t("investor.copytrading-tables.log")}
                count={logCount}
              />
            </GVTabs>
          </div>
        </div>
        {tab === TABS.OPEN_TRADES && (
          <OpenTradesTable title={title} currency={currency} />
        )}
        {tab === TABS.HISTORY && (
          <TradesHistoryTable title={title} currency={currency} />
        )}
        {tab === TABS.LOG && <TradesLogTable currency={currency} />}
      </Surface>
    );
  }
}

enum TABS {
  LOG = "LOG",
  OPEN_TRADES = "OPEN_TRADES",
  HISTORY = "HISTORY"
}

interface ICopytradingTablesSectionProps {
  title: string;
  currency?: string;
}

interface ICopytradingTablesSectionState extends ICopytradingTradesCounts {
  tab: TABS;
}

const CopytradingTablesSection = translate()(_CopytradingTablesSection);
export default CopytradingTablesSection;
