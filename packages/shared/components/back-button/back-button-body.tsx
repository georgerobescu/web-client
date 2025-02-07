import "./back-button.scss";

import * as React from "react";
import { useTranslation } from "react-i18next";
import GVButton from "shared/components/gv-button";

export const _BackButtonBody: React.FC<Props> = ({ onClick, backPath }) => {
  const { t } = useTranslation();
  return (
    <div className="back-button">
      <GVButton
        variant="text"
        onClick={onClick}
        color="secondary"
        className="back-button__container"
      >
        <>
          <div className="back-button__back-arrow">&larr;</div>
          <div className="back-button__back">{t("buttons.back")}</div>
        </>
      </GVButton>
      <div className="back-button__path">{backPath}</div>
    </div>
  );
};

const BackButtonBody = React.memo(_BackButtonBody);
export default BackButtonBody;

interface Props {
  onClick: () => void;
  backPath?: string;
}
