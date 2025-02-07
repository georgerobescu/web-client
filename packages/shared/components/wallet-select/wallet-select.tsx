import "./wallet-select.scss";

import { CopyTradingAccountInfo, WalletBaseData, WalletData } from "gv-api-web";
import React from "react";
import { CurrencyItem } from "shared/components/currency-item/currency-item";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import Select, { ISelectChangeEvent } from "shared/components/select/select";

const _WalletSelect: React.FC<Props> = ({ items, onChange, label, name }) => (
  <GVFormikField
    name={name}
    component={GVTextField}
    label={label}
    InputComponent={Select}
    onChange={onChange}
  >
    {items.map(({ id, logo, currency, title }) => (
      <option value={id} key={id}>
        <CurrencyItem logo={logo} name={`${title} | ${currency}`} small />
      </option>
    ))}
  </GVFormikField>
);

export type ItemsType = Array<ItemType>;
export type ItemType = CopyTradingAccountInfo | WalletData | WalletBaseData;

interface OwnProps {
  items: ItemsType;
  label: string;
  name: string;
  onChange?: (event: ISelectChangeEvent, child: JSX.Element) => void;
}

interface Props extends OwnProps {}

const WalletSelect = React.memo(_WalletSelect);
export default WalletSelect;
