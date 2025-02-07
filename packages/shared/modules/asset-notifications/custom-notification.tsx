import "./custom-notification.scss";

import { NotificationSettingViewModel } from "gv-api-web";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { connect, ResolveThunks } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import GVButton from "shared/components/gv-button";
import GVSwitch from "shared/components/gv-selection/gv-switch";
import GVTextField from "shared/components/gv-text-field";
import useIsOpen from "shared/hooks/is-open.hook";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

import {
  TRemoveNotification,
  TToggleNotification
} from "./asset-notifications.types";

const CustomNotification: React.FC<Props> = ({ service, settings, t }) => {
  const [isPending, setIsPending, setIsNotPending] = useIsOpen();
  const handleSwitch = useCallback(() => {
    setIsPending();
    const status = !Boolean(settings.isEnabled);
    service
      .toggleNotifications({
        id: settings.id,
        assetId: settings.assetId,
        enabled: status
      })
      .then(() =>
        service.success(
          t(
            `notifications-page.custom.${status ? "enabled" : "disabled"}-alert`
          )
        )
      )
      .finally(setIsNotPending);
  }, [settings]);
  const handleDelete = useCallback(() => {
    setIsPending();
    service
      .removeNotification(settings, t(`notifications-page.custom.delete-alert`))
      .finally(setIsNotPending);
  }, [settings]);
  return (
    <div className="custom-notification">
      <label className="notification-setting">
        <GVSwitch
          className="notification-setting__switch"
          name={settings.type}
          value={settings.isEnabled}
          disabled={isPending}
          color="primary"
          onChange={handleSwitch}
          touched={false}
        />
        <span className="notification-setting__label">
          {t(`notifications-page.create.${settings.conditionType}.title`)}
        </span>
      </label>
      <div className="custom-notification__offset">
        <GVTextField
          name="conditionAmount"
          value={settings.conditionAmount.toString()}
          disabled
          label={t(`notifications-page.create.${settings.conditionType}.label`)}
          adornment={settings.conditionType === "Profit" ? "%" : undefined}
          InputComponent={NumberFormat}
        />
        <GVButton
          variant="text"
          color="secondary"
          disabled={isPending}
          onClick={handleDelete}
        >
          {t("buttons.delete")}
        </GVButton>
      </div>
    </div>
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { removeNotification, toggleNotifications }: OwnProps
): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      success: alertMessageActions.success,
      removeNotification,
      toggleNotifications
    },
    dispatch
  )
});

interface Props extends DispatchProps, OwnProps, WithTranslation {}

interface ServiceThunks extends ActionCreatorsMapObject {
  success: typeof alertMessageActions.success;
  removeNotification: TRemoveNotification;
  toggleNotifications: TToggleNotification;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface OwnProps {
  settings: NotificationSettingViewModel;
  removeNotification: TRemoveNotification;
  toggleNotifications: TToggleNotification;
}

export default compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    undefined,
    mapDispatchToProps
  ),
  React.memo
)(CustomNotification);
