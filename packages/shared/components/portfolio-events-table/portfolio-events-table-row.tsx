import "./portfolio-events-table.scss";
import "./portfolio-events.scss";

import { InvestmentEventViewModel } from "gv-api-web";
import React from "react";
import NumberFormat from "react-number-format";
import PortfolioEventLogo from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import { EVENT_LOCATION } from "shared/components/programs/program-details/services/program-details.service";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { formatDate } from "shared/utils/dates";
import { formatCurrencyValue } from "shared/utils/formatter";

import PortfolioEventsDetails from "./portfolio-event-details";
import PortfolioEventFeesTooltip from "./portfolio-event-fees-tooltip";
import { EVENT_PROFITABILITY_VALUES } from "./portfolio-events-table.constants";

const _PortfolioEventsTableRow: React.FC<Props> = ({
  event,
  eventLocation,
  hideFeeColumn
}) => (
  <TableRow stripy>
    <TableCell className="portfolio-events-all-table__cell portfolio-events-all-table__cell--date">
      {formatDate(event.date)}
    </TableCell>
    <TableCell className="portfolio-events-all-table__cell portfolio-events-all-table__cell--type">
      <div className="portfolio-events-all-table__description">
        {event.assetDetails && (
          <PortfolioEventLogo
            withAsset={eventLocation !== EVENT_LOCATION.Asset}
            assetDetails={event.assetDetails}
            icon={event.icon}
          />
        )}
        <div>{event.title}</div>
      </div>
    </TableCell>
    {!hideFeeColumn && (
      <TableCell className="portfolio-events-all-table__cell portfolio-events-all-table__cell--type">
        <PortfolioEventFeesTooltip
          fees={event.feesInfo}
          condition={event.totalFeesAmount !== null}
        >
          <NumberFormat
            value={formatCurrencyValue(
              event.totalFeesAmount,
              event.totalFeesCurrency
            )}
            thousandSeparator=" "
            displayType="text"
            suffix={" " + event.totalFeesCurrency}
          />
        </PortfolioEventFeesTooltip>
      </TableCell>
    )}
    <TableCell className="portfolio-events-all-table__cell portfolio-events-all-table__cell--details">
      <PortfolioEventsDetails extendedInfo={event.extendedInfo} />
    </TableCell>
    <TableCell className="portfolio-events-all-table__cell portfolio-events-all-table__cell--amount">
      <Profitability
        condition={!!event.amount}
        value={EVENT_PROFITABILITY_VALUES[event.changeState]}
        prefix={PROFITABILITY_PREFIX.SIGN}
      >
        <NumberFormat
          value={formatCurrencyValue(event.amount, event.currency)}
          allowNegative={false}
          thousandSeparator=" "
          displayType="text"
          suffix={` ${event.currency}`}
        />
      </Profitability>
    </TableCell>
  </TableRow>
);

const PortfolioEventsTableRow = React.memo(_PortfolioEventsTableRow);
export default PortfolioEventsTableRow;

interface Props {
  event: InvestmentEventViewModel;
  eventLocation: EVENT_LOCATION;
  hideFeeColumn: boolean;
}
