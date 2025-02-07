import { ProgramDetailsFullOld } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import {
  apiFieldSelector,
  apiSelector,
  fieldSelector
} from "shared/utils/selectors";

import { FETCH_PROGRAM_DESCRIPTION } from "../actions/program-details.actions";

export type ProgramDescriptionDataType = ProgramDetailsFullOld;

export type ProgramDescriptionState = IApiState<ProgramDescriptionDataType>;

export const programDescriptionSelector = apiSelector<
  ProgramDescriptionDataType
>(state => state.programDetails.description);

export const programIdSelector = apiFieldSelector(
  programDescriptionSelector,
  fieldSelector(state => state.id),
  undefined
);

export const programStatusSelector = apiFieldSelector(
  programDescriptionSelector,
  fieldSelector(state => state.status),
  undefined
);

const programDescriptionReducer = apiReducerFactory<ProgramDescriptionDataType>(
  {
    apiType: FETCH_PROGRAM_DESCRIPTION
  }
);

export default programDescriptionReducer;
