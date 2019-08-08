import { push } from "connected-react-router";
import { CancelablePromise, ProgramUpdate } from "gv-api-web";
import { Dispatch } from "redux";
import { ASSET } from "shared/constants/constants";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { RootState } from "shared/reducers/root-reducer";
import {
  PROGRAMS_ROUTE,
  PROGRAM_DETAILS_ROUTE,
  PROGRAM_SLUG_URL_PARAM_NAME
} from "shared/routes/programs.routes";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import filesService from "shared/services/file-service";
import getParams from "shared/utils/get-params";
import { ManagerThunk, ResponseError } from "shared/utils/types";

import { IAssetEditFormValues } from "../../asset-edit/components/asset-edit-form";
import { TUpdateAssetFunc } from "../asset-settings.page";

export const cancelChangeBrokerMethod = (
  programId: string
): ManagerThunk<CancelablePromise<void>> => dispatch =>
  managerApi
    .v10ManagerProgramsBrokerChangeCancelPost(authService.getAuthArg(), {
      programId
    })
    .then(() => {
      dispatch(
        alertMessageActions.success(
          "manager.program-settings.notifications.broker-success",
          true
        )
      );
    })
    .catch((error: ResponseError) => {
      dispatch(alertMessageActions.error(error.errorMessage));
    });

export const changeBrokerMethod = (
  programId: string,
  newBrokerAccountTypeId: string,
  newLeverage: number
): ManagerThunk<CancelablePromise<void>> => dispatch =>
  managerApi
    .v10ManagerProgramsBrokerChangePost(authService.getAuthArg(), {
      request: { programId, newBrokerAccountTypeId, newLeverage }
    })
    .then(() => {
      dispatch(
        alertMessageActions.success(
          "manager.program-settings.notifications.broker-success",
          true
        )
      );
    })
    .catch((error: ResponseError) => {
      dispatch(alertMessageActions.error(error.errorMessage));
    });

export const redirectToProgram = () => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const { router } = getState();
  const programSlugUrl = getParams(
    router.location.pathname,
    PROGRAM_DETAILS_ROUTE
  )[PROGRAM_SLUG_URL_PARAM_NAME];
  dispatch(push(`${PROGRAMS_ROUTE}/${programSlugUrl}`));
};

export const editAsset = (
  id: string,
  editAssetData: IAssetEditFormValues,
  type: ASSET
): ManagerThunk<CancelablePromise<void>> => dispatch => {
  const authorization = authService.getAuthArg();
  const editMethod =
    type === ASSET.PROGRAM
      ? managerApi.v10ManagerProgramsByIdUpdatePost
      : managerApi.v10ManagerFundsByIdUpdatePost;
  let data = editAssetData;
  let promise = Promise.resolve("") as CancelablePromise<any>;
  if (data.logo.image)
    promise = filesService.uploadFile(data.logo.image.cropped, authorization);

  return promise
    .then(response => {
      data = {
        ...data,
        logo: response || data.logo.src
      };
      return editMethod(id, authorization, { model: data as ProgramUpdate }); //TODO ask backend to change ProgramUpdate logo type
    })
    .then(() => {
      dispatch(
        alertMessageActions.success(
          (type === ASSET.PROGRAM &&
            "manager.edit-program.notifications.edit-success") ||
          (type === ASSET.FUND &&
            "manager.edit-fund.notifications.edit-success") ||
          "",
          true
        )
      );
    });
};
