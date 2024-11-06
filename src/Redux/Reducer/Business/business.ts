import produce from "immer";
import { createAsyncAction } from "typesafe-actions";
import { ActionType, createReducer } from "typesafe-actions";
import { BusinessInfoState, Business } from "../../../Types/allTypes";

export enum Types {
  ADD_BUSINESS_REQUEST = "ADD_BUSINESS_REQUEST",
  ADD_BUSINESS_SUCCESS = "ADD_BUSINESS_SUCCESS",
  ADD_BUSINESS_FAILURE = "ADD_BUSINESS_FAILURE",
  EDIT_BUSINESS_REQUEST = "EDIT_BUSINESS_REQUEST",
  EDIT_BUSINESS_SUCCESS = "EDIT_BUSINESS_SUCCESS",
  EDIT_BUSINESS_FAILURE = "EDIT_BUSINESS_FAILURE",
}

const addBusinessActions = createAsyncAction(
  Types.ADD_BUSINESS_REQUEST,
  Types.ADD_BUSINESS_SUCCESS,
  Types.ADD_BUSINESS_FAILURE,
)
<
  { businessData: Business },
  void,
  { message: string }
>();

const editBusinessActions = createAsyncAction(
  Types.EDIT_BUSINESS_REQUEST,
  Types.EDIT_BUSINESS_SUCCESS,
  Types.EDIT_BUSINESS_FAILURE,
)
<
  { businessData: Business },
  void,
  { message: string }
>();

export const Actions = { addBusinessActions, editBusinessActions };

export const initialState: BusinessInfoState = {
  request: {
    loading: false,
    error: null as string | null,
    success: true
  }
};

export type BusinessState = typeof initialState;

const addBusinessRequest = (state = initialState) =>
  produce(state, (draft) => {
    draft.request.loading = true;
    draft.request.success = false;
    draft.request.error = null;

    return draft;
  });

const addBusinessSuccess = (
  state = initialState,
) =>
  produce(state, (draft) => {
    draft.request.error = null;
    draft.request.success = true;
    if (draft.request.success) {
      draft.request.loading = false;
    }

    return draft;
  });

const addBusinessFailure = (
  state = initialState,
  { payload }: ActionType<typeof Actions.addBusinessActions.failure>
) =>
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = payload.message;

    return draft;
  });

const editBusinessRequest = (state = initialState) =>
  produce(state, (draft) => {
    draft.request.loading = true;
    draft.request.success = false;
    draft.request.error = null;

    return draft;
  });

const editBusinessSuccess = (
  state = initialState,
) =>
  produce(state, (draft) => {
    draft.request.error = null;
    draft.request.success = true;
    if (draft.request.success) {
      draft.request.loading = false;
    }

    return draft;
  });

const editBusinessFailure = (
  state = initialState,
  { payload }: ActionType<typeof Actions.editBusinessActions.failure>
) =>
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = payload.message;

    return draft;
  });


export default createReducer<typeof initialState, ActionType<typeof Actions>>(
  initialState
)
  .handleAction(Actions.addBusinessActions.request, addBusinessRequest)
  .handleAction(Actions.addBusinessActions.success, addBusinessSuccess)
  .handleAction(Actions.addBusinessActions.failure, addBusinessFailure)
  .handleAction(Actions.editBusinessActions.request, editBusinessRequest)
  .handleAction(Actions.editBusinessActions.success, editBusinessSuccess)
  .handleAction(Actions.editBusinessActions.failure, editBusinessFailure);
  