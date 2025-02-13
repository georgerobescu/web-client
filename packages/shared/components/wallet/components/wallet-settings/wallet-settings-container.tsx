import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import useApiRequest from "shared/hooks/api-request.hook";
import useIsOpen from "shared/hooks/is-open.hook";

import {
  offPayFeesWithGvt,
  onPayFeesWithGvt
} from "../../services/wallet.services";
import WalletSettings from "./wallet-settings";

const _WalletSettingsContainer: React.FC<Props> = ({
  isPayFeesWithGvt: isPayFeesWithGvtProp
}) => {
  const [t] = useTranslation();
  const [isOpenGVTFees, setOpenGVTFees, setCloseGVTFees] = useIsOpen();
  const [
    isPayFeesWithGvt,
    setPayFeesWithGvt,
    setNotPayFeesWithGvt,
    setPayFeesWithGvtValue
  ] = useIsOpen(isPayFeesWithGvtProp);
  const request = isPayFeesWithGvt ? offPayFeesWithGvt : onPayFeesWithGvt;
  const { isPending, sendRequest } = useApiRequest({ request });
  const handleSwitch = useCallback(
    () =>
      sendRequest().then(() => {
        setPayFeesWithGvtValue(!isPayFeesWithGvt);
      }),
    [request, isPayFeesWithGvt]
  );
  return (
    <WalletSettings
      name="PayGVTFee"
      label={t("wallet-page.settings.label")}
      isPayFeesWithGvt={isPayFeesWithGvt}
      isPending={isPending}
      handleOpenGVTFees={setOpenGVTFees}
      handleCloseGVTFees={setCloseGVTFees}
      handleSwitch={handleSwitch}
      isOpenGVTFees={isOpenGVTFees}
    />
  );
};

interface Props extends OwnProps {}

interface OwnProps {
  isPayFeesWithGvt: boolean;
}

const WalletSettingsContainer = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  React.memo
)(_WalletSettingsContainer);
export default WalletSettingsContainer;
