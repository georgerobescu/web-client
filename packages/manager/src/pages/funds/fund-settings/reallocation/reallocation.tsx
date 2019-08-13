import {
  CancelablePromise,
  FundAssetPart,
  FundAssetPartWithIcon,
  PlatformAsset
} from "gv-api-web";
import SettingsBlock from "modules/asset-settings/settings-block";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import useErrorMessage from "shared/hooks/error-message.hook";
import { MiddlewareDispatch } from "shared/utils/types";

import ReallocateForm, {
  IReallocateFormValues
} from "./components/reallocate-form";
import { updateAssets } from "./services/reallocate.services";

const _Reallocation: React.FC<Props> = ({
  onApply,
  platformAssets,
  fundAssets,
  t,
  id,
  service
}) => {
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const handleApply = useCallback(
    ({ assets }: IReallocateFormValues, isSubmitting) => {
      service
        .updateAssets(id, assets)
        .then(onApply)
        .catch(setErrorMessage)
        .finally(() => isSubmitting(false));
    },
    [id]
  );
  return (
    <SettingsBlock
      label={t("manager.fund-settings.reallocation.title")}
      content={
        <>
          <ReallocateForm
            condition={!!fundAssets.length}
            fundAssets={fundAssets}
            platformAssets={platformAssets}
            onSubmit={handleApply}
            errorMessage={errorMessage}
          />
        </>
      }
    />
  );
};

interface Props extends OwnProps, WithTranslation, DispatchProps {}

interface OwnProps {
  id: string;
  platformAssets: PlatformAsset[];
  fundAssets: FundAssetPartWithIcon[];
  onApply: () => void;
}

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    updateAssets: (id: string, assets: FundAssetPart[]) =>
      dispatch(updateAssets(id, assets))
  }
});

interface DispatchProps {
  service: {
    updateAssets: (
      id: string,
      assets: FundAssetPart[]
    ) => CancelablePromise<void>;
  };
}

const Reallocation = compose<React.ComponentType<OwnProps & WithLoaderProps>>(
  withLoader,
  connect(
    null,
    mapDispatchToProps
  ),
  translate(),
  React.memo
)(_Reallocation);
export default Reallocation;