import "./fee-commission.scss";

import classNames from "classnames";
import * as React from "react";

export const FeeCommission: React.FC<Props> = ({
  title,
  value,
  currency,
  className
}) => (
  <div className={classNames("fee-commission", className)}>
    <span className={"fee-commission__title"}>{title}</span>
    <span className={"fee-commission__value"}>
      {value} <span className={"fee-commission__currency"}>{currency}</span>
    </span>
  </div>
);

export default FeeCommission;

interface Props {
  className?: string;
  title: string;
  value: number | string;
  currency: string;
}