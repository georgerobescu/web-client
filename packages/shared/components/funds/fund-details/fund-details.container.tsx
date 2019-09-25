import "shared/components/details/details.scss";

import { FundDetailsFull } from "gv-api-web";
import React from "react";
import { compose } from "redux";
import DetailsInvestment from "shared/components/details/details-description-section/details-investment/details-investment";
import { InvestmentDetails } from "shared/components/details/details-description-section/details-investment/details-investment.helpers";
import Page from "shared/components/page/page";
import { ASSET } from "shared/constants/constants";
import {
  withBlurLoader,
  WithBlurLoaderProps
} from "shared/decorators/with-blur-loader";
import { fundEventsSelector } from "shared/reducers/platform-reducer";
import { CurrencyEnum } from "shared/utils/types";

import FundDetailsDescriptionSection from "./fund-details-description/fund-details-description-section";
import FundDetailsHistorySection from "./fund-details-history-section/fund-details-history-section";
import FundDetailsStatisticSection from "./fund-details-statistics-section/fund-details-statistic-section";
import { IDescriptionSection } from "./fund-details.types";
import { fundEventsTableSelector } from "./reducers/fund-history.reducer";
import { dispatchFundDescription } from "./services/fund-details.service";

const _FundDetailsContainer: React.FC<Props> = ({
  descriptionSection,
  data: description
}) => (
  <Page title={description.title}>
    <FundDetailsDescriptionSection
      fundDescription={description}
      FundControls={descriptionSection.FundControls}
    />
    <div className="details__divider" />
    <DetailsInvestment
      fees={{
        exitFee: description.exitFee,
        entryFee: description.entryFee,
        exitFeePersonal: description.personalFundDetails.exitFeePersonal
      }}
      dispatchDescription={dispatchFundDescription}
      eventTypesSelector={fundEventsSelector}
      asset={ASSET.FUND}
      selector={fundEventsTableSelector}
      id={description.id}
      currency={"GVT" as CurrencyEnum}
      personalDetails={description.personalFundDetails as InvestmentDetails}
      WithdrawContainer={descriptionSection.FundWithdrawalContainer}
    />
    <FundDetailsStatisticSection />
    <FundDetailsHistorySection id={description.id} />
  </Page>
);

interface Props {
  descriptionSection: IDescriptionSection;
  data: FundDetailsFull;
}

const FundDetailsContainer = compose<
  React.ComponentType<Props & WithBlurLoaderProps<FundDetailsFull>>
>(
  withBlurLoader,
  React.memo
)(_FundDetailsContainer);
export default FundDetailsContainer;
