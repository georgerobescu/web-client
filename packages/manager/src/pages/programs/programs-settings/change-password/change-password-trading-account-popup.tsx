import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import useApiRequest from "shared/hooks/api-request.hook";
import { twoFactorEnabledSelector } from "shared/reducers/2fa-reducer";
import { SetSubmittingType } from "shared/utils/types";

import ChangePasswordTradingAccountForm, {
  IChangePasswordTradingAccountFormValues
} from "./components/change-password-trading-account-form";
import { changePasswordTradingAccount } from "./services/change-password-trading-account.service";

const _ChangePasswordTradingAccountPopup: React.FC<Props> = ({
  open,
  programName,
  id,
  onClose
}) => {
  const twoFactorEnabled = useSelector(twoFactorEnabledSelector);
  const dispatch = useDispatch();
  const { errorMessage, cleanErrorMessage, sendRequest } = useApiRequest({
    request: args => dispatch(changePasswordTradingAccount(args))
  });
  const handleApply = useCallback(
    (
      values: IChangePasswordTradingAccountFormValues,
      setSubmitting: SetSubmittingType
    ) => {
      const model = {
        password: values.password,
        twoFactorCode: values.twoFactorCode
      };
      sendRequest({ id, model }, setSubmitting).then(handleClose);
    },
    [id]
  );
  const handleClose = useCallback(() => {
    cleanErrorMessage();
    onClose();
  }, []);
  return (
    <Dialog open={open} onClose={handleClose}>
      <ChangePasswordTradingAccountForm
        programName={programName}
        twoFactorEnabled={twoFactorEnabled}
        errorMessage={errorMessage}
        onSubmit={handleApply}
      />
    </Dialog>
  );
};

interface Props extends IDialogProps {
  id: string;
  programName: string;
}

const ChangePasswordTradingAccountPopup = React.memo(
  _ChangePasswordTradingAccountPopup
);
export default ChangePasswordTradingAccountPopup;
