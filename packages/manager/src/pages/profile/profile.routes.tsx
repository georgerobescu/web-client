import * as React from "react";
import { Route, Switch } from "react-router-dom";
import KYCPage from "shared/components/profile/kyc/kyc.page";
import PasswordPage from "shared/components/profile/password/password.page";
import {
  KYC_ROUTE,
  PASSWORD_ROUTE,
  PROFILE_EDIT_ROUTE,
  PROFILE_ROUTE,
  REFERRAL_PROGRAM_ROUTE,
  SECURITY_ROUTE,
  SETTINGS_ROUTE,
  SOCIAL_LINKS_ROUTE
} from "shared/components/profile/profile.constants";
import ProfilePage from "shared/components/profile/profile/profile.page";
import SecurityPage from "shared/components/profile/security/security.page";
import SettingsPage from "shared/components/profile/settings/settings.page";

import ProfileEditPage from "./edit/edit.page";
import SocialLinksPage from "./social-links/social-links.page";
import ReferralProgramPage from "shared/components/profile/referral-program/referral-program.page";

const ProfilePageContainer = () => <ProfilePage />;

const ProfileRoutes: React.FC = () => (
  <Switch>
    <Route path={KYC_ROUTE} component={KYCPage} />
    <Route path={PASSWORD_ROUTE} component={PasswordPage} />
    <Route path={SETTINGS_ROUTE} component={SettingsPage} />
    <Route path={SOCIAL_LINKS_ROUTE} component={SocialLinksPage} />
    <Route path={PROFILE_EDIT_ROUTE} component={ProfileEditPage} />
    <Route path={SECURITY_ROUTE} component={SecurityPage} />
    <Route path={REFERRAL_PROGRAM_ROUTE} component={ReferralProgramPage} />
    <Route path={PROFILE_ROUTE} component={ProfilePageContainer} />
  </Switch>
);

export default ProfileRoutes;
