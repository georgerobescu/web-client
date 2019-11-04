import DashboardPrivateCard from "pages/dashboard/components/dashboard-trading/dashboard-private-card";
import DashboardTradingTable from "pages/dashboard/components/dashboard-trading/dashboard-trading-table";
import {
  DASHBOARD_PUBLIC_DEFAULT_FILTERS,
  DASHBOARD_PUBLIC_FILTERING
} from "pages/dashboard/dashboard.constants";
import { TAsset } from "pages/dashboard/dashboard.types";
import { getPrivateAssets } from "pages/dashboard/services/dashboard.service";
import React from "react";
import { useTranslation } from "react-i18next";

const _DashboardPrivate: React.FC<Props> = () => {
  const [t] = useTranslation();
  return (
    <DashboardTradingTable
      getItems={getPrivateAssets}
      defaultFilters={DASHBOARD_PUBLIC_DEFAULT_FILTERS}
      filtering={DASHBOARD_PUBLIC_FILTERING}
      title={t("dashboard-page.trading.private")}
      renderBodyCard={(asset: TAsset) => (
        <DashboardPrivateCard title={""} asset={asset} />
      )}
    />
  );
};

interface Props {}

const DashboardPrivate = React.memo(_DashboardPrivate);
export default DashboardPrivate;