import { TranslationFunction } from "react-i18next";
import inputImageShape from "shared/components/form/input-image/input-image.validation";
import { convertToCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";
import { boolean, mixed, number, object, string } from "yup";

import { ICreateProgramSettingsProps } from "./create-program-settings";

const createProgramSettingsValidationSchema = (
  props: ICreateProgramSettingsProps
) => {
  const { t } = props;
  return object().shape({
    stopOutLevel: number()
      .required(
        t("manager.create-program-page.settings.validation.stop-out-required")
      )
      .moreThan(
        0,
        t("manager.create-program-page.settings.validation.stop-out-is-zero")
      )
      .max(
        100,
        t("manager.create-program-page.settings.validation.stop-out-is-large")
      ),

    logo: inputImageShape(t),
    title: assetTitleShape(t),
    description: assetDescriptionShape(t),
    currency: string().required(
      t("manager.create-program-page.settings.validation.currency-required")
    ),
    periodLength: string().required(
      t("manager.create-program-page.settings.validation.period-required")
    ),
    leverage: string().required(
      t("manager.create-program-page.settings.validation.leverage-required")
    ),
    entryFee: number()
      .required(
        t("manager.create-program-page.settings.validation.entry-fee-required")
      )
      .moreThan(
        0.01,
        t("manager.create-program-page.settings.validation.entry-fee-min")
      )
      .lessThan(
        props.programsInfo.managerMaxEntryFee,
        t("manager.create-program-page.settings.validation.entry-fee-max", {
          max: props.programsInfo.managerMaxEntryFee
        })
      ),
    successFee: number()
      .moreThan(
        0.01,
        t("manager.create-program-page.settings.validation.success-fee-min")
      )
      .required(
        t(
          "manager.create-program-page.settings.validation.success-fee-required"
        )
      )
      .lessThan(
        props.programsInfo.managerMaxSuccessFee,
        t("manager.create-program-page.settings.validation.success-fee-max", {
          max: props.programsInfo.managerMaxSuccessFee
        })
      ),
    isSignalProgram: boolean(),
    signalSubscriptionFee: mixed().when("isSignalProgram", {
      is: true,
      then: signalEntryFeeShape(t, 100)
    }),
    signalSuccessFee: mixed().when("isSignalProgram", {
      is: true,
      then: signalSuccessFeeShape(t, props.programsInfo.managerMaxSuccessFee)
    }),
    brokerAccountTypeId: string().required(
      t("manager.create-program-page.settings.validation.account-type-required")
    ),
    depositAmount:
      props.rate && props.programCurrency && props.rate
        ? number()
            .required(
              t(
                "manager.create-program-page.settings.validation.amount-required"
              )
            )
            .min(
              parseFloat(
                formatCurrencyValue(
                  convertToCurrency(
                    props.minimumDepositsAmount[props.programCurrency],
                    props.rate
                  ),
                  props.programCurrency
                )
              ),
              t(
                "manager.create-program-page.settings.validation.amount-is-zero",
                {
                  min: formatCurrencyValue(
                    convertToCurrency(
                      props.minimumDepositsAmount[props.programCurrency],
                      props.rate
                    ),
                    props.programCurrency
                  )
                }
              )
            )
            .max(
              props.wallet.available,
              t(
                "manager.create-program-page.settings.validation.amount-is-large"
              )
            )
        : number().required(
            t("manager.create-program-page.settings.validation.amount-required")
          )
  });
};

export const assetTitleShape = (t: TranslationFunction) => {
  return string()
    .trim()
    .required(
      t("manager.create-program-page.settings.validation.title-required")
    )
    .min(4, t("manager.create-program-page.settings.validation.title-is-short"))
    .max(20, t("manager.create-program-page.settings.validation.title-is-long"))
    .matches(
      /^[-a-zA-Z0-9\s]{4,20}$/,
      t(
        "manager.create-program-page.settings.validation.title-is-latin-and-numbers"
      )
    );
};

export const assetDescriptionShape = (t: TranslationFunction) => {
  return string()
    .trim()
    .required(
      t("manager.create-program-page.settings.validation.description-required")
    )
    .min(
      20,
      t("manager.create-program-page.settings.validation.description-is-short")
    )
    .max(
      500,
      t("manager.create-program-page.settings.validation.description-is-long")
    );
};

export const signalSuccessFeeShape = (
  t: TranslationFunction,
  managerMaxSuccessFee: number
) => {
  return number()
    .min(
      0.01,
      t("manager.create-program-page.settings.validation.success-fee-min")
    )
    .required(
      t("manager.create-program-page.settings.validation.success-fee-required")
    )
    .max(
      managerMaxSuccessFee,
      t("manager.create-program-page.settings.validation.success-fee-max", {
        max: managerMaxSuccessFee
      })
    );
};

export const signalEntryFeeShape = (
  t: TranslationFunction,
  managerMaxEntryFee: number
) => {
  return number()
    .required(
      t(
        "manager.create-program-page.settings.validation.signal-subscription-fee-required"
      )
    )
    .min(
      0.01,
      t(
        "manager.create-program-page.settings.validation.signal-subscription-fee-min"
      )
    )
    .max(
      managerMaxEntryFee,
      t(
        "manager.create-program-page.settings.validation.signal-subscription-fee-max",
        { max: managerMaxEntryFee }
      )
    );
};

export default createProgramSettingsValidationSchema;