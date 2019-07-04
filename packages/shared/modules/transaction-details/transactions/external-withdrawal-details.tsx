import * as React from "react";
import NumberFormat from "react-number-format";
import ActionButton from "shared/components/action-button/action-button";
import GVButton from "shared/components/gv-button";
import CopyIcon from "shared/components/icon/copy-icon";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Status from "shared/components/status/status";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import Copy from "shared/decorators/with-copy";
import ArrowIcon from "shared/media/arrow-up-thin.svg";
import { TransactionDetailsProps } from "shared/modules/transaction-details/transaction-details-dialog";
import filesService from "shared/services/file-service";
import { formatValue } from "shared/utils/formatter";

import TransactionDetails from "./transaction-details";

const ExternalWithdrawal: React.FC<TransactionDetailsProps> = ({
  data,
  t,
  handleCancel,
  handleResend
}) => (
  <TransactionDetails
    header={<p>{t(`transactions-details.withdrawal.title`)}</p>}
    body={
      <>
        <StatisticItem label={t(`transactions-details.external.from-wallet`)}>
          <div className="external-transaction">
            <div className="external-transaction__icon">
              <div className="profile-avatar">
                <img
                  className="external-transaction__wallet"
                  src={filesService.getFileUrl(data.currencyLogo)}
                  alt="wallet"
                />
              </div>
            </div>
            <div className="external-transaction__address">
              {data.currencyName}
            </div>
          </div>
        </StatisticItem>
        <StatisticItem label={t(`transactions-details.external.amount`)} big>
          <NumberFormat
            value={formatValue(data.amount, DEFAULT_DECIMAL_SCALE)}
            suffix={` ${data.currency}`}
            allowNegative={true}
            displayType="text"
          />
        </StatisticItem>
      </>
    }
    bottom={
      <>
        <StatisticItem label={t(`transactions-details.external.to`)}>
          <div className="external-transaction">
            <div className="external-transaction__icon">
              <div className="profile-avatar">
                <img src={ArrowIcon} alt={"external withdrawal"} />
              </div>
            </div>
            <div className="external-transaction__address">
              {data.externalTransactionDetails.fromAddress}
              <Copy>
                {({ copy }) => (
                  <GVButton
                    color="secondary"
                    onClick={() =>
                      copy(data.externalTransactionDetails.fromAddress)
                    }
                    variant="text"
                  >
                    <React.Fragment>
                      <CopyIcon primary />
                      &nbsp;
                      {t("buttons.copy")}
                    </React.Fragment>
                  </GVButton>
                )}
              </Copy>
            </div>
          </div>
        </StatisticItem>
        <StatisticItem label={t(`transactions-details.status.title`)}>
          <div className="external-transaction__status">
            {data.status} {data.externalTransactionDetails.description}{" "}
            <Status status={data.status} />
          </div>{" "}
        </StatisticItem>
        {data.externalTransactionDetails.isEnableActions && (
          <div className="external-transaction__actions">
            <ActionButton onClick={handleCancel} text={t("buttons.cancel")} />
            <ActionButton
              onClick={handleResend}
              text={t("buttons.resend-email")}
            />
          </div>
        )}
      </>
    }
  />
);

export default ExternalWithdrawal;
