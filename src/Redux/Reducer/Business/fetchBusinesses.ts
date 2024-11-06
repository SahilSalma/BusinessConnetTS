import produce from "immer";
import { createAsyncAction } from "typesafe-actions";
import { ActionType, createReducer } from "typesafe-actions";
import { Business, FetchBusinessInfoState } from "../../../Types/allTypes";

export enum Types {
  FETCH_BUSINESS_REQUEST = "FETCH_BUSINESS_REQUEST",
  FETCH_BUSINESS_SUCCESS = "FETCH_BUSINESS_SUCCESS",
  FETCH_BUSINESS_FAILURE = "FETCH_BUSINESS_FAILURE",
}

const businessActions = createAsyncAction(
  Types.FETCH_BUSINESS_REQUEST,
  Types.FETCH_BUSINESS_SUCCESS,
  Types.FETCH_BUSINESS_FAILURE,
)
<
  { searchValue?: string[], userListing?: string, showUnApprovedListings?: false },
  { businesses: Business[] },
  { message: string }
>();

export const Actions = { businessActions };

export const initialState: FetchBusinessInfoState = {
  request: {
    loading: false,
    error: null as string | null,
    data: null,
  }
};

export type FetchBusinessState = typeof initialState;

const fetchBusinessRequest = (state = initialState) =>
  produce(state, (draft) => {
    draft.request.loading = true;
    draft.request.error = null;
    draft.request.data = null;

    return draft;
  });

const fetchBusinessSuccess = (
  state = initialState,
  { payload }: ActionType<typeof Actions.businessActions.success>
) =>
  produce(state, (draft) => {
    draft.request.error = null;
    draft.request.data = payload.businesses;
    if (draft.request.data) {
      draft.request.loading = false;
    }

    return draft;
  });

const fetchBusinessFailure = (
  state = initialState,
  { payload }: ActionType<typeof Actions.businessActions.failure>
) =>
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = payload.message;

    return draft;
  });


export default createReducer<typeof initialState, ActionType<typeof Actions>>(
  initialState
)
  .handleAction(Actions.businessActions.request, fetchBusinessRequest)
  .handleAction(Actions.businessActions.success, fetchBusinessSuccess)
  .handleAction(Actions.businessActions.failure, fetchBusinessFailure);
  