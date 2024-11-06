import produce from "immer";
import { createAsyncAction } from "typesafe-actions";
import { ActionType, createReducer } from "typesafe-actions";
import { Notification, NotificationInfoState } from "../../../Types/allTypes";

export enum Types {
    SEND_NOTIFICATION_REQUEST = "SEND_NOTIFICATION_REQUEST",
    SEND_NOTIFICATION_SUCCESS = "SEND_NOTIFICATION_SUCCESS",
    SEND_NOTIFICATION_FAILURE = "SEND_NOTIFICATION_FAILURE",
    FETCH_NOTIFICATIONS_REQUEST = "FETCH_NOTIFICATIONS_REQUEST",
    FETCH_NOTIFICATIONS_SUCCESS = "FETCH_NOTIFICATIONS_SUCCESS",
    FETCH_NOTIFICATIONS_FAILURE = "FETCH_NOTIFICATIONS_FAILURE",
    READ_NOTIFICATIONS_REQUEST = "READ_NOTIFICATIONS_REQUEST",
    READ_NOTIFICATIONS_SUCCESS = "READ_NOTIFICATIONS_SUCCESS",
    READ_NOTIFICATIONS_FAILURE = "READ_NOTIFICATIONS_FAILURE",
    DELETE_NOTIFICATIONS_REQUEST = "DELETE_NOTIFICATIONS_REQUEST",
    DELETE_NOTIFICATIONS_SUCCESS = "DELETE_NOTIFICATIONS_SUCCESS",
    DELETE_NOTIFICATIONS_FAILURE = "DELETE_NOTIFICATIONS_FAILURE"
}

const sendNotificationAction = createAsyncAction(
  Types.SEND_NOTIFICATION_REQUEST,
  Types.SEND_NOTIFICATION_SUCCESS,
  Types.SEND_NOTIFICATION_FAILURE,
)
<
  { notification: Notification },
  void,
  { message: string }
>();

const fetchNotificationAction = createAsyncAction(
  Types.FETCH_NOTIFICATIONS_REQUEST,
  Types.FETCH_NOTIFICATIONS_SUCCESS,
  Types.FETCH_NOTIFICATIONS_FAILURE,
)
<
  { userId: string },
  { notifications: Notification[] },
  { message: string }
>();

const readNotificationAction = createAsyncAction(
    Types.READ_NOTIFICATIONS_REQUEST,
    Types.READ_NOTIFICATIONS_SUCCESS,
    Types.READ_NOTIFICATIONS_FAILURE,
  )
  <
    { notificationId: string },
    { notification: Notification },
    { message: string }
  >();

export const Actions = { sendNotificationAction, fetchNotificationAction, readNotificationAction };

export const initialState: NotificationInfoState = {
  request: {
    loading: false,
    error: null as string | null,
    data: null,
  }
};

export type NotificationState = typeof initialState;

const sendNotificationRequest = (state = initialState) =>
  produce(state, (draft) => {
    draft.request.loading = true;
    draft.request.error = null;

    return draft;
  });

const sendNotificationSuccess = (
  state = initialState,
) =>
  produce(state, (draft) => {
    draft.request.error = null;
    draft.request.loading = false;

    return draft;
  });

const sendNotificationFailure = (
  state = initialState,
  { payload }: ActionType<typeof Actions.sendNotificationAction.failure>
) =>
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = payload.message;

    return draft;
  });

const fetchNotificationRequest = (state = initialState) =>
  produce(state, (draft) => {
    draft.request.loading = true;
    draft.request.error = null;

    return draft;
  });

const fetchNotificationSuccess = (
    state = initialState,
    { payload }: ActionType<typeof Actions.fetchNotificationAction.success>
) =>
  produce(state, (draft) => {
    draft.request.error = null;
    draft.request.loading = false;
    draft.request.data = payload.notifications;

    return draft;
  });

const fetchNotificationFailure = (
  state = initialState,
  { payload }: ActionType<typeof Actions.fetchNotificationAction.failure>
) =>
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = payload.message;

    return draft;
  });


const readNotificationRequest = (state = initialState) =>
    produce(state, (draft) => {
        draft.request.loading = true;
        draft.request.error = null;
    
        return draft;
    });

const readNotificationSuccess = (
    state = initialState,
    { payload }: ActionType<typeof Actions.readNotificationAction.success>
) =>
    produce(state, (draft) => {
        draft.request.error = null;
        draft.request.loading = false;
        draft.request.data?.map((notification) => {
            if(notification._id === payload.notification._id) {
                notification.read = payload.notification.read;
            }
            return notification;
        });
    
        return draft;
    });

const readNotificationFailure = (
    state = initialState,
    { payload }: ActionType<typeof Actions.readNotificationAction.failure>
) =>
    produce(state, (draft) => {
        draft.request.loading = false;
        draft.request.error = payload.message;
    
        return draft;
    });

export default createReducer<typeof initialState, ActionType<typeof Actions>>(
  initialState
)
    .handleAction(sendNotificationAction.request, sendNotificationRequest)
    .handleAction(sendNotificationAction.success, sendNotificationSuccess)
    .handleAction(sendNotificationAction.failure, sendNotificationFailure)
    .handleAction(fetchNotificationAction.request, fetchNotificationRequest)
    .handleAction(fetchNotificationAction.success, fetchNotificationSuccess)
    .handleAction(fetchNotificationAction.failure, fetchNotificationFailure)
    .handleAction(readNotificationAction.request, readNotificationRequest)
    .handleAction(readNotificationAction.success, readNotificationSuccess)
    .handleAction(readNotificationAction.failure, readNotificationFailure);  