import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { DialogBottom } from "shared/components/dialog/dialog-bottom";
import { DialogTop } from "shared/components/dialog/dialog-top";

const _TransactionDetails: React.FC<Props> = ({ header, body, bottom, t }) => (
  <>
    <DialogTop title={t(`transactions-details.title`)} subtitle={header}>
      {body}
    </DialogTop>
    <DialogBottom>{bottom}</DialogBottom>
  </>
);

interface Props extends OwnProps, WithTranslation {}

interface OwnProps {
  header: JSX.Element;
  body: JSX.Element;
  bottom: JSX.Element;
}

const TransactionDetails = compose<React.ComponentType<OwnProps>>(
  translate(),
  React.memo
)(_TransactionDetails);
export default TransactionDetails;
