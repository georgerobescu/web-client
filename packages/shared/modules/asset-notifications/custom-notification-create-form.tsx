import { FormikProps, withFormik } from "formik";
import {
  NotificationSettingViewModelConditionTypeEnum,
  NotificationViewModelTypeEnum,
  ProgramInfo
} from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import Select from "shared/components/select/select";
import { number, object } from "yup";

const _CustomNotificationCreateForm: React.FC<Props> = ({
  errorMessage,
  t,
  asset,
  handleSubmit,
  values,
  isValid,
  dirty,
  isSubmitting
}) => {
  const { conditionType } = values;
  const isProfit = conditionType === CONDITION_TYPE_VALUES.Profit;
  const isLevel = conditionType === CONDITION_TYPE_VALUES.Level;
  return (
    <form id="create-notification" onSubmit={handleSubmit}>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{t("notifications-page.create.title")}</h2>
          <p>{asset.title}</p>
        </div>
        <GVFormikField
          name={FIELDS.conditionType}
          component={GVTextField}
          label={t("notifications-page.create.type-label")}
          InputComponent={Select}
        >
          <option value={CONDITION_TYPE_VALUES.Profit}>
            {t("notifications-page.create.Profit.title")}
          </option>
          <option value={CONDITION_TYPE_VALUES.Level}>
            {t("notifications-page.create.Level.title")}
          </option>
          <option value={CONDITION_TYPE_VALUES.AvailableToInvest}>
            {t("notifications-page.create.AvailableToInvest.title")}
          </option>
        </GVFormikField>
      </div>
      <div className="dialog__bottom">
        <GVFormikField
          name={FIELDS.conditionAmount}
          label={t("notifications-page.create.amount-label")}
          component={GVTextField}
          adornment={isProfit ? "%" : null}
          autoComplete="off"
          InputComponent={NumberFormat}
          isAllowed={(values: NumberFormatValues) => {
            const { floatValue, formattedValue } = values;
            if (isProfit) {
              return (
                formattedValue === "" || (floatValue > 0 && floatValue <= 1000)
              );
            }
            if (isLevel) {
              return (
                formattedValue === "" || (floatValue > 0 && floatValue <= 7)
              );
            }
            return true;
          }}
        />
        <div className="form-error">{errorMessage}</div>
        <div className="dialog__buttons">
          <GVButton
            color="primary"
            type="submit"
            disabled={isSubmitting || !isValid || !dirty}
          >
            {t("buttons.create")}
          </GVButton>
        </div>
      </div>
    </form>
  );
};

const CustomNotificationCreateForm = compose<React.FC<OwnProps>>(
  React.memo,
  translate(),
  withFormik<Props, ICustomNotificationCreateFormValues>({
    displayName: "create-notification",
    mapPropsToValues: () => ({
      [FIELDS.type]: "ProgramCondition",
      [FIELDS.conditionType]: CONDITION_TYPE_VALUES.Profit,
      [FIELDS.conditionAmount]: undefined
    }),
    validationSchema: ({ t }: Props) =>
      object().shape({
        [FIELDS.conditionAmount]: number().required(
          t("notifications-page.create.amount-required")
        )
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(_CustomNotificationCreateForm);
export default CustomNotificationCreateForm;

interface Props
  extends OwnProps,
    InjectedTranslateProps,
    FormikProps<ICustomNotificationCreateFormValues> {}

interface OwnProps {
  asset: ProgramInfo;
  onSubmit: (
    values: ICustomNotificationCreateFormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => void;
  errorMessage?: string;
}

enum FIELDS {
  type = "type",
  conditionType = "conditionType",
  conditionAmount = "conditionAmount"
}

enum CONDITION_TYPE_VALUES {
  Profit = "Profit",
  Level = "Level",
  AvailableToInvest = "AvailableToInvest"
}

export interface ICustomNotificationCreateFormValues {
  [FIELDS.type]: NotificationViewModelTypeEnum;
  [FIELDS.conditionType]: NotificationSettingViewModelConditionTypeEnum;
  [FIELDS.conditionAmount]?: number;
}