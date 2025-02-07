import {
  NotificationSettingViewModel,
  NotificationSettingViewModelTypeEnum
} from "gv-api-web";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import GeneralNotification from "shared/components/general-notification/general-notification";
import {
  IAddNotificationSettingProps,
  IRemoveNotificationSettingProps
} from "shared/modules/notification-settings/actions/notification-settings.actions";

import {
  TAddNotification,
  TRemoveNotification
} from "./asset-notifications.types";

const _AssetNotificationsGeneral: React.FC<Props> = ({
  removeNotification,
  addNotification,
  assetId,
  notifications,
  settings
}) => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const getNotification = useCallback(
    (
      type: NotificationSettingViewModelTypeEnum
    ): NotificationSettingViewModel =>
      settings.find(setting => setting.type === type)!,
    [settings]
  );

  const handleAdd = useCallback(
    (options: IAddNotificationSettingProps) =>
      dispatch(
        addNotification(
          options,
          t(`notifications-page.general.${options.type}.enabled-alert`)
        )
      ),
    []
  );

  const handleRemove = useCallback(
    (options: IRemoveNotificationSettingProps) =>
      dispatch(
        removeNotification(
          options,
          t(`notifications-page.general.${options.type}.disabled-alert`)
        )
      ),
    []
  );

  return (
    <div className="notification-settings">
      <h3 className="notification-settings__subtitle">
        {t("notifications-page.general.title")}
      </h3>
      {notifications.map(notification => (
        <GeneralNotification
          key={notification.name}
          name={notification.name}
          label={notification.label}
          assetId={assetId}
          setting={getNotification(notification.name)}
          addNotification={handleAdd}
          removeNotification={handleRemove}
        />
      ))}
    </div>
  );
};

interface Props {
  settings: NotificationSettingViewModel[];
  notifications: INotification[];
  addNotification: TAddNotification;
  removeNotification: TRemoveNotification;
  assetId?: string;
}

export interface INotification {
  name: NotificationSettingViewModelTypeEnum;
  label: string;
}

const AssetNotificationsGeneral = React.memo(_AssetNotificationsGeneral);
export default AssetNotificationsGeneral;
