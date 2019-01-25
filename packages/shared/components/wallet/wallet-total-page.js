import React from "react";
import { translate } from "react-i18next";
import Page from "shared/components/page/page";
import WalletTotal from "shared/components/wallet/components/wallet-total";

export const WALLET_TOTAL_PAGE_ROUTE = "/wallet";

const WalletTotalPage = ({ t, isPending, info }) => {
  if (isPending) return <p>...Loading</p>;
  return (
    <Page title={t("wallet-page.title")}>
      <WalletTotal info={info} />
    </Page>
  );
};

export default translate()(WalletTotalPage);
