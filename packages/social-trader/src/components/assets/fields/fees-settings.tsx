import "./fields.scss";

import AssetRow from "components/assets/asset-fields/asset-row";
import React from "react";
import { useTranslation } from "react-i18next";
import GVFormikField from "shared/components/gv-formik-field";
import GVNumberField from "shared/components/gv-number-field/gv-number-field";
import Hint from "shared/components/hint/hint";
import { VERTICAL_POPOVER_POS } from "shared/components/popover/popover";
import { allowValuesNumberFormat } from "shared/utils/helpers";

import AssetField from "../asset-fields/asset-field";

const _FeesSettings: React.FC<Props> = ({
  title,
  entryFeeName,
  entryFeeDescription,
  secondFeeName,
  secondFeeLabel,
  secondFeeUnderText,
  secondFeeDescription
}) => {
  const { t } = useTranslation();
  return (
    <>
      {title && <div className="create-asset-settings__row-title">{title}</div>}
      <AssetRow>
        <AssetField>
          <GVFormikField
            name={entryFeeName}
            label={t("create-program-page.settings.fields.entry-fee")}
            adornment="%"
            component={GVNumberField}
            autoComplete="off"
            decimalScale={4}
            isAllowed={allowValuesNumberFormat()}
          />
          <Hint
            content={t("create-program-page.settings.hints.entry-fee")}
            className="create-asset-settings__hint"
            vertical={VERTICAL_POPOVER_POS.BOTTOM}
            tooltipContent={entryFeeDescription}
          />
        </AssetField>
        <AssetField>
          <GVFormikField
            name={secondFeeName}
            label={secondFeeLabel}
            adornment="%"
            component={GVNumberField}
            autoComplete="off"
            decimalScale={4}
            isAllowed={allowValuesNumberFormat()}
          />
          <Hint
            content={secondFeeUnderText}
            className="create-asset-settings__hint"
            vertical={VERTICAL_POPOVER_POS.BOTTOM}
            tooltipContent={secondFeeDescription}
          />
        </AssetField>
      </AssetRow>
    </>
  );
};

interface Props {
  entryFeeName: string;
  entryFeeDescription: string;
  secondFeeName: string;
  secondFeeLabel: string;
  secondFeeUnderText: string;
  secondFeeDescription: string;
  title?: string;
}

const FeesSettings = React.memo(_FeesSettings);
export default FeesSettings;