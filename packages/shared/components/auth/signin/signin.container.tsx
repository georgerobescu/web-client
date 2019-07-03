import { replace } from "connected-react-router";
import { LocationState } from "history";
import * as React from "react";
import { useEffect } from "react";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import { NOT_FOUND_PAGE_ROUTE } from "shared/components/not-found/not-found.routes";
import { ROLE } from "shared/constants/constants";
import withRole, { WithRoleProps } from "shared/decorators/with-role";
import { HOME_ROUTE } from "shared/routes/app.routes";
import { AuthRootState, SetSubmittingType } from "shared/utils/types";

import CaptchaContainer, { TValues } from "../captcha-container";
import {
  CODE_TYPE,
  loginUserInvestorAction,
  loginUserManagerAction
} from "./signin.actions";
import { clearLoginData, login } from "./signin.service";

const _SignInContainer: React.FC<Props> = ({
  className,
  renderForm,
  password,
  email,
  location,
  service,
  errorMessage,
  role,
  type
}) => {
  const from = (location.state && location.state.pathname) || HOME_ROUTE;
  const method =
    role === ROLE.MANAGER ? loginUserManagerAction : loginUserInvestorAction;
  useEffect(() => service.clearLoginData, []);
  useEffect(() => {
    if (type && (email === "" || password === "")) service.showNotFoundPage();
  }, []);
  return (
    <div className={className}>
      <CaptchaContainer
        request={service.login(method, from, type)}
        renderForm={handle => renderForm(handle, email, errorMessage)}
      />
    </div>
  );
};

const mapStateToProps = (state: AuthRootState): StateProps => {
  const { errorMessage } = state.loginData.login;
  const { email, password } = state.loginData.twoFactor;
  return {
    password,
    email,
    errorMessage
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      showNotFoundPage: () => replace(NOT_FOUND_PAGE_ROUTE),
      clearLoginData,
      login
    },
    dispatch
  )
});

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}
interface ServiceThunks extends ActionCreatorsMapObject {
  showNotFoundPage: () => void;
  clearLoginData: typeof clearLoginData;
  login: typeof login;
}

interface StateProps {
  errorMessage: string;
  password: string;
  email: string;
}

interface OwnProps {
  renderForm: (
    handle: (values: TValues, setSubmitting?: SetSubmittingType) => void,
    email: string,
    errorMessage: string
  ) => JSX.Element;
  className: string;
  type?: CODE_TYPE;
  location: LocationState;
}

interface Props extends OwnProps, StateProps, DispatchProps, WithRoleProps {}

const SignInContainer = compose<React.ComponentType<OwnProps>>(
  withRole,
  connect<StateProps, DispatchProps, OwnProps, AuthRootState>(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_SignInContainer);
export default SignInContainer;