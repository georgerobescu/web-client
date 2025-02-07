import { InjectedFormikProps, withFormik } from "formik";
import { ProgramInvestInfo, WalletBaseData } from "gv-api-web";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import { DialogBottom } from "shared/components/dialog/dialog-bottom";
import { DialogButtons } from "shared/components/dialog/dialog-buttons";
import { DialogField } from "shared/components/dialog/dialog-field";
import FormError from "shared/components/form/form-error/form-error";
import GVButton from "shared/components/gv-button";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { ASSET, ROLE, ROLE_ENV } from "shared/constants/constants";
import useRole from "shared/hooks/use-role.hook";
import { fetchRate } from "shared/services/rate-service";
import { convertToCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue, validateFraction } from "shared/utils/formatter";
import { CurrencyEnum, SetSubmittingType } from "shared/utils/types";

import {
  investorSchema,
  managerSchema
} from "./deposit-form-validation-schema";
import { TInvestInfo } from "./deposit.types";
import { ConvertCurrency } from "./form-fields/convert-currency";
import { InvestorFees } from "./form-fields/investor-fees";
import { WalletField } from "./form-fields/wallet-field";

const INIT_WALLET_CURRENCY = "GVT";

const isAllow = (currency: string) => ({
  formattedValue,
  value
}: NumberFormatValues): boolean =>
  (formattedValue === "" || validateFraction(value, currency)) && value !== ".";

const _DepositForm: React.FC<
  InjectedFormikProps<Props, IDepositFormValues>
> = ({
  t,
  wallets,
  asset,
  hasEntryFee,
  values,
  info,
  currency,
  isValid,
  dirty,
  handleSubmit,
  isSubmitting,
  errorMessage,
  setFieldValue,
  setFieldTouched
}) => {
  const role = useRole();
  const { walletCurrency, amount = 0 } = values;
  const [rate, setRate] = useState<number>(1);
  const [availableInWallet, setAvailableInWallet] = useState<number>(0);
  const [availableToInvest, setAvailableToInvest] = useState<number>(0);
  useEffect(() => {
    fetchRate(walletCurrency, currency).then(setRate);
  }, [currency, walletCurrency]);
  useEffect(() => {
    const maxAvailable =
      (info as ProgramInvestInfo).availableToInvestBase !== undefined
        ? (info as ProgramInvestInfo).availableToInvestBase
        : Number.MAX_SAFE_INTEGER;
    setAvailableToInvest(convertToCurrency(maxAvailable, rate));
    setFieldValue(DEPOSIT_FORM_FIELDS.availableToInvest, maxAvailable);
  }, [info, rate, setFieldValue]);
  useEffect(() => {
    const available = wallets.find(
      ({ currency }) => currency === walletCurrency
    )!.available;
    setAvailableInWallet(available);
    setFieldValue(DEPOSIT_FORM_FIELDS.availableInWallet, available);
  }, [setFieldValue, walletCurrency, wallets]);
  useEffect(() => {
    setFieldValue(DEPOSIT_FORM_FIELDS.rate, rate);
  }, [rate, setFieldValue]);

  const setMaxAmount = useCallback((): void => {
    const max = formatCurrencyValue(
      role === ROLE.INVESTOR
        ? Math.min(availableInWallet, availableToInvest)
        : availableInWallet,
      walletCurrency
    );
    setFieldValue(DEPOSIT_FORM_FIELDS.amount, max);
  }, [
    availableInWallet,
    availableToInvest,
    role,
    setFieldValue,
    walletCurrency
  ]);

  const onWalletChange = ({ currency, id }: WalletBaseData) => {
    setFieldValue(DEPOSIT_FORM_FIELDS.walletCurrency, currency);
    setFieldValue(DEPOSIT_FORM_FIELDS.walletId, id);
    setFieldValue(DEPOSIT_FORM_FIELDS.amount, "");
    setFieldTouched(DEPOSIT_FORM_FIELDS.amount, false);
  };

  return (
    <form id="invest-form" onSubmit={handleSubmit}>
      <DialogBottom>
        <WalletField
          wallets={wallets}
          name={DEPOSIT_FORM_FIELDS.walletId}
          onChange={onWalletChange}
        />
        <DialogField>
          <StatisticItem label={t("deposit-asset.available-in-wallet")} big>
            {formatCurrencyValue(availableInWallet, walletCurrency)}{" "}
            {walletCurrency}
          </StatisticItem>
        </DialogField>
        <InputAmountField
          name={DEPOSIT_FORM_FIELDS.amount}
          label={t("deposit-asset.amount")}
          currency={walletCurrency}
          isAllow={isAllow(walletCurrency)}
          setMax={setMaxAmount}
        />
        <ConvertCurrency
          condition={currency !== walletCurrency}
          amount={amount}
          rate={rate}
          currency={currency}
        />
        <InvestorFees
          condition={role === ROLE.INVESTOR}
          hasEntryFee={hasEntryFee}
          info={info}
          amount={amount}
          rate={rate}
          currency={currency}
          walletCurrency={walletCurrency}
        />
        <FormError error={errorMessage} />
        <DialogButtons>
          <GVButton
            type="submit"
            className="invest-form__submit-button"
            disabled={isSubmitting || !isValid || !dirty}
          >
            {t("deposit-asset.confirm")}
          </GVButton>
        </DialogButtons>
        {asset === ASSET.FUND && (
          <div className="dialog__info">
            {t("deposit-asset.fund.disclaimer")}
          </div>
        )}
      </DialogBottom>
    </form>
  );
};

