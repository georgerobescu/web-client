import "./follow-popup.scss";

import { CopyTradingAccountInfo, WalletData, WalletInfo } from "gv-api-web";
import * as React from "react";
import { Fragment } from "react";

import FollowCreateAccount from "./follow-popup-create-account";
import FollowParams from "./follow-popup-params";
import FollowTop from "./follow-popup-top";

enum TABS {
  CREATE_ACCOUNT = "CREATE_ACCOUNT",
  PARAMS = "PARAMS"
}
export interface IFollowFormProps {
  handleSubmit: () => void;
  submitMethod: (
    programId: string,
    requestParams: IRequestParams
  ) => Promise<any>;
  id: string;
  signalAccounts: any; //CopyTradingAccountInfo[];
  wallets: WalletData[];
  walletsAddresses: WalletInfo[];
  currency: string;
  programName: string;
}
interface IFollowFormState {
  step: TABS;
  requestParams: IRequestParams;
  errors: { code: string; errorMessage: string };
}
export interface IRequestParams {
  mode?: string;
  percent?: number;
  openTolerancePercent?: number;
  fixedVolume?: number;
  fixedCurrency?: string;
  initialDepositCurrency?: string;
  initialDepositAmount?: number;
}
class FollowForm extends React.Component<IFollowFormProps, IFollowFormState> {
  state = {
    requestParams: {},
    step: TABS.CREATE_ACCOUNT,
    errors: { code: "", errorMessage: "" }
  };
  createdCopytradingAccount = (values: IRequestParams) => {
    this.setState({
      step: TABS.PARAMS,
      requestParams: { ...this.state.requestParams, ...values }
    });
  };
  componentDidMount() {
    const { signalAccounts, currency } = this.props;
    const signalAccount =
      signalAccounts &&
      signalAccounts.find((account: any) => account.currency === currency);
    if (signalAccount) this.setState({ step: TABS.PARAMS });
  }
  submit = (values: IRequestParams) => {
    const { handleSubmit, id } = this.props;
    this.setState(
      {
        requestParams: { ...this.state.requestParams, ...values }
      },
      () =>
        this.props.submitMethod(id, this.state.requestParams).then(
          (res: any) => {
            handleSubmit();
            console.log(res);
          },
          (errors: any) => {
            console.log(errors);
            this.setState({
              errors
            });
          }
        )
    );
  };
  render() {
    const {
      signalAccounts,
      wallets,
      walletsAddresses,
      currency,
      programName
    } = this.props;
    const { errors, step } = this.state;
    const adaptStep =
      step === TABS.CREATE_ACCOUNT ? "create-account" : "params";
    return (
      <Fragment>
        <FollowTop programName={programName} step={adaptStep} />
        {!signalAccounts && step === TABS.CREATE_ACCOUNT && (
          <FollowCreateAccount
            wallets={wallets}
            walletsAddresses={walletsAddresses}
            currency={currency}
            onClick={this.createdCopytradingAccount}
          />
        )}
        {/*{step === TABS.PARAMS && (*/}
        {/*<FollowParams onClick={this.submit} />*/}
        {/*)}*/}
        {errors.errorMessage && (
          <div className="follow-popup__errors">{errors.errorMessage}</div>
        )}
      </Fragment>
    );
  }
}

export default FollowForm;
