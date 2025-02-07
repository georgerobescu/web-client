import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import SettingsBlock from "shared/components/settings-block/settings-block";
import withLoader from "shared/decorators/with-loader";

import ClosePeriod from "./close-period";

const _ClosePeriodBlock: React.FC<Props> = ({
  t,
  label = t("manager.asset-settings.close-period.title"),
  id,
  closePeriod = () => {}
}) => (
  <SettingsBlock label={label}>
    <ClosePeriod onApply={closePeriod} id={id} />
  </SettingsBlock>
);

interface Props extends WithTranslation {
  label?: string;
  id: string;
  closePeriod?: () => void;
}

const ClosePeriodBlock = withLoader(translate()(React.memo(_ClosePeriodBlock)));
export default ClosePeriodBlock;
