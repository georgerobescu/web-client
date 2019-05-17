import "./profile.scss";

import { ProfileFullViewModel } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import GVScroll from "shared/components/scroll/gvscroll";
import VerificationStatus from "shared/components/verification-status/verification-status";

import ProfilePersonal, { ProfileField } from "./profile-personal";

const _Profile: React.FC<Props> = ({ t, info, personal }) => (
  <div className="profile__container profile__container--padding-top">
    <GVScroll autoHeight autoHeightMax={14000}>
      <table className="profile profile--is-disabled">
        <tbody>
          {personal && <ProfilePersonal info={info} />}
          <tr className="profile__title">
            <td className="profile__left">
              <h4 className="profile__subtitle">01</h4>
            </td>
            <td className="profile__center" />
            <td className="profile__right">
              <h4 className="profile__subtitle">
                {t("profile-page.contacts")}
              </h4>
              <VerificationStatus checked={true} />
            </td>
          </tr>
          <tr className="profile__content">
            <td className="profile__left">
              <span className="profile__stick" />
            </td>
            <td className="profile__center" />
            <td className="profile__right">
              <ProfileField
                label={t("profile-page.email")}
                value={info.email}
                name="phone"
              />
            </td>
          </tr>
          <tr className="profile__title">
            <td className="profile__left">
              <h4 className="profile__subtitle">02</h4>
            </td>
            <td className="profile__center" />
            <td className="profile__right">
              <h4 className="profile__subtitle">
                {t("profile-page.personal-info")}
              </h4>
              <VerificationStatus
                verificationStatus={info.verificationStatus}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </GVScroll>
  </div>
);

interface Props extends InjectedTranslateProps, IProfileOwnProps {}

export interface IProfileOwnProps {
  info: ProfileFullViewModel;
  personal?: boolean;
}

const Profile = compose<React.ComponentType<IProfileOwnProps>>(
  React.memo,
  translate()
)(_Profile);
export default Profile;