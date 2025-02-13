import "./security.scss";

import * as React from "react";
import { useTranslation } from "react-i18next";
import ProfileLayout from "shared/components/profile/profile-layout";
import LogoutButtonContainer from "shared/components/profile/settings/logout-button/logout-button-container";
import SettingsBlock from "shared/components/settings-block/settings-block";
import TwoFactorAuthContainer from "shared/modules/2fa/2fa-container";
import PasswordChange from "shared/modules/password-change/password-change";

import { SECURITY } from "../profile.constants";

const _SecurityPage: React.FC = () => {
  const [t] = useTranslation();
  return (
    <ProfileLayout route={SECURITY}>
      <SettingsBlock label={t("2fa-page.title")}>
        <TwoFactorAuthContainer />
      </SettingsBlock>
      <SettingsBlock>
        <div>
          <PasswordChange />
          <LogoutButtonContainer />
        </div>
      </SettingsBlock>
    </ProfileLayout>
  );
};

const SecurityPage = React.memo(_SecurityPage);
export default SecurityPage;
