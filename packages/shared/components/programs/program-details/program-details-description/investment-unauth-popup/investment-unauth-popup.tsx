import "./investment-unauth-popup.scss";

import React from "react";
import { DepositTopOwnProps } from "shared/components/deposit/components/deposit-top";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import dynamic from "next/dynamic";

const InvestmentUnAuthForm = dynamic(() => import("./investment-unauth-from"));

const _InvestmentUnauthPopup: React.FC<Props> = props => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <InvestmentUnAuthForm {...props} />
    </Dialog>
  );
};

const InvestmentUnauthPopup = React.memo(_InvestmentUnauthPopup);
export default InvestmentUnauthPopup;

interface Props extends DepositTopOwnProps, IDialogProps {
  message: string;
}
