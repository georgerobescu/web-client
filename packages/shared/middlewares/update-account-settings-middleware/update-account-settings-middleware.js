import { UPDATE_ACCOUNT_SETTINGS_CURRENCY } from "shared/actions/account-settings-actions";
import { saveData } from "shared/utils/localstorage";

export const ACCOUNT_CURRENCY_KEY = "accountCurrency";

export const updateAccountCurrencyMiddleware = store => next => action => {
  if (action.type === UPDATE_ACCOUNT_SETTINGS_CURRENCY) {
    saveData(ACCOUNT_CURRENCY_KEY, action.payload);
  }
  return next(action);
};
