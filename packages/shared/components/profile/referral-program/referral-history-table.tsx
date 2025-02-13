import dayjs from "dayjs";
import { saveAs } from "file-saver";
import { RewardDetails } from "gv-api-web";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import DownloadButton from "shared/components/download-button/download-button";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import {
  DATE_RANGE_FILTER_NAME,
  DateRangeFilterType
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableCell from "shared/components/table/components/table-cell";
import TableContainer from "shared/components/table/components/table-container";
import TableRow from "shared/components/table/components/table-row";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { referralHistoryTableSelector } from "shared/reducers/profile-reducer";
import filesService from "shared/services/file-service";
import { formatDate } from "shared/utils/dates";
import { getRandomInteger, tableLoaderCreator } from "shared/utils/helpers";

import { getHistoryTable } from "./services/referral-program-services";

const _ReferralHistoryTable: React.FC = () => {
  const [t] = useTranslation();
  return (
    <TableContainer
      loaderData={ReferralFriendsLoaderData}
      exportButtonToolbarRender={(filtering: any) => (
        <DownloadReferralHistoryButton dateRange={filtering!.dateRange} />
      )}
      title={t("profile-page.referral-program.referral-history.title")}
      getItems={getHistoryTable}
      dataSelector={referralHistoryTableSelector}
      isFetchOnMount={true}
      columns={COLUMNS}
      renderFilters={(updateFilter, filtering) => (
        <DateRangeFilter
          name={DATE_RANGE_FILTER_NAME}
          value={filtering[DATE_RANGE_FILTER_NAME]}
          onChange={updateFilter}
          startLabel={t("filters.date-range.program-start")}
        />
      )}
      paging={DEFAULT_PAGING}
      renderHeader={column =>
        t(
          `profile-page.referral-program.referral-history.header.${column.name}`
        )
      }
      renderBodyRow={(reward: RewardDetails) => (
        <TableRow stripy>
          <TableCell>
            {reward.amount} {reward.currency}
          </TableCell>
          <TableCell>{formatDate(reward.date)}</TableCell>
        </TableRow>
      )}
    />
  );
};

const _DownloadReferralHistoryButton: React.FC<{
  dateRange: DateRangeFilterType;
}> = ({ dateRange }) => {
  const loadFile = useCallback(() => {
    const dateNow = dayjs(new Date()).format("YYYY-MM-DD_HH-mm-ss");
    filesService
      .getReferralHistoryFile(dateRange)
      .then((blob: Blob) =>
        saveAs(blob, `referral_history_statistic_${dateNow}.xlsx`)
      );
  }, [dateRange]);
  return <DownloadButton authHandle={loadFile} />;
};
const DownloadReferralHistoryButton = React.memo(
  _DownloadReferralHistoryButton
);

const COLUMNS = [
  {
    name: "value"
  },
  {
    name: "date"
  }
];

const getReferralFriendLoaderData = (): RewardDetails => ({
  date: (new Date().toString() as unknown) as Date,
  currency: "GVT",
  amount: getRandomInteger(1, 100)
});

export const ReferralFriendsLoaderData = tableLoaderCreator(
  getReferralFriendLoaderData
);

export const ReferralHistoryTable = React.memo(_ReferralHistoryTable);
