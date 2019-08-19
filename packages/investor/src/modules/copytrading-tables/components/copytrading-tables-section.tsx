import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect, ResolveThunks } from "react-redux";
import { InvestorRootState } from "reducers";
import {
  Action,
  ActionCreatorsMapObject,
  bindActionCreators,
  Dispatch
} from "redux";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import Surface from "shared/components/surface/surface";
import useTab from "shared/hooks/tab.hook";

import {
  fetchCopytradingTradesCount,
  getCopytradingTradesCount,
  ICopytradingTradesCounts
} from "../services/copytrading-tables.service";
import {
  dashboardOpenTradesTableSelector,
  dashboardTradesHistoryTableSelector,
  dashboardTradesLogTableSelector
} from "./copytrading-tables.selectors";
import OpenTradesTable from "./open-trades-table";
import TradesHistoryTable from "./trades-history-table";
import TradesLogTable from "./trades-log-table";

const _CopytradingTablesSection: React.FC<Props> = ({
  title,
  counts,
  service,
  currency
}) => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<TABS>(TABS.OPEN_TRADES);
  useEffect(
    () => {
      service.getCopytradingTradesCount(currency);
    },
    [currency, service]
  );
  const { openTradesCount, logCount, historyCount } = counts;
  return (
    <Surface>
      <div className="dashboard-assets__head">
        <h3>{t("investor.copytrading-tables.title")}</h3>
        <div className="dashboard-assets__tabs">
          <GVTabs value={tab} onChange={setTab}>
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
};

const mapStateToProps = (state: InvestorRootState) => {
  const counts = {
    openTradesCount: dashboardOpenTradesTableSelector(state).itemsData.data
      .total,
    logCount: dashboardTradesLogTableSelector(state).itemsData.data.total,
    historyCount: dashboardTradesHistoryTableSelector(state).itemsData.data
      .total
  };
  return { counts };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      getCopytradingTradesCount
    },
    dispatch
  )
});

const CopytradingTablesSection = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CopytradingTablesSection);

export default CopytradingTablesSection;

enum TABS {
  LOG = "LOG",
  OPEN_TRADES = "OPEN_TRADES",
  HISTORY = "HISTORY"
}

interface StateProps {
  counts: ICopytradingTradesCounts;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  getCopytradingTradesCount: typeof getCopytradingTradesCount;
}

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends StateProps, DispatchProps {
  title: string;
  currency?: string;
}
