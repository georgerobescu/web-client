import "shared/components/details/details-description-section/details-statistic-section/details-history/trades.scss";

import moment from "moment";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import BaseProfitability from "shared/components/profitability/base-profitability";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import {
  PROGRAM_TRADES_COLUMNS,
  PROGRAM_TRADES_DEFAULT_FILTERS,
  PROGRAM_TRADES_FILTERS,
  PROGRAM_TRADES_FILTERS_TYPE
} from "shared/components/programs/program-details/program-details.constants";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableCell from "shared/components/table/components/table-cell";
import TableModule from "shared/components/table/components/table-module";
import TableRow from "shared/components/table/components/table-row";
import {
  GetItemsFuncType,
  GetItemsFuncType2
} from "shared/components/table/components/table.types";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { IDataModel } from "shared/constants/constants";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";
import { formatValue } from "shared/utils/formatter";

const DECIMAL_SCALE = 8;

const _ProgramTrades: React.FC<Props & InjectedTranslateProps> = ({
  programId,
  fetchTrades,
  t
}) => {
  const fetchProgramTrades: GetItemsFuncType2<
    PROGRAM_TRADES_FILTERS_TYPE
  > = filters => fetchTrades(programId, filters);
  return (
    <TableModule
      getItems={fetchProgramTrades}
      defaultFilters={PROGRAM_TRADES_DEFAULT_FILTERS}
      filtering={PROGRAM_TRADES_FILTERS}
      renderFilters={(updateFilter, filtering) => (
        <>
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering["dateRange"]}
            onChange={updateFilter}
            startLabel={t("filters.date-range.program-start")}
          />
        </>
      )}
      paging={DEFAULT_PAGING}
      columns={PROGRAM_TRADES_COLUMNS}
      renderHeader={column => (
        <span
          className={`details-trades__head-cell program-details-trades__cell--${
            column.name
          }`}
        >
          {t(`program-details-page.history.trades.${column.name}`)}
        </span>
      )}
      renderBodyRow={trade => (
        <TableRow className="details-trades__row">
          <TableCell className="details-trades__cell program-details-trades__cell--direction">
            <BaseProfitability
              isPositive={trade.direction === "Buy"}
              isNegative={trade.direction === "Sell"}
            >
              {trade.direction}
            </BaseProfitability>
          </TableCell>
          <TableCell className="details-trades__cell program-details-trades__cell--symbol">
            {trade.symbol}
          </TableCell>
          <TableCell className="details-trades__cell program-details-trades__cell--volume">
            <NumberFormat
              value={formatValue(trade.volume, DECIMAL_SCALE / 2)}
              displayType="text"
              thousandSeparator=" "
            />
          </TableCell>
          <TableCell className="details-trades__cell program-details-trades__cell--price">
            <NumberFormat
              value={formatValue(trade.price, DECIMAL_SCALE)}
              displayType="text"
              thousandSeparator=" "
            />
          </TableCell>
          <TableCell className="details-trades__cell program-details-trades__cell--profit">
            <Profitability
              value={+formatValue(trade.profit, DECIMAL_SCALE)}
              prefix={PROFITABILITY_PREFIX.SIGN}
            >
              <NumberFormat
                value={formatValue(trade.profit, DECIMAL_SCALE)}
                thousandSeparator=" "
                allowNegative={false}
                displayType="text"
              />
            </Profitability>
          </TableCell>
          <TableCell className="details-trades__cell program-details-trades__cell--date">
            {moment(trade.date).format("lll")}
          </TableCell>
          <TableCell className="details-trades__cell program-details-trades__cell--ticket">
            {trade.ticket}
          </TableCell>

          <TableCell className="details-trades__cell program-details-trades__cell--entry">
            {trade.entry}
          </TableCell>
        </TableRow>
      )}
    />
  );
};

interface Props {
  currency: CURRENCIES;
  programId: string;
  fetchTrades: (programId: string, filters?: any) => Promise<IDataModel>;
}

const ProgramTrades = React.memo(translate()(_ProgramTrades));
export default ProgramTrades;
