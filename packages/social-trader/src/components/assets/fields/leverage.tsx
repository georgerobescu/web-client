import React from "react";
import { useTranslation } from "react-i18next";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import Select from "shared/components/select/select";

import AssetField from "../asset-fields/asset-field";

const _Leverage: React.FC<Props> = ({ name, accountLeverages }) => {
  const [t] = useTranslation();
  return (
    <AssetField>
      <GVFormikField
        name={name}
        component={GVTextField}
        label={t("create-program-page.settings.fields.brokers-leverage")}
        InputComponent={Select}
        disableIfSingle
        className="create-program-settings__leverage"
      >
        {accountLeverages.map(leverage => (
          <option value={leverage} key={leverage}>
            {leverage}
          </option>
        ))}
      </GVFormikField>
    </AssetField>
  );
};

interface Props {
  name: string;
  accountLeverages: number[];
}

const Leverage = React.memo(_Leverage);
export default Leverage;