import { InjectedFormikProps, withFormik } from "formik";
import i18next from "i18next";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import { SetSubmittingType } from "shared/utils/types";
import { object, string } from "yup";

const CloseProgramForm: React.FC<
  InjectedFormikProps<FormProps, ICloseProgramFormValues>
> = ({ t, onCancel, twoFactorEnabled, handleSubmit, isSubmitting }) => (
  <form id="closeProgramForm" onSubmit={handleSubmit} noValidate>
    <div className="dialog__top">
      <h2>{t("program-details-page.description.close-program")}</h2>
      <div className="dialog__text">
        <p>
          {t("program-details-page.description.close-program-notification")}
        </p>
      </div>
      {twoFactorEnabled && (
        <GVFormikField
          type="tel"
          name={FIELDS.twoFactorCode}
          label={t("wallet-withdraw.two-factor-code-label")}
          autoComplete="off"
          component={GVTextField}
        />
      )}
      <div className="dialog__buttons">
        <GVButton type="submit" disabled={isSubmitting}>
          {t("buttons.confirm")}
        </GVButton>
        <GVButton
          color="secondary"
          variant="outlined"
          disabled={isSubmitting}
          onClick={onCancel}
        >
          {t("buttons.cancel")}
        </GVButton>
      </div>
    </div>
  </form>
);

const twoFactorValidator = (
  t: i18next.TFunction,
  twoFactorEnabled: boolean
) => {
  return twoFactorEnabled
    ? string()
        .trim()
        .matches(/^\d{6}$/, t("wallet-withdraw.validation.two-factor-6digits"))
        .required(t("wallet-withdraw.validation.two-factor-required"))
    : string()
        .trim()
        .matches(/^\d{6}$/, t("wallet-withdraw.validation.two-factor-6digits"));
};

export default compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<OwnProps, ICloseProgramFormValues>({
    displayName: "close-program",
    mapPropsToValues: () => ({ [FIELDS.twoFactorCode]: "" }),
    validationSchema: ({ t, twoFactorEnabled }: FormProps) =>
      object().shape({
        [FIELDS.twoFactorCode]: twoFactorValidator(t, twoFactorEnabled)
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(CloseProgramForm);

enum FIELDS {
  twoFactorCode = "twoFactorCode"
}

interface OwnProps {
  onCancel(): void;
  twoFactorEnabled: boolean;
  onSubmit(
    values: ICloseProgramFormValues,
    setSubmitting: SetSubmittingType
  ): void;
}

export interface ICloseProgramFormValues {
  [FIELDS.twoFactorCode]: string;
}

type FormProps = WithTranslation & OwnProps;