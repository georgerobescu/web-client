import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import GooglePlay from "shared/media/badge-android.png";
import AppStore from "shared/media/badge-ios.png";

const AuthAndroidLink =
  "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2";
const AuthIosLink =
  "https://itunes.apple.com/app/google-authenticator/id388497605";

export const GoogleStep1: React.FC<WithTranslation> = ({ t }) => (
  <div className="google-auth__step">
    <div className="google-auth__count">01</div>
    <div className="google-auth__title">{t("2fa-page.download-app")}</div>
    <a href={AuthAndroidLink} className="google-auth__link">
      <img src={GooglePlay} alt={"link to android market"} />
    </a>
    <a href={AuthIosLink} className="google-auth__link">
      <img src={AppStore} alt={"link to app store"} />
    </a>
  </div>
);

const GoogleDownloadStep = translate()(React.memo(GoogleStep1));

export default GoogleDownloadStep;
