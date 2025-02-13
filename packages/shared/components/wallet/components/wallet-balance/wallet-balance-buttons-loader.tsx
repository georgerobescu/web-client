import "./wallet-balance.scss";

import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import GVButton from "shared/components/gv-button";
import ArrowIcon from "shared/media/arrow-up.svg";

const _WalletBalanceButtonsLoader: React.FC<WithTranslation> = ({ t }) => (
  <div className="wallet-balance__buttons">
    <GVButton>
      <>
        <span className="wallet-balance__button-icon wallet-balance__button-icon--sign">
          +
        </span>
        {t("wallet-page.deposit")}
      </>
    </GVButton>
    <GVButton color="secondary" variant="outlined">
      <>
        <img
          className="wallet-balance__button-icon"
          src={ArrowIcon}
          alt="Arrow icon"
        />
        {t("wallet-page.withdraw")}
      </>
    </GVButton>
  </div>
);

const WalletBalanceButtonsLoader = translate()(_WalletBalanceButtonsLoader);
export default WalletBalanceButtonsLoader;
