import NavigationBackButton from "modules/navigation-back-button/navigation-back-button";
import * as React from "react";
import ProfileLayout from "shared/components/profile/profile-layout";
import ProfileContainer from "shared/modules/profile/profile-container";

const _ProfileEditPage: React.FC = () => (
  <ProfileLayout route="details">
    <NavigationBackButton />
    <ProfileContainer editable />
  </ProfileLayout>
);

const ProfileEditPage = React.memo(_ProfileEditPage);
export default ProfileEditPage;
