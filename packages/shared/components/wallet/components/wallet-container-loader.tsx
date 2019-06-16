import "./wallet-balance/wallet-balance.scss";

import * as React from "react";
import Page from "shared/components/page/page";
import SvgLoader from "shared/components/svg-loader/svg-loader";

import WalletBalanceLoader from "./wallet-balance/wallet-balance-loader";
import WalletSettingsLoader from "./wallet-settings/wallet-settings-loader";
import WalletTablesLoader from "./wallet-tables/wallet-tables-loader";

const WalletContainerLoader = () => (
  <Page title={""}>
    <div className="wallet-balance">
      <WalletTitleLoader />
      <WalletBalanceLoader />
      <WalletTablesLoader />
    </div>
  </Page>
);

const WalletTitleLoader: React.FC = () => (
  <div className="wallet-balance__wrapper">
    <h1 className="wallet-balance__title">
      <SvgLoader height={15} width={100}>
        <rect x="0" y="0" width="100" height="15" rx="8" ry="8" />
      </SvgLoader>
    </h1>
    <WalletSettingsLoader />
  </div>
);

export default WalletContainerLoader;
