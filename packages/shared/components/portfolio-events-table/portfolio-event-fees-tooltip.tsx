import { FeeDetails } from "gv-api-web";
import React from "react";
import FeeCommission from "shared/components/fee-commission/fee-commission";
import { HORIZONTAL_POPOVER_POS } from "shared/components/popover/popover";
import Tooltip from "shared/components/tooltip/tooltip";
import withLoader from "shared/decorators/with-loader";

const _PortfolioEventFeesTooltip: React.FC<Props> = ({ fees, children }) => {
  const notNullFees = fees.filter(({ amount }) => amount > 0);
  return notNullFees.length > 0 ? (
    <Tooltip
      horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
      className="portfolio-event-details__popover"
      render={() =>
        notNullFees.map((fee, idx) => (
          <FeeCommission
            key={idx}
            title={fee.title}
            value={fee.amount}
            currency={fee.currency}
          />
        ))
      }
    >
      {children}
    </Tooltip>
  ) : (
    <>{children}</>
  );
};

const PortfolioEventFeesTooltip = withLoader(
  React.memo(_PortfolioEventFeesTooltip)
);
export default PortfolioEventFeesTooltip;

interface Props {
  fees: FeeDetails[];
}
