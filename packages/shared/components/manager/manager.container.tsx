import "./manager.page.scss";

import { goBack } from "connected-react-router";
import { ManagerProfile } from "gv-api-web";
import * as React from "react";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import { SLUG_URL_REGEXP } from "shared/utils/constants";
import { AuthRootState } from "shared/utils/types";

import ManagerPage from "./manager.page";
import { fetchManagerProfile } from "./services/manager.service";

export const MANAGER_SLUG_URL_PARAM_NAME = "managerSlugUrl";

export const MANAGERS_ROUTE = "/managers";
export const MANAGER_DETAILS_ROUTE = `${MANAGERS_ROUTE}/:${MANAGER_SLUG_URL_PARAM_NAME}`;
export const MANAGER_DETAILS_ROUTE_REGEXP = `${MANAGERS_ROUTE}/:${MANAGER_SLUG_URL_PARAM_NAME}(${SLUG_URL_REGEXP})`;

class _ManagerContainer extends React.PureComponent<Props, State> {
  state = {
    managerProfile: undefined,
    isPending: false
  };

  componentDidMount() {
    const { service } = this.props;
    service.fetchManagerProfile().then(profile => {
      this.setState({ managerProfile: profile, isPending: false });
    });
  }

  render() {
    const { isAuthenticated } = this.props;
    const { managerProfile, isPending } = this.state;

    return (
      <ManagerPage
        condition={!isPending && !!managerProfile}
        managerProfile={managerProfile!}
        isAuthenticated={isAuthenticated}
      />
    );
  }
}

const mapStateToProps = (state: AuthRootState): StateProps => ({
  isAuthenticated: state.authData.isAuthenticated
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { fetchManagerProfile, goBack },
    dispatch
  )
});

interface Props extends OwnProps, StateProps, DispatchProps {}

interface OwnProps {}

interface StateProps {
  isAuthenticated: boolean;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  fetchManagerProfile: typeof fetchManagerProfile;
  goBack: typeof goBack;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface State {
  managerProfile?: ManagerProfile;
  isPending: boolean;
}

const ManagerContainer = compose<React.ComponentType<OwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(_ManagerContainer)
);
export default ManagerContainer;