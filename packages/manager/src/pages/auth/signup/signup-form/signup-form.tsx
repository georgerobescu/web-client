import { InjectedFormikProps, withFormik } from "formik";
import { RegisterManagerViewModel } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import GVButton from "shared/components/gv-button";
import GVCheckbox from "shared/components/gv-checkbox/gv-checkbox";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import { SetSubmittingType } from "shared/utils/types";

import validationSchema from "./signup-form.validators";

const _SignUpForm: React.FC<
  InjectedFormikProps<Props, ISignUpFormFormValues>
> = ({ isSubmitting, handleSubmit, error, t, isValid, dirty }) => (
  <form
    id="signUpForm"
    className="signup-form"
    onSubmit={handleSubmit}
    noValidate
  >
    <GVFormikField
      type="text"
      name="userName"
      label={t("auth.signup.username-field-text")}
      autoComplete="off"
      className="signup-form__username"
      autoFocus
      component={GVTextField}
    />
    <GVFormikField
      type="email"
      name="email"
      label={t("auth.signup.email-field-text")}
      autoComplete="email"
      component={GVTextField}
    />
    <GVFormikField
      type="password"
      name="password"
      label={t("auth.signup.password-field-text")}
      component={GVTextField}
      autoComplete="new-password"
    />
    <GVFormikField
      type="password"
      name="confirmPassword"
      label={t("auth.signup.password-confirm-field-text")}
      component={GVTextField}
      autoComplete="new-password"
    />
    <GVFormikField
      type="checkbox"
      color="primary"
      name="privacyPolicy"
      label={
        <span>
          {t("auth.signup.i-accept-text")}{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://genesis.vision/privacy-policy.html"
            onClick={e => e.stopPropagation()}
          >
            {t("auth.signup.privacy-policy-text")}
          </a>
        </span>
      }
      component={GVCheckbox}
    />
    <GVFormikField
      type="checkbox"
      color="primary"
      name="acceptTerms"
      label={
        <span>
          {t("auth.signup.i-accept-text")}{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://genesis.vision/terms.html"
            onClick={e => e.stopPropagation()}
          >
            {t("auth.signup.accept-terms-text")}
          </a>
        </span>
      }
      component={GVCheckbox}
    />
    <FormError error={error} />
    <GVButton
      type="submit"
      id="signUpFormSubmit"
      className="signup-form__submit-button"
      disabled={!isValid || !dirty || isSubmitting}
    >
      {t("auth.signup.title")}
    </GVButton>
  </form>
);

interface Props extends InjectedTranslateProps, OwnProps {}

interface OwnProps {
  onSubmit(data: ISignUpFormFormValues, setSubmitting: SetSubmittingType): void;
  error: string;
  refCode?: string;
}

interface ISignUpFormFormValues extends RegisterManagerViewModel {
  privacyPolicy: boolean;
  acceptTerms: boolean;
}

const SignUpForm = compose<React.FC<OwnProps>>(
  React.memo,
  translate(),
  withFormik<Props, ISignUpFormFormValues>({
    displayName: "signup-form",
    mapPropsToValues: props => ({
      refCode: props.refCode || "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      privacyPolicy: false,
      acceptTerms: false,
      isAuto: false //TODO remove when upgrade api
    }),
    validationSchema: validationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(_SignUpForm);
export default SignUpForm;
