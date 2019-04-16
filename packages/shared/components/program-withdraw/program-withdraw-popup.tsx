import { ProgramWithdrawInfo } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { ResponseError, SetSubmittingType } from "shared/utils/types";

import ProgramWithdrawAmountForm from "./program-withdraw-amount-form";
import ProgramWithdrawConfirmForm from "./program-withdraw-confirm-form";
import ProgramWithdrawTop from "./program-withdraw-top";

enum PROGRAM_WITHDRAW_FORM {
  ENTER_AMOUNT = "ENTER_AMOUNT",
  CONFIRM = "CONFIRM"
}

class _ProgramWithdrawPopup extends React.Component<
  IProgramWithdrawPopupProps & InjectedTranslateProps,
  State
> {
  state: State = {
    step: PROGRAM_WITHDRAW_FORM.ENTER_AMOUNT,
    rate: 1,
    errorMessage: undefined,
    periodEnds: undefined,
    title: undefined,
    amount: undefined,
    availableToWithdraw: undefined
  };

  componentDidMount() {
    const { fetchInfo } = this.props;
    fetchInfo()
      .then(data => {
        const { periodEnds, title, availableToWithdraw, rate } = data;
        this.setState({
          periodEnds,
          title,
          availableToWithdraw,
          rate
        });
      })
      .catch((error: ResponseError) =>
        this.setState({ errorMessage: error.errorMessage })
      );
  }

  handleSubmit = (setSubmitting: SetSubmittingType) => {
    const { withdraw } = this.props;
    const { amount } = this.state;

    if (!amount) return;
    return withdraw({
      amount
    }).catch((error: ResponseError) => {
      this.setState({ errorMessage: error.errorMessage });
      setSubmitting(false);
    });
  };

  handleEnterAmountSubmit = (amount?: number) => {
    this.setState({
      step: PROGRAM_WITHDRAW_FORM.CONFIRM,
      amount: amount || 0
    });
  };

  goToEnterAmountStep = () => {
    this.setState({
      step: PROGRAM_WITHDRAW_FORM.ENTER_AMOUNT,
      errorMessage: undefined
    });
  };

  render() {
    const {
      title,
      availableToWithdraw,
      periodEnds,
      rate,
      errorMessage,
      step,
      amount
    } = this.state;
    const { t, assetCurrency, accountCurrency } = this.props;
    if (availableToWithdraw === undefined || !title || !periodEnds)
      return <DialogLoader />;

    return (
      <>
        <ProgramWithdrawTop
          title={title}
          availableToWithdraw={availableToWithdraw}
          programCurrency={assetCurrency}
        />
        <div className="dialog__bottom">
          {step === PROGRAM_WITHDRAW_FORM.ENTER_AMOUNT && (
            <ProgramWithdrawAmountForm
              amount={amount}
              rate={rate}
              programCurrency={assetCurrency}
              accountCurrency={accountCurrency}
              availableToWithdraw={availableToWithdraw}
              onSubmit={this.handleEnterAmountSubmit}
            />
          )}
          {step === PROGRAM_WITHDRAW_FORM.CONFIRM && amount && (
            <ProgramWithdrawConfirmForm
              errorMessage={errorMessage}
              amount={amount}
              onSubmit={this.handleSubmit}
              onBackClick={this.goToEnterAmountStep}
              programCurrency={assetCurrency}
              periodEnds={periodEnds}
            />
          )}
          <div className="dialog__info">{t("withdraw-program.info")}</div>
        </div>
      </>
    );
  }
}

const ProgramWithdrawPopup = translate()(_ProgramWithdrawPopup);

export default ProgramWithdrawPopup;

export interface IProgramWithdrawPopupProps {
  assetCurrency: string;
  accountCurrency: string;
  fetchInfo(): Promise<ProgramWithdrawInfo>;
  withdraw(value: ProgramWithdrawType): Promise<void>;
}

export type ProgramWithdrawType = {
  amount: number;
};

interface State {
  errorMessage?: string;
  step: PROGRAM_WITHDRAW_FORM;
  rate: number;
  amount?: number;
  availableToWithdraw?: number;
  periodEnds?: Date;
  title?: string;
}