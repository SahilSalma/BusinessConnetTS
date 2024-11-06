import { all, fork } from "@redux-saga/core/effects";
import userSaga from "./User/userInfo";
import categorySaga from "./Categories/categoryInfo";
import businessSaga from "./Business/businessInfo";
import postsSaga from "./Posts/postsInfo";
import reviewsSaga from "./Reviews/reviewsInfo";
import notificationsSaga from "./Notification/notificationInfo";

function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(categorySaga),
    fork(businessSaga),
    fork(postsSaga),
    fork(reviewsSaga),
    fork(notificationsSaga)
  ]);
}

export default rootSaga;

