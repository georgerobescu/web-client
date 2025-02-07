import { InjectedFormikProps, withFormik } from "formik";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import { LOGIN_ROUTE } from "shared/routes/app.routes";
import { SetSubmittingType } from "shared/utils/types";
import { object, string } from "yup";

const _ForgotPasswordForm: React.FC<
  InjectedFormikProps<Props, IForgotPasswordFormValues>
> = ({ t, values, isSubmitting, handleSubmit, error }) => (
  <form id="forgotPasswordForm" onSubmit={handleSubmit} noValidate>
    <GVFormikField
      type="email"
      name={FORGOT_PASSWORD_FORM_FIELDS.email}
      label={t("auth.password-restore.forgot-password.email-field-text")}
      addon="fas fa-envelope"
      autoComplete="email"
      autoFocus
      component={GVTextField}
    />
    <FormError error={error} />
    <div className="forgot-password__navigation">
      <Link to={LOGIN_ROUTE} className="forgot-password__btn-back">
        <GVButton variant="text" color="secondary">
          <>
            {" "}
            &larr; {t("auth.password-restore.forgot-password.back-button-text")}
          </>
        </GVButton>
      </Link>
      <GVButton
        id="forgotPassword"
        color="primary"
        variant="contained"
        disabled={isSubmitting}
        type="submit"
      >
        {t("auth.password-restore.forgot-password.confirm-button-text")}
      </GVButton>
    </div>
  </form>
);

interface Props extends OwnProps, WithTranslation {}

interface OwnProps {
  onSubmit(
    data: IForgotPasswordFormValues,
    setSubmitting: SetSubmittingType
  ): void;
  errorMessage: string;
}

export enum FORGOT_PASSWORD_FORM_FIELDS {
  captchaCheckResult = "captchaCheckResult",
  email = "email"
}

export interface IForgotPasswordFormValues {
  [FORGOT_PASSWORD_FORM_FIELDS.email]: string;
}

const ForgotPasswordForm = compose<React.FC<OwnProps>>(
  translate(),
  withFormik<Props, IForgotPasswordFormValues>({
    displayName: "forgotPassword",
    mapPropsToValues: () => ({
      [FORGOT_PASSWORD_FORM_FIELDS.email]: ""
    }),
    validationSchema: ({ t }: Props) =>
      object().shape({
        [FORGOT_PASSWORD_FORM_FIELDS.email]: string()
          .email(t("auth.password-restore.validators.email-invalid"))
          .required(t("auth.password-restore.validators.email-required"))
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_ForgotPasswordForm);
export default ForgotPasswordForm;
