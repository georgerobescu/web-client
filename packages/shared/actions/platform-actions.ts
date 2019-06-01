import { PlatformInfo } from "gv-api-web";
import platformApi from "shared/services/api-client/platform-api";
import { ApiAction } from "shared/utils/types";

export const PLATFORM_SETTINGS = "PLATFORM_SETTINGS";

const fetchPlatformSettings: ApiAction<PlatformInfo> = {
  type: PLATFORM_SETTINGS,
  payload: platformApi.v10PlatformInfoGet()
};

const platformActions = {
  fetchPlatformSettings
};

export default platformActions;