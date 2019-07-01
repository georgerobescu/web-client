import { ForgotPasswordViewModel } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  AuthRootState,
  MiddlewareDispatch,
  SetSubmittingType
} from "shared/utils/types";

import * as authService from "../../auth.service";
import { CaptchasType } from "../../auth.service";
import Pow from "../../captcha/pow";
import { forgotPassword } from "../services/forgot-password.service";

class _CaptchaContainer extends React.PureComponent<Props, State> {
  state = {
    pow: undefined,
    geeTest: undefined,
    prefix: undefined,
    setSubmitting: undefined,
    isSubmit: false,
    captchaType: "None",
    id: "",
    email: ""
  };

  componentDidUpdate(): void {
    const {
      isSubmit,
      prefix = "",
      email,
      id,
      setSubmitting,
      captchaType
    } = this.state;
    const { service } = this.props;
    const captchaCheckResult = {
      id,
      pow: {
        prefix
      },
      geeTest: {}
    };
    const sendRequest = () =>
      service.forgotPassword(
        {
          email,
          captchaCheckResult
        },
        setSubmitting!
      );
    if (isSubmit) {
      switch (captchaType) {
        case "Pow":
          if (prefix) {
            sendRequest();
            this.setState({
              pow: undefined,
              prefix: undefined,
              isSubmit: false
            });
          }
          break;
        default:
          sendRequest();
          this.setState({ isSubmit: false });
          break;
      }
    }
  }

  handlePow = (prefix: number) => {
    this.setState({ prefix });
  };

  handleSubmit = (values: THandleSubmit, setSubmitting: SetSubmittingType) => {
    authService.getCaptcha(values.email).then(res => {
      this.setState({
        ...res,
        ...values,
        setSubmitting,
        isSubmit: true
      });
    });
  };

  render() {
    const { errorMessage, renderForm } = this.props;
    const { pow, email } = this.state;
    return (
      <>
        {renderForm(this.handleSubmit, errorMessage)}
        {pow && <Pow {...pow} login={email} handleSuccess={this.handlePow} />}
      </>
    );
  }
}

const mapStateToProps = (state: AuthRootState): StateProps => {
  const { isPending, errorMessage } = state.passwordRestoreData.forgot;
  return { isPending, errorMessage };
};

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    forgotPassword: (formData, setSubmitting) => {
      dispatch(forgotPassword(formData)).catch(() => {
        setSubmitting(false);
      });
    }
  }
});

type THandleSubmit = { [keys: string]: any };

interface State extends CaptchasType {
  isSubmit: boolean;
  captchaType: string;
  setSubmitting?: SetSubmittingType;
  id?: string;
  prefix?: number;
  email?: string;
}

interface StateProps {
  isPending: boolean;
  errorMessage: string;
}

interface DispatchProps {
  service: {
    forgotPassword: (
      formData: ForgotPasswordViewModel,
      setSubmitting: SetSubmittingType
    ) => void;
  };
}

interface OwnProps {
  renderForm: (
    handle: (
      loginFormData: THandleSubmit,
      setSubmitting: SetSubmittingType
    ) => void,
    errorMessage: string
  ) => JSX.Element;
}

interface Props extends OwnProps, StateProps, DispatchProps {}

const CaptchaContainer = compose<React.ComponentType<OwnProps>>(
  connect<StateProps, DispatchProps, OwnProps, AuthRootState>(
    mapStateToProps,
    mapDispatchToProps
  )
)(_CaptchaContainer);
export default CaptchaContainer;