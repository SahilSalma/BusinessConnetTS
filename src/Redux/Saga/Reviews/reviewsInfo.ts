import { put, delay, takeLatest } from "@redux-saga/core/effects";
import { Actions, Types } from "../../Reducer/rootReducer";
import { Review } from "../../../Types/allTypes";
import { getReviews, postReview } from "../../../Utils/BackendAPICalls";

interface fetchReviewsAction {
    payload: {
        businessId: string;
    };
}

interface addReviewAction {
    payload: {
        review: Review;
    };
}

export function* fetchReviewsRequest(action: fetchReviewsAction): Generator<any, void, Response> {
    const { businessId } = action.payload;
    try {
        yield delay(100);
        const response: any = yield getReviews(businessId);

        if (!response) {
            yield put(Actions.reviews.fetchReviewsActions.failure({ message: "No reviews found." }));
        } 
        if (response) {
            yield put(
              Actions.reviews.fetchReviewsActions.success({
                reviews: response,
              })
            );
        }
    } catch (err) {
        const error = { message: "Something went wrong." };
        yield put(Actions.reviews.fetchReviewsActions.failure(error));
    }
}

export function* addReviewRequest(action: addReviewAction  ): Generator<any, void, Response> {
    const { review } = action.payload;
    try {
        yield delay(100);

        const response: any = yield postReview({
            businessId: review.businessId,
            userId: review.userId,
            rating: review.rating,
            title: review.title,
            content: review.content,
            images: review.images,
        });

        if (!response) {
            yield put(Actions.reviews.fetchReviewsActions.failure({ message: "No reviews found." }));
        } 

        yield put(Actions.reviews.addReviewActions.success({ review: response }));
    } catch (err) {
        const error = { message: "Something went wrong." };
        yield put(Actions.reviews.addReviewActions.failure(error));
    }
}

export default function* businessSaga() {
    yield takeLatest(Types.FETCH_REVIEWS_REQUEST as any, fetchReviewsRequest);
    yield takeLatest(Types.ADD_REVIEW_REQUEST as any, addReviewRequest);
}
