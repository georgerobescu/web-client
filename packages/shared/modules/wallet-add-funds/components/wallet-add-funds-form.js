import copy from "copy-to-clipboard";
import { withFormik } from "formik";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVqr from "shared/components/gv-qr/gv-qr";
import GVTextField from "shared/components/gv-text-field";
import CopyIcon from "shared/components/icon/copy-icon";
import Select from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import filesService from "shared/services/file-service";

class WalletAddFundsForm extends Component {
  onChangeCurrency = (name, target) => {
    const { setFieldValue } = this.props;
    setFieldValue("currency", target.props.value);
  };

  render() {
    const { t, values, wallets, notifySuccess, notifyError } = this.props;
    const selected = wallets.find(w => w.currency === values.currency) || {};
    const { depositAddress } = selected;
    const onCopy = () => {
      try {
        copy(depositAddress);
        notifySuccess(t("wallet-deposit.copy-to-clipboard-success"));
      } catch (error) {
        notifyError(t("wallet-deposit.copy-to-clipboard-error"));
      }
    };

    return (
      <form id="add-funds" className="wallet-add-funds-popup">
        <div className="dialog__top">
          <div className="dialog__header">
            <h2>{t("wallet-deposit.title")}</h2>
          </div>
          <div className="dialog-field">
            <GVFormikField
              name="currency"
              component={GVTextField}
              label={t("wallet-deposit.select-currency")}
              InputComponent={Select}
              onChange={this.onChangeCurrency}
            >
              {wallets.map(wallet => {
                const { title, currency } = wallet;
                return (
                  <option value={currency} key={currency}>
                    <img
                      src={filesService.getFileUrl(wallet.logo)}
                      className="wallet-withdraw-popup__icon"
                      alt={wallet.currency}
                    />
                    {`${title} | ${currency}`}
                  </option>
                );
              })}
            </GVFormikField>
          </div>
        </div>
        <div className="dialog__bottom wallet-add-funds-popup__bottom">
          <GVqr className="wallet-add-funds-popup__qr" value={depositAddress} />
          <StatisticItem
            className="wallet-add-funds-popup__address"
            label={t("wallet-deposit.deposit-address")}
          >
            {depositAddress}
          </StatisticItem>
          <GVButton
            color="secondary"
            onClick={onCopy}
            disabled={!depositAddress}
          >
            <CopyIcon />
            &nbsp;
            {t("buttons.copy")}
          </GVButton>
        </div>
      </form>
    );
  }
}

WalletAddFundsForm.propTypes = {
  wallets: PropTypes.arrayOf(
    PropTypes.shape({
      depositAddress: PropTypes.string,
      currency: PropTypes.string,
      rateToGVT: PropTypes.number,
      title: PropTypes.string,
      logo: PropTypes.string
    })
  ),
  t: PropTypes.func
};

export default compose(
  translate(),
  withFormik({
    displayName: "add-funds",
    mapPropsToValues: props => {
      let currency = props.currentWallet ? props.currentWallet.currency : "GVT";
      if (!props.wallets.find(wallet => wallet.currency === currency)) {
        currency = props.wallets[0] ? props.wallets[0].currency : "";
      }
      return {
        currency,
        amount: ""
      };
    }
  })
)(WalletAddFundsForm);
