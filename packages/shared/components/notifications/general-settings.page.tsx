import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import Page from "shared/components/page/page";
import NotificationSettingsContainer from "shared/modules/notification-settings/notification-settings-container";

const _NotificationsPage: React.FC<InjectedTranslateProps> = ({ t }) => (
  <Page title={t("notifications-page.title")}>
    <div className="app__main-wrapper">
      <h1>{t("notifications-page.title")}</h1>
      <NotificationSettingsContainer />
    </div>
  </Page>
);

const NotificationsPage = React.memo(translate()(_NotificationsPage));
export default NotificationsPage;