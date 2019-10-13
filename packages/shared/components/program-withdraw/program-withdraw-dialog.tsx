import { CancelablePromise, ProgramWithdrawInfo } from "gv-api-web";
import dynamic from "next/dynamic";
import * as React from "react";
import { useEffect } from "react";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import FormError from "shared/components/form/form-error/form-error";
import useApiRequest from "shared/hooks/api-request.hook";

import { ProgramWithdrawInfoLoaderData } from "./program-withdraw-dialog.loader";
import { IProgramWithdrawPopupProps } from "./program-withdraw-popup";

const ProgramWithdrawPopup = dynamic(() => import("./program-withdraw-popup"));

const _ProgramWithdrawDialog: React.FC<Props> = ({
  open,
  onClose,
  accountCurrency,
  assetCurrency,
  fetchInfo,
  withdraw
}) => {
  const { errorMessage, data, sendRequest } = useApiRequest<
    ProgramWithdrawInfo
  >({ request: fetchInfo });
  useEffect(() => {
    open && sendRequest();
  }, [open]);
  return (
    <Dialog open={open} onClose={onClose}>
      <ProgramWithdrawPopup
        data={data!}
        loaderData={ProgramWithdrawInfoLoaderData}
        withdraw={withdraw}
        accountCurrency={accountCurrency}
        assetCurrency={assetCurrency}
      />
      <FormError error={errorMessage} />
    </Dialog>
  );
};

interface Props extends IDialogProps, IProgramWithdrawPopupProps {
  fetchInfo: () => CancelablePromise<ProgramWithdrawInfo>;
}

const ProgramWithdrawDialog = React.memo(_ProgramWithdrawDialog);
export default ProgramWithdrawDialog;
