import "./verification-status.scss";

import { ProfileFullViewModelVerificationStatusEnum } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import Chip, { CHIP_TYPE } from "shared/components/chip/chip";

export enum VERIFICATION_STATUS {
  NOT_VERIFIED = "NotVerified",
  VERIFIED = "Verified",
  UNDER_REVIEW = "UnderReview",
  REJECTERD = "Rejected"
}

export interface IStatusProps {
  checked?: boolean;
  verificationStatus?: ProfileFullViewModelVerificationStatusEnum;
}

const _VerificationStatus: React.FC<IStatusProps & WithTranslation> = ({
  t,
  checked,
  verificationStatus = VERIFICATION_STATUS.NOT_VERIFIED
}) => {
  let type, value;
  if (checked) {
    type = CHIP_TYPE.POSITIVE;
    value = t("verification-status.verified");
  } else {
    switch (verificationStatus) {
      case VERIFICATION_STATUS.VERIFIED:
        value = t("verification-status.verified");
        type = CHIP_TYPE.POSITIVE;
        break;
      case VERIFICATION_STATUS.UNDER_REVIEW:
        value = t("verification-status.under-review");
        type = CHIP_TYPE.WARNING;
        break;
      case VERIFICATION_STATUS.REJECTERD:
        value = t("verification-status.rejected");
        type = CHIP_TYPE.NEGATIVE;
        break;
      default:
        value = t("verification-status.not-verified");
    }
  }

  return (
    <Chip type={type} className={`verification verification--${type}`}>
      {value}
    </Chip>
  );
};

const VerificationStatus = translate()(React.memo(_VerificationStatus));
export default VerificationStatus;
