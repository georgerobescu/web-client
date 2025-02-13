import "./fields.scss";

import React from "react";
import { useTranslation } from "react-i18next";
import GVFormikField from "shared/components/gv-formik-field";
import GVNumberField from "shared/components/gv-number-field/gv-number-field";
import Hint from "shared/components/hint/hint";
import { VERTICAL_POPOVER_POS } from "shared/components/popover/popover";
import { allowValuesNumberFormat } from "shared/utils/helpers";

import CreateAssetField from "../create-asset-field/create-asset-field";

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
      <div className="create-asset-settings__row">
        <CreateAssetField>
          <GVFormikField
            name={entryFeeName}
            label={t("manager.create-program-page.settings.fields.entry-fee")}
            adornment="%"
            component={GVNumberField}
            autoComplete="off"
            decimalScale={4}
            isAllowed={allowValuesNumberFormat()}
          />
          <Hint
            content={t("manager.create-program-page.settings.hints.entry-fee")}
            className="create-asset-settings__field-caption"
            vertical={VERTICAL_POPOVER_POS.BOTTOM}
            tooltipContent={entryFeeDescription}
          />
        </CreateAssetField>
        <CreateAssetField>
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
            className="create-asset-settings__field-caption"
            vertical={VERTICAL_POPOVER_POS.BOTTOM}
            tooltipContent={secondFeeDescription}
          />
        </CreateAssetField>
      </div>
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
