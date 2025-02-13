import * as React from "react";
import DepositContainer from "shared/components/deposit/components/deposit-container";
import {
  getProgramInfoCreator,
  programInvestCreator
} from "shared/components/deposit/services/program-deposit.service";
import { IDialogProps } from "shared/components/dialog/dialog";
import { ASSET } from "shared/constants/constants";
import withLoader from "shared/decorators/with-loader";
import investorApi from "shared/services/api-client/investor-api";
import { CurrencyEnum } from "shared/utils/types";

const _ProgramDeposit: React.FC<OwnProps & IDialogProps> = ({
  id,
  currency,
  onApply,
  open,
  onClose
}) => (
  <DepositContainer
    asset={ASSET.PROGRAM}
    assetInvest={programInvestCreator(investorApi.investIntoProgram)}
    fetchInfo={getProgramInfoCreator(investorApi.getProgramInvestInfo)}
    id={id}
    hasEntryFee
    currency={currency}
    onApply={onApply}
    open={open}
    onClose={onClose}
  />
);

const ProgramDeposit = withLoader(React.memo(_ProgramDeposit));
export default ProgramDeposit;

interface OwnProps {
  id: string;
  currency: CurrencyEnum;
  onApply(): void;
}
