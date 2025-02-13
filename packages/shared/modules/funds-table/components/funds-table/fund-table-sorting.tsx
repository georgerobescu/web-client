import * as React from "react";
import { useTranslation } from "react-i18next";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";

interface Props {
  column: SortingColumn;
  isAuthenticated: boolean;
}

const FundTableSortingValue: React.FC<Props> = ({
  column,
  isAuthenticated
}) => {
  const { t } = useTranslation();
  if (!isAuthenticated && column.name === "favorite") return null;
  return t(`funds-page.funds-header.${column.name}`);
};

export default React.memo(FundTableSortingValue);
