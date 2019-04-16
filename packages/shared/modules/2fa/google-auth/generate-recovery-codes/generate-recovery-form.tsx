import { InjectedFormikProps, withFormik } from "formik";
import { PasswordModel } from "gv-api-web";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import { SetSubmittingType } from "shared/utils/types";
import { object, string } from "yup";

const GenerateRecoveryForm: React.FC<
  InjectedFormikProps<Props, IFormValues>
> = ({ t, handleSubmit, errorMessage, isSubmitting }) => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t("2fa-page.codes.generate-recovery-codes")}</h2>
      </div>
      <form
        id="generate-recovery-form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <GVFormikField
          name="password"
          type="password"
          label={t("2fa-page.password")}
          component={GVTextField}
          autoComplete="new-password"
        />
        <div className="form-error">{errorMessage}</div>
        <div className="dialog__buttons">
          <GVButton
            className="google-auth__button"
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {t("buttons.generate")}
          </GVButton>
        </div>
      </form>
    </div>
  );
};

interface Props extends InjectedTranslateProps, OwnProps {}
interface OwnProps {
  errorMessage?: string;
  onSubmit(twoFactorCode: IFormValues, setSubmitting: SetSubmittingType): void;
}
interface IFormValues extends PasswordModel {}

const GenerateRecoveryWithFormik = compose<React.FunctionComponent<OwnProps>>(
  React.memo,
  translate(),
  withFormik<Props, IFormValues>({
    displayName: "generate-recovery-form",
    mapPropsToValues: () => ({
      password: ""
    }),
    validationSchema: (props: Props) =>
      object().shape({
        password: string().required(props.t("2fa-page.password-required"))
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(GenerateRecoveryForm);

export default GenerateRecoveryWithFormik;