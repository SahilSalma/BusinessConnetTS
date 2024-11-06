import produce from "immer";
import { createAsyncAction } from "typesafe-actions";
import { ActionType, createReducer } from "typesafe-actions";
import { Business, FetchBusinessInfoState, Review, ReviewInfoState } from "../../../Types/allTypes";

export enum Types {
  FETCH_REVIEWS_REQUEST = "FETCH_REVIEWS_REQUEST",
  FETCH_REVIEWS_SUCCESS = "FETCH_REVIEWS_SUCCESS",
  FETCH_REVIEWS_FAILURE = "FETCH_REVIEWS_FAILURE",
  ADD_REVIEW_REQUEST = "ADD_REVIEW_REQUEST",
  ADD_REVIEW_SUCCESS = "ADD_REVIEW_SUCCESS",
  ADD_REVIEW_FAILURE = "ADD_REVIEW_FAILURE",
}

export const fetchReviewsActions = createAsyncAction(
  Types.FETCH_REVIEWS_REQUEST,
  Types.FETCH_REVIEWS_SUCCESS,
  Types.FETCH_REVIEWS_FAILURE,
)
<
  { businessId: string },
  { reviews: Review[] },
  { message: string }
>();

const addReviewActions = createAsyncAction(
  Types.ADD_REVIEW_REQUEST,
  Types.ADD_REVIEW_SUCCESS,
  Types.ADD_REVIEW_FAILURE,
)
<
  { review: Review },
  { review: Review },
  { message: string }
>();

export const Actions = { fetchReviewsActions, addReviewActions };

export const initialState: ReviewInfoState = {
  request: {
    loading: false,
    error: null as string | null,
    data: null,
  }
};

export type ReviewsState = typeof initialState;


const fetchReviewsRequest = (state = initialState) =>
  produce(state, (draft) => {
    draft.request.loading = true;
    draft.request.error = null;
    draft.request.data = null;

    return draft;
  });

const fetchReviewsSuccess = (
  state = initialState,
  { payload }: ActionType<typeof fetchReviewsActions.success>
) =>
  produce(state, (draft) => {
    draft.request.error = null;
    draft.request.data = payload.reviews;
    if (draft.request.data) {
      draft.request.loading = false;
    }

    return draft;
  });

const fetchReviewsFailure = (
  state = initialState,
  { payload }: ActionType<typeof fetchReviewsActions.failure>
) =>
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = payload.message;

    return draft;
  });

const addReviewRequest = (state = initialState) =>
  produce(state, (draft) => {
    draft.request.loading = true;
    draft.request.error = null;

    return draft;
  });

const addReviewSuccess = (
  state = initialState,
  { payload }: ActionType<typeof Actions.addReviewActions.success>
) =>
  produce(state, (draft) => {
    draft.request.error = null;
    draft.request.data = state.request.data ? [payload.review, ...state.request.data] : [payload.review];
    if (draft.request.data) {
      draft.request.loading = false;
    }

    return draft;
  });

const addReviewFailure = (
  state = initialState,
  { payload }: ActionType<typeof Actions.addReviewActions.failure>
) =>
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = payload.message;

    return draft;
  });


export default createReducer<typeof initialState, ActionType<typeof Actions>>(
  initialState
)
  .handleAction(Actions.fetchReviewsActions.request, fetchReviewsRequest)
  .handleAction(Actions.fetchReviewsActions.success, fetchReviewsSuccess)
  .handleAction(Actions.fetchReviewsActions.failure, fetchReviewsFailure)
  .handleAction(Actions.addReviewActions.request, addReviewRequest)
  .handleAction(Actions.addReviewActions.success, addReviewSuccess)
  .handleAction(Actions.addReviewActions.failure, addReviewFailure);
  