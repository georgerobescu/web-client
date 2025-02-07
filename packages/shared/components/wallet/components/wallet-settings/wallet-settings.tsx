import "./wallet-settings.scss";

import * as React from "react";
import GVSwitch from "shared/components/gv-selection/gv-switch";
import GVTFees from "shared/components/gvt-fees/gvt-fees";
import HelpButton from "shared/components/help-button/help-button";

const _WalletSettings: React.FC<Props> = ({
  isOpenGVTFees,
  isPayFeesWithGvt,
  name,
  label,
  isPending,
  handleOpenGVTFees,
  handleCloseGVTFees,
  handleSwitch
}) => (
  <div className="wallet-settings">
    <HelpButton
      className="wallet-settings__question"
      onClick={handleOpenGVTFees}
    />
    <div className="wallet-settings__label">{label}</div>
    <GVSwitch
      touched={false}
      className="wallet-settings__switch"
      name={name}
      value={isPayFeesWithGvt}
      disabled={isPending}
      color="primary"
      onChange={handleSwitch}
    />
    <GVTFees open={isOpenGVTFees} onClose={handleCloseGVTFees} />
  </div>
);

interface Props {
  isOpenGVTFees: boolean;
  isPayFeesWithGvt: boolean;
  name: string;
  label: string;
  isPending: boolean;
  handleOpenGVTFees: () => void;
  handleCloseGVTFees: () => void;
  handleSwitch: () => void;
}

const WalletSettings = React.memo(_WalletSettings);
export default WalletSettings;
