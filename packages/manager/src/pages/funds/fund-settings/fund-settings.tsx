import { FundDetailsFull, PlatformAsset, ProgramsInfo } from "gv-api-web";
import AssetEdit from "modules/asset-settings/asset-edit";
import CloseAssetBlock from "modules/asset-settings/close-asset/close-asset-block";
import InvestmentFees from "modules/asset-settings/investment-fees";
import React from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";
import { ASSET } from "shared/constants/constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";

import { TUpdateFundFunc } from "./fund-settings.page";
import Reallocation from "./reallocation/reallocation";

const _FundSettings: React.FC<Props> = ({
  programsInfo,
  reallocate,
  platformAssets,
  details,
  closeAsset,
  editAsset
}) => {
  const [t] = useTranslation();
  return (
    <>
      <Reallocation
        condition={details.personalFundDetails.canReallocate}
        availableReallocationPercents={
          details.personalFundDetails.availableReallocationPercents
        }
        onApply={reallocate}
        id={details.id}
        fundAssets={details.currentAssets}
        platformAssets={platformAssets}
      />
      <InvestmentFees
        asset={ASSET.FUND}
        programsInfo={programsInfo}
        entryFee={details.entryFee}
        exitFee={details.exitFee}
        onSubmit={editAsset}
      />
      <AssetEdit
        title={details.title}
        logo={{ src: details.logo }}
        description={details.description}
        onSubmit={editAsset}
      />
      <CloseAssetBlock
        label={t("manager.asset-settings.close-fund.title")}
        asset={ASSET.FUND}
        canCloseAsset={details.personalFundDetails.canCloseAsset}
        id={details.id}
        closeAsset={closeAsset}
      />
    </>
  );
};

interface Props extends OwnProps {}

interface OwnProps {
  programsInfo: ProgramsInfo;
  reallocate: () => void;
  platformAssets: PlatformAsset[];
  details: FundDetailsFull;
  closeAsset: () => void;
  editAsset: TUpdateFundFunc;
}

const FundSettings = compose<React.ComponentType<OwnProps & WithLoaderProps>>(
  withLoader,
  React.memo
)(_FundSettings);
export default FundSettings;
