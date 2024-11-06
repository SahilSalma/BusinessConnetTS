import { put, delay, takeLatest } from "@redux-saga/core/effects";
import { Actions, Types } from "../../Reducer/rootReducer";
import { getNotifications, markNotificationAsRead, sendNotification } from "../../../Utils/BackendAPICalls";
import { Notification } from "../../../Types/allTypes";

interface fetchNotificationRequestAction {
    payload: {
        userId: string;
    };
}

interface sendNotificationAction {
    payload: {
        notification: Notification;
    };
}

interface readNotificationAction {
    payload: {
        notificationId: string;
    };
}

export function* fetchNotificationRequest(action: fetchNotificationRequestAction ): Generator<any, void, Response> {
    const { userId } = action.payload;
    try {
        yield delay(100);
        const response: any = yield getNotifications(userId);

        if (!response) {
            yield put(Actions.notifications.fetchNotificationAction.failure({ message: "No notifications found." }));
        } 
        if (response) {
            yield put(
              Actions.notifications.fetchNotificationAction.success({
                    notifications: response,
              })
            );
        }
    } catch (err) {
        const error = { message: "Something went wrong." };
        yield put(Actions.notifications.fetchNotificationAction.failure(error));
    }
}

export function* sendNotificationRequest(action: sendNotificationAction): Generator<any, void, Response> {
    const { notification } = action.payload;
    try {
        yield delay(100);

        yield sendNotification(notification);

        yield put(Actions.notifications.sendNotificationAction.success());
    } catch (err) {
        const error = { message: "Something went wrong." };
        yield put(Actions.notifications.sendNotificationAction.failure(error));
    }
}

export function* readNotificationRequest(action: readNotificationAction): Generator<any, void, Response> {
    const { notificationId } = action.payload;
    try {
        yield delay(100);
        const response: any = yield markNotificationAsRead(notificationId);

        if (!response) {
            yield put(Actions.notifications.readNotificationAction.failure({ message: "No notifications found." }));
        } 
        if (response) {
            yield put(
              Actions.notifications.readNotificationAction.success({
                    notification: response,
              })
            );
        }
    } catch (err) {
        const error = { message: "Something went wrong." };
        yield put(Actions.notifications.readNotificationAction.failure(error));
    }
}

export default function* notificationsSaga() {
    yield takeLatest(Types.FETCH_NOTIFICATIONS_REQUEST as any, fetchNotificationRequest);
    yield takeLatest(Types.SEND_NOTIFICATION_REQUEST as any, sendNotificationRequest);
    yield takeLatest(Types.READ_NOTIFICATIONS_REQUEST as any, readNotificationRequest);
}