import { MultiWalletExternalTransaction } from "gv-api-web";
import moment from "moment";
import * as React from "react";
import { Fragment } from "react";
import NumberFormat from "react-number-format";
import WalletImage from "shared/components/avatar/wallet-image/wallet-image";
import Profitability from "shared/components/profitability/profitability";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { UpdateItemsFuncType } from "shared/components/table/components/table.types";
import TransactionDetailsPopup from "shared/modules/transaction-details/transaction-details-popup";
import { formatValue } from "shared/utils/formatter";

import { TRANSACTIONS_DECIMAL_SCALE } from "./wallet-deposits-withdrawals.constants";

export interface ITransactionRowProps {
  transaction: MultiWalletExternalTransaction;
  update?: UpdateItemsFuncType;
}

export interface ITransactionRowState {
  isOpen: boolean;
}

class AllDepositsWithdrawalsRow extends React.PureComponent<
  ITransactionRowProps,
  ITransactionRowState
> {
  state = {
    isOpen: false
  };
  openPopup = () => {
    this.setState({ isOpen: true });
  };
  closePopup = () => {
    this.setState({ isOpen: false });
  };
  handleAction = () => {
    if (this.props.update) this.props.update();
    this.closePopup();
  };
  render() {
    const { transaction } = this.props;
    return (
      <React.Fragment>
        <TransactionDetailsPopup
          transactionId={transaction.id}
          open={this.state.isOpen}
          onClose={this.closePopup}
          onAction={this.handleAction}
        />
        <TableRow
          className="wallet-deposits-withdrawals__row"
          onClick={this.openPopup}
        >
          <TableCell className="wallet-deposits-withdrawals__cell wallet-deposits-withdrawals__cell--wallet">
            <WalletImage
              url={transaction.logo}
              alt={transaction.currency}
              className="wallet-deposits-withdrawals__icon-container"
              imageClassName="wallet-deposits-withdrawals__icon"
            />
            {transaction.currency}
          </TableCell>
          <TableCell className="wallet-deposits-withdrawals__cell wallet-deposits-withdrawals__cell--date">
            {moment(transaction.date).format()}
          </TableCell>
          <TableCell className="wallet-deposits-withdrawals__cell wallet-deposits-withdrawals__cell--status">
            {(transaction.statusUrl && (
              <a href={transaction.statusUrl} target="_blank">
                {transaction.status}
              </a>
            )) || <Fragment>{transaction.status}</Fragment>}
          </TableCell>
          <TableCell className="wallet-deposits-withdrawals__cell wallet-deposits-withdrawals__cell--amount">
            <Profitability
              value={formatValue(
                transaction.amount,
                TRANSACTIONS_DECIMAL_SCALE
              )}
            >
              <NumberFormat
                value={formatValue(
                  transaction.amount,
                  TRANSACTIONS_DECIMAL_SCALE
                )}
                thousandSeparator=" "
                displayType="text"
                suffix={` ${transaction.currency}`}
              />
            </Profitability>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
}

export default AllDepositsWithdrawalsRow;