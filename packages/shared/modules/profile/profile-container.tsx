import { ProfileFullViewModel } from "gv-api-web";
import pickBy from "lodash.pickby";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import profileApi from "shared/services/api-client/profile-api";
import authService from "shared/services/auth-service";
import { MiddlewareDispatch, SetSubmittingType } from "shared/utils/types";

import { IProfileOwnProps } from "./profile";
import { IProfileFormOwnProps } from "./profile-form";

class _ProfileContainer extends React.PureComponent<Props, State> {
  state = {
    data: undefined,
    isPending: false
  };

  success = (text: string) => {
    const { service } = this.props;
    service.alertMessageActionsSuccess(text);
    this.fetch();
  };

  handleEdit = (values: any, setSubmitting: SetSubmittingType) => {
    const model = pickBy(values, str => Boolean(str));
    this.setState({ isPending: true });
    profileApi
      .v10ProfilePersonalUpdatePost(authService.getAuthArg(), {
        model
      })
      .then(() => {
        this.setState({ isPending: false });
        this.success(this.props.t("profile-page.success-edit"));
      })
      .catch(() => {
        setSubmitting(false);
      });
  };

  handleVerify = () => {
    this.success(this.props.t("profile-page.success-verify"));
  };

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    this.setState({ isPending: true });
    profileApi
      .v10ProfileGet(authService.getAuthArg())
      .then((data: ProfileFullViewModel) => this.setState({ data }));
  }

  render() {
    const { data } = this.state;
    const { Child, personal } = this.props;
    if (!data) return null;
    return <Child personal={personal} info={data} onSubmit={this.handleEdit} />;
  }
}

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    alertMessageActionsSuccess: (text: string) =>
      dispatch(alertMessageActions.success(text))
  }
});

interface OwnProps {
  Child: React.ComponentType<IProfileOwnProps | IProfileFormOwnProps>;
  personal?: boolean;
}

interface DispatchProps {
  service: {
    alertMessageActionsSuccess: (text: string) => void;
  };
}

interface Props extends InjectedTranslateProps, DispatchProps, OwnProps {}

interface State {
  isPending: boolean;
  data?: ProfileFullViewModel;
}

const ProfileContainer = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(_ProfileContainer);
export default ProfileContainer;