const DepositForm = compose<React.FC<IDepositOwnProps>>(
  translate(),
  withFormik<Props, IDepositFormValues>({
    enableReinitialize: true,
    displayName: "invest-form",
    mapPropsToValues: ({ wallets }) => ({
      [DEPOSIT_FORM_FIELDS.rate]: 1,
      [DEPOSIT_FORM_FIELDS.walletId]: wallets.find(
        wallet => wallet.currency === INIT_WALLET_CURRENCY
      )!.id,
      [DEPOSIT_FORM_FIELDS.amount]: undefined,
      [DEPOSIT_FORM_FIELDS.walletCurrency]: INIT_WALLET_CURRENCY
    }),
    validationSchema: (params: Props) =>
      ROLE_ENV || ROLE.MANAGER === ROLE.MANAGER // TODO remove after union
        ? managerSchema(params)
        : investorSchema(params),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(
        values[DEPOSIT_FORM_FIELDS.amount]!,
        values[DEPOSIT_FORM_FIELDS.walletCurrency],
        setSubmitting
      );
    }
  })
)(_DepositForm);
export default DepositForm;

export enum DEPOSIT_FORM_FIELDS {
  rate = "rate",
  amount = "amount",
  walletCurrency = "walletCurrency",
  walletId = "walletId",
  availableToInvest = "availableToInvest",
  availableInWallet = "availableInWallet"
}

export interface IDepositOwnProps {
  wallets: WalletBaseData[];
  asset: ASSET;
  hasEntryFee: boolean;
  info: TInvestInfo;
  currency: CurrencyEnum;
  errorMessage: string;
  onSubmit: (
    amount: number,
    currency: CurrencyEnum,
    setSubmitting: SetSubmittingType
  ) => void;
}

interface Props extends IDepositOwnProps, WithTranslation {}

export interface IDepositFormValues {
  [DEPOSIT_FORM_FIELDS.rate]: number;
  [DEPOSIT_FORM_FIELDS.availableToInvest]?: number;
  [DEPOSIT_FORM_FIELDS.availableInWallet]?: number;
  [DEPOSIT_FORM_FIELDS.amount]?: number;
  [DEPOSIT_FORM_FIELDS.walletCurrency]: CurrencyEnum;
}
