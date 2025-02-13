import * as React from "react";
import { useTranslation } from "react-i18next";
import { DialogTop } from "shared/components/dialog/dialog-top";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatCurrencyValue } from "shared/utils/formatter";

interface IFundWithdrawTopProps {
  isPending: boolean;
  availableToWithdraw: number;
  currency: string;
  title: string;
}

const _FundWithdrawTop: React.FC<IFundWithdrawTopProps> = ({
  isPending,
  availableToWithdraw,
  title,
  currency
}) => {
  const [t] = useTranslation();
  return (
    <DialogTop title={t("withdraw-fund.title")} subtitle={title}>
      <StatisticItem
        label={t("withdraw-fund.available-to-withdraw")}
        big
        isPending={isPending}
      >
        {formatCurrencyValue(availableToWithdraw, currency)} {currency}
      </StatisticItem>
    </DialogTop>
  );
};

export const FundWithdrawTop = React.memo(_FundWithdrawTop);
