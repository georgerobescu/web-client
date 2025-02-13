import { ProfileHeaderViewModel } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import ProfileAvatar from "shared/components/avatar/profile-avatar/profile-avatar";
import { LogoutIcon } from "shared/components/icon/logout-icon";
import NavigationItem, {
  NavigationButton
} from "shared/components/navigation/navigation-item";
import Sidebar from "shared/components/sidebar/sidebar";
import { LOGIN_ROUTE } from "shared/routes/app.routes";
import { TMenuItem } from "shared/routes/menu";

import { MenuNavigationItem } from "../menu-navigation-item";

const _NavigationMobile: React.FC<Props> = ({
  mobileMenuItems,
  isAuthenticated,
  profileHeader,
  isOpenNavigation,
  onClose,
  logout,
  backPath
}) => {
  const [t] = useTranslation();
  return (
    <Sidebar open={isOpenNavigation} onClose={onClose}>
      <div className="navigation__mobile mobile">
        {isAuthenticated && profileHeader && (
          <div className="mobile__header">
            <ProfileAvatar
              url={profileHeader.avatar}
              alt={profileHeader.email}
              className="mobile__avatar"
            />
            <div className="mobile__email">{profileHeader.email}</div>
          </div>
        )}
        <div className="mobile__top" onClick={onClose}>
          {mobileMenuItems.map(item => (
            <MenuNavigationItem item={item} key={item.label} />
          ))}
          {isAuthenticated ? (
            <NavigationButton icon={<LogoutIcon primary />} onClick={logout}>
              {t("navigation.logout")}
            </NavigationButton>
          ) : (
            <NavigationItem
              icon={<LogoutIcon primary rotate />}
              href={{ pathname: LOGIN_ROUTE, state: backPath }}
            >
              {t("navigation.login")}
            </NavigationItem>
          )}
        </div>
      </div>
    </Sidebar>
  );
};

interface Props {
  mobileMenuItems: TMenuItem[];
  backPath: string;
  isAuthenticated: boolean;
  profileHeader?: ProfileHeaderViewModel;
  isOpenNavigation: boolean;
  onClose: () => void;
  logout: () => void;
}

const NavigationMobile = React.memo(_NavigationMobile);
export default NavigationMobile;
