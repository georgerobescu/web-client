import { FormikProps, withFormik } from "formik";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { DialogBottom } from "shared/components/dialog/dialog-bottom";
import { DialogButtons } from "shared/components/dialog/dialog-buttons";
import { DialogTop } from "shared/components/dialog/dialog-top";
import FormError from "shared/components/form/form-error/form-error";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import { SetSubmittingType } from "shared/utils/types";

import { ChangePasswordTradingAccountValidationSchema } from "./change-password-trading-account.validators";

interface IChangePasswordTradingAccountFormOwnProps {
  twoFactorEnabled: boolean;
  errorMessage: string;
  programName: string;
  onSubmit(
    values: IChangePasswordTradingAccountFormValues,
    setSubmitting: SetSubmittingType
  ): void;
}

enum FORM_FIELDS {
  password = "password",
  confirmPassword = "confirmPassword",
  twoFactorCode = "twoFactorCode"
}

export interface IChangePasswordTradingAccountFormValues {
  [FORM_FIELDS.password]: string;
  [FORM_FIELDS.confirmPassword]: string;
  [FORM_FIELDS.twoFactorCode]: string;
}

type ChangePasswordTradingAccountFormProps = WithTranslation &
  IChangePasswordTradingAccountFormOwnProps &
  FormikProps<IChangePasswordTradingAccountFormValues>;

const _ChangePasswordTradingAccountForm: React.FC<
  ChangePasswordTradingAccountFormProps
> = ({
  t,
  dirty,
  isValid,
  programName,
  handleSubmit,
  errorMessage,
  twoFactorEnabled,
  isSubmitting
}) => {
  return (
    <form id="change-password-trading-account" onSubmit={handleSubmit}>
      <DialogTop
        title={t("password-change-trading-account.title")}
        subtitle={programName}
      />
      <DialogBottom>
        <GVFormikField
          component={GVTextField}
          label={t("password-change-trading-account.new-password")}
          type="password"
          name={FORM_FIELDS.password}
          autoComplete="off"
        />
        <GVFormikField
          component={GVTextField}
          label={t("password-change-trading-account.confirm-password")}
          type="password"
          name={FORM_FIELDS.confirmPassword}
          autoComplete="off"
        />
        {twoFactorEnabled && (
          <GVFormikField
            type="text"
            name={FORM_FIELDS.twoFactorCode}
            label={t("wallet-withdraw.two-factor-code-label")}
            autoComplete="off"
            component={GVTextField}
          />
        )}
        <FormError error={errorMessage} />
        <DialogButtons>
          <GVButton type="submit" disabled={!isValid || !dirty || isSubmitting}>
            {t("buttons.confirm")}
          </GVButton>
        </DialogButtons>
      </DialogBottom>
    </form>
  );
};

const ChangePasswordTradingAccountForm = compose<
  React.ComponentType<IChangePasswordTradingAccountFormOwnProps>
>(
  translate(),
  withFormik<
    IChangePasswordTradingAccountFormOwnProps,
    IChangePasswordTradingAccountFormValues
  >({
    displayName: "change-password",
    mapPropsToValues: () => ({
      [FORM_FIELDS.password]: "",
      [FORM_FIELDS.confirmPassword]: "",
      [FORM_FIELDS.twoFactorCode]: ""
    }),
    validationSchema: ChangePasswordTradingAccountValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_ChangePasswordTradingAccountForm);
export default ChangePasswordTradingAccountForm;
