import * as notifications from "./notifications";
import { initialState, NotificationState } from "./notifications";
import reduceReducers from "reduce-reducers";


export const Types = {
    ...notifications.Types,
};

export const Actions = {
    ...notifications.Actions,
};

export default reduceReducers<NotificationState>(
    initialState,
    notifications.default as any,
);
