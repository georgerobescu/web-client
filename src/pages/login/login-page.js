import "./login.scss";

import LoginTabs from "components/login-tabs/login-tabs";
import { GVButton } from "gv-react-components";
import LoginContainer from "modules/login/components/login/login-container";
import { HOME_ROUTE } from "pages/root.routes";
import { REGISTER_ROUTE } from "pages/signup/signup.routes";
import React, { Fragment } from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

const LoginPage = ({ t, location }) => {
  const { from } = location.state || { from: { pathname: HOME_ROUTE } };
  return (
    <Fragment>
      <div className="login__header">
        <h1>{t("auth.login.title")}</h1>
        <LoginTabs />
      </div>

      <LoginContainer from={from} />

      <div className="auth-footer">
        <span className={"auth-footer__desc"}>
          {t("auth.login.footer-text")}
        </span>
        <Link to={REGISTER_ROUTE} className="auth-footer__desc">
          <GVButton color="secondary" variant="outlined">
            {t("auth.signup.title")}
          </GVButton>
        </Link>
      </div>
    </Fragment>
  );
};

export default translate()(LoginPage);
