import { replace } from "connected-react-router";
import { LocationState } from "history";
import * as React from "react";
import { useEffect } from "react";
import { connect, ResolveThunks } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import { NOT_FOUND_PAGE_ROUTE } from "shared/components/not-found/not-found.routes";
import { ROLE } from "shared/constants/constants";
import useRole from "shared/hooks/use-role.hook";
import { HOME_ROUTE, LOGIN_ROUTE } from "shared/routes/app.routes";
import { AuthRootState, SetSubmittingType } from "shared/utils/types";

import CaptchaContainer, { TValues } from "../captcha-container";
import AuthTabs from "../components/auth-tabs/auth-tabs";
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
  type
}) => {
  const role = useRole();
  const from = (location.state && location.state.pathname) || HOME_ROUTE;
  const method =
    role === ROLE.MANAGER ? loginUserManagerAction : loginUserInvestorAction;
  useEffect(() => service.clearLoginData, []);
  useEffect(() => {
    if (type && (email === "" || password === "")) service.showNotFoundPage();
  }, []);
  return (
    <div className={className}>
      {!type && <AuthTabs authPartUrl={LOGIN_ROUTE} />}
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

interface Props extends OwnProps, StateProps, DispatchProps {}

const SignInContainer = compose<React.ComponentType<OwnProps>>(
  connect<StateProps, DispatchProps, OwnProps, AuthRootState>(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_SignInContainer);
export default SignInContainer;
