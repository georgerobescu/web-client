import * as React from "react";
import NumberFormat from "react-number-format";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Status from "shared/components/status/status";
import TransactionAsset from "shared/modules/transaction-details/details-asset";
import { TransactionDetailsProps } from "shared/modules/transaction-details/transaction-details";
import { formatCurrencyValue } from "shared/utils/formatter";

const _SignalTransaction: React.FC<TransactionDetailsProps> = ({ data, t }) => {
  const details = data.programDetails;
  return (
    <>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{t(`transactions-details.title`)}</h2>
          <p>{t(`transactions-details.signal.${data.type}`)}</p>
        </div>
        {details && (
          <StatisticItem
            label={t(
              `transactions-details.investment.to-${details.programType}`
            )}
          >
            <TransactionAsset data={details} />
          </StatisticItem>
        )}
      </div>
      <div className="dialog__bottom">
        <StatisticItem label={t(`transactions-details.status.title`)}>
          <div className="external-transaction__status">
            {data.status} <Status status={data.status} />
          </div>
        </StatisticItem>
        <StatisticItem label={t(`transactions-details.investment.amount`)} big>
          <NumberFormat
            value={formatCurrencyValue(data.amount, data.currency)}
            suffix={data.currency}
            displayType="text"
          />
        </StatisticItem>
      </div>
    </>
  );
};
const SignalTransaction = React.memo<TransactionDetailsProps>(
  _SignalTransaction
);
export default SignalTransaction;