import { PartnershipDetails } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { StatisticItemList } from "shared/components/statistic-item-list/statistic-item-list";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { withBlurLoader } from "shared/decorators/with-blur-loader";
import { CurrencyEnum } from "shared/utils/types";

const _ReferralRewardsBlock: React.FC<Props> = ({
  data: { totalReferralsL1, totalReferralsL2, totalAmount },
  currency
}) => {
  const [t] = useTranslation();
  return (
    <StatisticItemList>
      <StatisticItem
        big
        label={t("profile-page.referral-program.referral-friends-1lvl")}
      >
        {totalReferralsL1}
      </StatisticItem>
      <StatisticItem
        big
        label={t("profile-page.referral-program.referral-friends-2lvl")}
      >
        {totalReferralsL2}
      </StatisticItem>
      <StatisticItem
        big
        label={t("profile-page.referral-program.total-rewards")}
      >
        {totalAmount} {currency}
      </StatisticItem>
    </StatisticItemList>
  );
};

interface Props {
  data: PartnershipDetails;
  currency: CurrencyEnum;
}

export const ReferralRewardsBlock = withBlurLoader(
  React.memo(_ReferralRewardsBlock)
);
