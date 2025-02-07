import { FundAssetPartWithIcon, PlatformAsset } from "gv-api-web";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import SettingsBlock from "shared/components/settings-block/settings-block";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import useApiRequest from "shared/hooks/api-request.hook";

import ReallocateForm, {
  IReallocateFormValues
} from "./components/reallocate-form";
import { updateAssets } from "./services/reallocate.services";

const _Reallocation: React.FC<Props> = ({
  availableReallocationPercents,
  onApply,
  platformAssets,
  fundAssets,
  id
}) => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const { errorMessage, sendRequest } = useApiRequest({
    request: args => dispatch(updateAssets(args))
  });
  const handleApply = useCallback(
    ({ assets }: IReallocateFormValues, isSubmitting) => {
      sendRequest({ id, assets }, isSubmitting).then(onApply);
    },
    [id]
  );
  return (
    <SettingsBlock label={t("manager.fund-settings.reallocation.title")}>
      <ReallocateForm
        condition={!!fundAssets.length}
        availableReallocationPercents={availableReallocationPercents}
        fundAssets={fundAssets}
        platformAssets={platformAssets}
        onSubmit={handleApply}
        errorMessage={errorMessage}
      />
    </SettingsBlock>
  );
};

interface Props {
  availableReallocationPercents: number;
  id: string;
  platformAssets: PlatformAsset[];
  fundAssets: FundAssetPartWithIcon[];
  onApply: () => void;
}

const Reallocation = compose<React.ComponentType<Props & WithLoaderProps>>(
  withLoader,
  React.memo
)(_Reallocation);
export default Reallocation;
