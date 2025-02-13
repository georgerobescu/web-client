import "./currency-select.scss";

import classNames from "classnames";
import * as React from "react";
import Select, { ISelectChangeEvent } from "shared/components/select/select";
import withLoader from "shared/decorators/with-loader";
import { CurrencyEnum } from "shared/utils/types";

const _CurrencySelect: React.FC<Props> = ({
  value,
  onChange,
  className,
  currencyValues
}) => (
  <Select
    name="currency"
    className={classNames("currency-select", className)}
    value={value}
    onChange={onChange}
  >
    {currencyValues.map(currency => (
      <option value={currency} key={currency}>
        {currency}
      </option>
    ))}
  </Select>
);

interface Props {
  value: CurrencyEnum | string;
  onChange: (event: ISelectChangeEvent, child: JSX.Element) => void;
  currencyValues: CurrencyEnum[];
  className?: string;
}

const CurrencySelect = React.memo(withLoader(_CurrencySelect));
export default CurrencySelect;
