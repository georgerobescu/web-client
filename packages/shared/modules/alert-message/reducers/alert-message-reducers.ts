import * as uuid from "uuid";

import { IAlertAction } from "../actions/alert-message-actions";
import { ALERT_MESSAGE } from "../actions/alert-message-actions.constants";

export type IMessage = Readonly<{
  id?: string;
  text?: string;
  className?: string;
  isUseLocalization?: boolean;
}>;

export type AlertMessagesState = Readonly<IMessage[]>;

const initialState: AlertMessagesState = [];

const addMessage = (
  state: AlertMessagesState,
  action: IAlertAction
): AlertMessagesState => {
  const newMessage = {
    id: uuid.v4(),
    text: action.payload.text,
    className: action.payload.className,
    isUseLocalization: action.payload.isUseLocalization
  } as IMessage;
  return [...state.slice(-2), newMessage];
};

const removeMessage = (
  state: AlertMessagesState,
  action: IAlertAction
): AlertMessagesState => {
  return state.filter(message => message.id !== action.payload.id);
};

const removeAllMessages = (): AlertMessagesState => initialState;

const alertMessagesReducer = (
  state: AlertMessagesState = initialState,
  action: IAlertAction
): AlertMessagesState => {
  switch (action.type) {
    case ALERT_MESSAGE.SUCCESS:
    case ALERT_MESSAGE.WARNING:
    case ALERT_MESSAGE.ERROR:
      return addMessage(state, action);
    case ALERT_MESSAGE.REMOVE_AT:
      return removeMessage(state, action);
    case ALERT_MESSAGE.CLEAR_ALL:
      return removeAllMessages();
    default:
      return state;
  }
};

export default alertMessagesReducer;
