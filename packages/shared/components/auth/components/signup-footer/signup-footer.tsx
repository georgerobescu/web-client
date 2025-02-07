import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { Link } from "react-router-dom";
import GVButton from "shared/components/gv-button";

const _SignUpFooter: React.FC<Props> = ({ t, ROUTE }) => (
  <>
    <span className="signup-footer__desc">{t("auth.signup.footer-text")}</span>
    <Link to={ROUTE}>
      <GVButton variant="outlined" color="secondary">
        {t("auth.login.title")}
      </GVButton>
    </Link>
  </>
);

interface Props extends WithTranslation {
  ROUTE: string;
}

const SignUpFooter = translate()(React.memo(_SignUpFooter));
export default SignUpFooter;
