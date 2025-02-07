import "./program-settings.scss";

import {
  BrokersProgramInfo,
  ProgramDetailsFullOld,
  ProgramsInfo
} from "gv-api-web";
import AssetEdit from "modules/asset-settings/asset-edit";
import CloseAssetBlock from "modules/asset-settings/close-asset/close-asset-block";
import ClosePeriodBlock from "modules/asset-settings/close-period/close-period-block";
import InvestmentFees from "modules/asset-settings/investment-fees";
import React from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";
import { ASSET } from "shared/constants/constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import { SetSubmittingType } from "shared/utils/types";

import CancelChangeBroker from "./cancel-change-broker/cancel-change-broker";
import ChangeBroker from "./change-broker/change-broker";
import { ChangeBrokerFormValues } from "./change-broker/change-broker-form";
import ChangePassword from "./change-password/change-password";
import InvestmentLimit from "./investment-limit";
import { TUpdateProgramFunc } from "./program-settings.page";
import SignalingEdit, { IProgramSignalFormValues } from "./signaling-edit";
import StopOutLevel from "./stop-out-level";
import TradesUpdating from "./trades-updating";
import TwoFactorConfirm from "./two-factor-confirm";

const _ProgramSettings: React.FC<Props> = ({
  programsInfo,
  cancelChangeBroker,
  brokersInfo,
  details,
  changeBroker,
  editProgram,
  closePeriod,
  closeProgram,
  changeSignaling
}) => {
  const [t] = useTranslation();
  const signalSuccessFee = details.isSignalProgram
    ? details.signalSuccessFee
    : undefined;
  const signalVolumeFee = details.isSignalProgram
    ? details.signalVolumeFee
    : undefined;
  return (
    <>
      <TwoFactorConfirm
        condition={details.personalProgramDetails.showTwoFactorButton}
        id={details.id}
      />
      <ClosePeriodBlock
        condition={!!details.personalProgramDetails.canClosePeriod}
        id={details.id}
        closePeriod={closePeriod}
      />
      <ChangePassword
        condition={
          details.personalProgramDetails.canChangePassword &&
          details.personalProgramDetails.canCloseAsset
        }
        title={details.title}
        id={details.id}
      />
      <CancelChangeBroker
        condition={!!details.personalProgramDetails.migration}
        isSignalProgram={details.isSignalProgram}
        brokerFrom={
          brokersInfo.brokers.find(
            broker =>
              !!broker.accountTypes.find(
                accountType =>
                  accountType.id === brokersInfo.currentAccountTypeId
              )
          )!
        }
        migration={details.personalProgramDetails.migration}
        onSubmit={cancelChangeBroker}
        currentAccountTypeId={brokersInfo.currentAccountTypeId}
        leverage={details.leverageMax}
      />
      <ChangeBroker
        condition={
          !!!details.personalProgramDetails.migration &&
          brokersInfo.brokers.length > 1
        }
        isSignalProgram={details.isSignalProgram}
        onSubmit={changeBroker}
        id={details.id}
        brokers={brokersInfo.brokers}
        currentAccountTypeId={brokersInfo.currentAccountTypeId}
        currentLeverage={details.leverageMax}
      />
      <InvestmentFees
        asset={ASSET.PROGRAM}
        programsInfo={programsInfo}
        entryFee={details.entryFeeSelected}
        successFee={details.successFeeCurrent}
        onSubmit={editProgram}
      />
      <TradesUpdating
        condition={!details.isSignalProgram}
        tradesDelay={details.tradesDelay}
        onSubmit={editProgram}
      />
      <StopOutLevel
        stopOutLevel={details.stopOutLevelCurrent}
        onSubmit={editProgram}
      />
      <InvestmentLimit
        currency={details.currency}
        investmentLimit={details.availableInvestmentLimit}
        onSubmit={editProgram}
      />
      <SignalingEdit
        condition={
          details.isSignalProgram ||
          (!details.isSignalProgram &&
            details.personalProgramDetails.canMakeSignalProvider)
        }
        isSignalProgram={details.isSignalProgram}
        onSubmit={changeSignaling}
        signalSuccessFee={signalSuccessFee}
        signalVolumeFee={signalVolumeFee}
      />
      <AssetEdit
        title={details.title}
        logo={{ src: details.logo }}
        description={details.description}
        onSubmit={editProgram}
      />
      <CloseAssetBlock
        label={t("manager.asset-settings.close-program.title")}
        asset={ASSET.PROGRAM}
        canCloseAsset={details.personalProgramDetails.canCloseAsset}
        id={details.id}
        closeAsset={closeProgram}
      />
    </>
  );
};

interface Props {
  programsInfo: ProgramsInfo;
  details: ProgramDetailsFullOld;
  brokersInfo: BrokersProgramInfo;
  changeSignaling: (
    values: IProgramSignalFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
  closePeriod: () => void;
  closeProgram: () => void;
  changeBroker: (
    values: ChangeBrokerFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
  editProgram: TUpdateProgramFunc;
  cancelChangeBroker: () => void;
}

const ProgramSettings = compose<React.ComponentType<Props & WithLoaderProps>>(
  withLoader,
  React.memo
)(_ProgramSettings);
export default ProgramSettings;
