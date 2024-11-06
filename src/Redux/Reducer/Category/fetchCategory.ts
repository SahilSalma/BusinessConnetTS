import produce from "immer";
import { createAsyncAction } from "typesafe-actions";
import { ActionType, createReducer } from "typesafe-actions";
import { Category, CategoryInfoState } from "../../../Types/allTypes";

export enum Types {
  FETCH_CATEGORIES_REQUEST = "FETCH_CATEGORIES_REQUEST",
  FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAILURE = "FETCH_CATEGORIES_FAILURE",
  FETCH_DETAILED_CATEGORIES_REQUEST = "FETCH_DETAILED_CATEGORIES_REQUEST",
  FETCH_DETAILED_CATEGORIES_SUCCESS = "FETCH_DETAILED_CATEGORIES_SUCCESS",
  FETCH_DETAILED_CATEGORIES_FAILURE = "FETCH_DETAILED_CATEGORIES_FAILURE",
}

const categoryActions = createAsyncAction(
  Types.FETCH_CATEGORIES_REQUEST,
  Types.FETCH_CATEGORIES_SUCCESS,
  Types.FETCH_CATEGORIES_FAILURE,
)
<
  void,
  { categories: Category[] },
  { message: string }
>();

export const Actions = { categoryActions };

export const initialState: CategoryInfoState = {
  request: {
    loading: false,
    error: null as string | null,
    data: null,
  }
};

export type FetchCategoryState = typeof initialState;

const fetchCategoriesRequest = (state = initialState) =>
  produce(state, (draft) => {
    draft.request.loading = true;
    draft.request.error = null;

    return draft;
  });

const fetchCategoriesSuccess = (
  state = initialState,
  { payload }: ActionType<typeof Actions.categoryActions.success>
) =>
  produce(state, (draft) => {
    draft.request.error = null;
    draft.request.data = payload.categories;
    if (draft.request.data) {
      draft.request.loading = false;
    }

    return draft;
  });

const fetchCategoriesFailure = (
  state = initialState,
  { payload }: ActionType<typeof Actions.categoryActions.failure>
) =>
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = payload.message;

    return draft;
  });


export default createReducer<typeof initialState, ActionType<typeof Actions>>(
  initialState
)
  .handleAction(Actions.categoryActions.request, fetchCategoriesRequest)
  .handleAction(Actions.categoryActions.success, fetchCategoriesSuccess)
  .handleAction(Actions.categoryActions.failure, fetchCategoriesFailure);
  