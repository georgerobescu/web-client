import { FormikProps, withFormik } from "formik";
import { IProgramSignalFormValues } from "modules/program-signal/program-signal-popup/components/program-signal-form";
import { SignalValidationSchema } from "modules/program-signal/program-signal-popup/components/program-signal.validators";
import SignalsFeeFormPartial from "pages/create-program/components/create-program-settings/signals-fee-form.partial";
import React, { useCallback, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import GVSwitch from "shared/components/gv-selection/gv-switch";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import { SetSubmittingType } from "shared/utils/types";

import SettingsBlock from "./settings-block";

const _SignalingEdit: React.FC<Props> = ({
  isValid,
  handleSubmit,
  dirty,
  isSubmitting,
  t,
  isSignalAsset
}) => {
  const [isSignal, setIsSignal] = useState<boolean>(isSignalAsset);
  const changeIsSignal = useCallback(() => setIsSignal(!isSignal), [isSignal]);
  return (
    <SettingsBlock
      label={t("manager.asset-settings.signaling-asset.title")}
      content={
        <form id="signaling-edit-form" onSubmit={handleSubmit}>
          <div className="asset-settings__signaling-edit-form-title-block">
            {!isSignalAsset && (
              <GVSwitch
                touched={false}
                className="notification-setting__switch"
                name={name}
                value={isSignal}
                color="primary"
                onChange={changeIsSignal}
              />
            )}
          </div>
          <SignalsFeeFormPartial
            volumeFeeFieldName={FORM_FIELDS.volumeFee}
            successFeeFieldName={FORM_FIELDS.successFee}
          />
          <GVButton
            type="submit"
            id="assetMakeSignalSubmit"
            disabled={!dirty || isSubmitting || !isSignal || !isValid}
          >
            {"Save"}
          </GVButton>
        </form>
      }
    />
  );
};

interface Props
  extends OwnProps,
    WithTranslation,
    FormikProps<IProgramSignalFormValues> {}

enum FORM_FIELDS {
  successFee = "successFee",
  volumeFee = "volumeFee"
}

export interface IAssetSignalFormValues {
  [FORM_FIELDS.successFee]?: number;
  [FORM_FIELDS.volumeFee]?: number;
}

interface OwnProps {
  isSignalAsset: boolean;
  signalSuccessFee?: number;
  signalVolumeFee?: number;
  onSubmit(
    values: IProgramSignalFormValues,
    setSubmitting: SetSubmittingType
  ): void;
}

const SignalingEdit = compose<React.ComponentType<OwnProps & WithLoaderProps>>(
  withLoader,
  translate(),
  withFormik<OwnProps, IProgramSignalFormValues>({
    enableReinitialize: true,
    displayName: "make-signal-form",
    mapPropsToValues: props => ({
      [FORM_FIELDS.successFee]: props.signalSuccessFee,
      [FORM_FIELDS.volumeFee]: props.signalVolumeFee
    }),
    validationSchema: SignalValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_SignalingEdit);
export default SignalingEdit;
