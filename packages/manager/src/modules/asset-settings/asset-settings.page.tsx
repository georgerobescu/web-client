import "shared/components/details/details.scss";

import { BrokersProgramInfo, ProgramDetailsFull } from "gv-api-web";
import { programEditSignal } from "modules/program-signal/program-edit-signal/services/program-edit-signal.service";
import React, { useCallback, useEffect, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import { IImageValue } from "shared/components/form/input-image/input-image";
import Page from "shared/components/page/page";
import { programDescriptionSelector } from "shared/components/programs/program-details/reducers/description.reducer";
import {
  dispatchProgramDescription,
  getProgramBrokers
} from "shared/components/programs/program-details/services/program-details.service";
import { ASSET } from "shared/constants/constants";
import { RootState } from "shared/reducers/root-reducer";
import { SetSubmittingType } from "shared/utils/types";

import { ChangeBrokerFormValues } from "./change-broker/change-broker-form";
import AssetSettings from "./asset-settings";
import AssetSettingsLoader from "./asset-settings.loader";
import {
  cancelChangeBrokerMethod,
  changeBrokerMethod,
  editAsset,
  redirectToProgram
} from "./services/asset-settings.service";
import { IAssetSignalFormValues } from "./signaling-edit";

const _AssetsEditPage: React.FC<Props> = ({
  service: {
    dispatchAssetDescription,
    programEditSignal,
    changeBrokerMethod,
    cancelChangeBrokerMethod,
    editAsset,
    redirectToAsset
  },
  t,
  description
}) => {
  const [brokersInfo, setBrokersInfo] = useState<
    BrokersProgramInfo | undefined
  >(undefined);
  useEffect(() => {
    dispatchAssetDescription();
  }, []);
  useEffect(
    () => {
      description && getProgramBrokers(description.id).then(setBrokersInfo);
    },
    [description]
  );
  const changeSignaling = useCallback(
    ({ volumeFee, successFee }: IAssetSignalFormValues) =>
      programEditSignal(description!.id, successFee!, volumeFee!).then(
        dispatchAssetDescription
      ),
    [description]
  );
  const changeBroker = useCallback(
    ({ brokerAccountTypeId, leverage }: ChangeBrokerFormValues) => {
      changeBrokerMethod(description!.id, brokerAccountTypeId, leverage).then(
        dispatchAssetDescription
      );
    },
    [description]
  );
  const cancelChangeBroker = useCallback(
    () => {
      cancelChangeBrokerMethod(description!.id).then(dispatchAssetDescription);
    },
    [description]
  );
  const editAssetCallback: TUpdateAssetFunc = useCallback(
    values => {
      const currentValues = {
        title: description!.title,
        stopOutLevel: description!.stopOutLevel,
        description: description!.description,
        logo: { src: description!.logo },
        investmentLimit: description!.availableInvestmentLimit
      };
      editAsset(
        description!.id,
        { ...currentValues, ...values },
        ASSET.PROGRAM
      ).then(dispatchAssetDescription);
    },
    [description]
  );
  const applyCloseAsset = useCallback(() => redirectToAsset(), []);
  return (
    <Page title={t("manager.asset-settings.title")}>
      <AssetSettings
        condition={!!description && !!brokersInfo}
        loader={<AssetSettingsLoader />}
        changeSignaling={changeSignaling}
        closePeriod={dispatchAssetDescription}
        closeAsset={applyCloseAsset}
        details={description!}
        brokersInfo={brokersInfo!}
        changeBroker={changeBroker}
        editAsset={editAssetCallback}
        cancelChangeBroker={cancelChangeBroker}
      />
    </Page>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  description: programDescriptionSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      cancelChangeBrokerMethod,
      dispatchProgramDescription,
      editAsset,
      programEditSignal,
      changeBrokerMethod,
      redirectToProgram
    },
    dispatch
  )
});

export type TUpdateAssetFunc = (
  values: {
    description?: string;
    logo?: IImageValue;
    investmentLimit?: number;
    stopOutLevel?: number;
  },
  setSubmitting: SetSubmittingType
) => void;

interface OwnProps {}

interface StateProps {
  description?: ProgramDetailsFull;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  cancelChangeBrokerMethod: typeof cancelChangeBrokerMethod;
  dispatchProgramDescription: typeof dispatchProgramDescription;
  editAsset: typeof editAsset;
  programEditSignal: typeof programEditSignal;
  changeBrokerMethod: typeof changeBrokerMethod;
  redirectToProgram: typeof redirectToProgram;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends OwnProps, DispatchProps, WithTranslation, StateProps {}

const AssetSettingsPage = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_AssetsEditPage);
export default AssetSettingsPage;
