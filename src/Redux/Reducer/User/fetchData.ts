import produce from "immer";
import { createAction, createAsyncAction } from "typesafe-actions";
import { ActionType, createReducer } from "typesafe-actions";
import { User, UserInfoState } from "../../../Types/allTypes";

export enum Types {
  FETCH_USER_REQUEST = "FETCH_USER_REQUEST",
  FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
  FETCH_USER_FAILURE = "FETCH_USER_FAILURE",
  SIGN_UP_USER_REQUEST = "SIGN_UP_USER_REQUEST",
  SIGN_UP_USER_SUCCESS = "SIGN_UP_USER_SUCCESS",
  SIGN_UP_USER_FAILURE = "SIGN_UP_USER_FAILURE",
  VERIFY_USER_REQUEST = "VERIFY_USER_REQUEST",
  VERIFY_USER_SUCCESS = "VERIFY_USER_SUCCESS",
  VERIFY_USER_FAILURE = "VERIFY_USER_FAILURE",
  LOGOUT_USER_REQUEST = "REMOVE_USER_REQUEST",
  EDIT_USER_REQUEST = "EDIT_USER_REQUEST",
  EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS",
  EDIT_USER_FAILURE = "EDIT_USER_FAILURE",
  DELETE_USER_REQUEST = "DELETE_USER_REQUEST",
  DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS",
  DELETE_USER_FAILURE = "DELETE_USER_FAILURE",
  UPDATE_PASSWORD_REQUEST = "UPDATE_PASSWORD_REQUEST",
  UPDATE_PASSWORD_SUCCESS = "UPDATE_PASSWORD_SUCCESS",
  UPDATE_PASSWORD_FAILURE = "UPDATE_PASSWORD_FAILURE",
}

const userActions = createAsyncAction(
  Types.FETCH_USER_REQUEST,
  Types.FETCH_USER_SUCCESS,
  Types.FETCH_USER_FAILURE,
)
<
  { email: string, password: string },
  { token: string },
  { message: string }
>();

const signUpUserActions = createAsyncAction(
  Types.SIGN_UP_USER_REQUEST,
  Types.SIGN_UP_USER_SUCCESS,
  Types.SIGN_UP_USER_FAILURE,
)
<
  { email: string, password: string, firstName: string, lastName: string },
  { token: string },
  { message: string }
>();

const verifyUserActions = createAsyncAction(
  Types.VERIFY_USER_REQUEST,
  Types.VERIFY_USER_SUCCESS,
  Types.VERIFY_USER_FAILURE,
)
<
  { token: string },
  { user: User },
  { message: string }
>();

const editUserActions = createAsyncAction(
  Types.EDIT_USER_REQUEST,
  Types.EDIT_USER_SUCCESS,
  Types.EDIT_USER_FAILURE,
)
<
  { user: User },
  { isSuccess: boolean, user: User },
  { message: string }
>();

const deleteUserActions = createAsyncAction(
  Types.DELETE_USER_REQUEST,
  Types.DELETE_USER_SUCCESS,
  Types.DELETE_USER_FAILURE,
)
<
  { password: string },
  { isSuccess: boolean },
  { message: string }
>();

const updatePasswordActions = createAsyncAction(
  Types.UPDATE_PASSWORD_REQUEST,
  Types.UPDATE_PASSWORD_SUCCESS,
  Types.UPDATE_PASSWORD_FAILURE,
)
<
  { currentPassword: string, newPassword: string },
  { isSuccess: boolean },
  { message: string }
>();

const logoutUser = createAction(Types.LOGOUT_USER_REQUEST)();

export const Actions = { userActions, verifyUserActions, signUpUserActions, editUserActions, deleteUserActions, updatePasswordActions, logoutUser };

export const initialState: UserInfoState = {
  request: {
    loading: false,
    error: null as string | null,
    token: null,
    data: null,
    editSuccess: false,
    isDeleted: false,
    isPasswordUpdated: false
  }
};

export type FetchUserState = typeof initialState;

const fetchUserRequest = (state = initialState) =>
  produce(state, (draft) => {
    draft.request.loading = true;
    draft.request.error = null;
    draft.request.isDeleted = false;
    draft.request.editSuccess = false;
    draft.request.isPasswordUpdated = false;

    return draft;
  });

const signUpUserRequest = (state = initialState) =>
  produce(state, (draft) => {
    draft.request.loading = true;
    draft.request.error = null;
    draft.request.isDeleted = false;
    draft.request.editSuccess = false;
    draft.request.isPasswordUpdated = false;

    return draft;
  });

const verifyUserRequest = (state = initialState) =>
  produce(state, (draft) => {
    draft.request.loading = true;
    draft.request.error = null;
    draft.request.isDeleted = false;
    draft.request.editSuccess = false;
    draft.request.isPasswordUpdated = false;

    return draft;
  });

const logoutUserRequest = (state = initialState) =>
  produce(state, (draft) => {
    // draft.request.loading = false;
    draft.request.error = null;
    draft.request.token = null;
    draft.request.data = null;
    draft.request.isDeleted = false;
    draft.request.editSuccess = false;
    draft.request.isPasswordUpdated = false;
    localStorage.removeItem('token');

    return draft;
  });

const fetchUserSuccess = (
  state = initialState,
  { payload }: ActionType<typeof Actions.userActions.success>
) =>
  produce(state, (draft) => {
    draft.request.error = null;
    draft.request.token = payload.token;
    if (draft.request.data) {
      draft.request.loading = false;
    }

    return draft;
  });

const signUpUserSuccess = (
  state = initialState,
  { payload }: ActionType<typeof Actions.signUpUserActions.success>
) =>
  produce(state, (draft) => {
    draft.request.error = null;
    draft.request.token = payload.token;
    if (draft.request.token) {
      draft.request.loading = false;
    }

    return draft;
  });

const verifyUserSuccess = (
  state = initialState,
  { payload }: ActionType<typeof Actions.verifyUserActions.success>
) =>
  produce(state, (draft) => {
    draft.request.error = null;
    draft.request.data = payload.user;
    if (draft.request.data) {
      draft.request.loading = false;
    }

    return draft;
  });

const fetchUserFailure = (
  state = initialState,
  { payload }: ActionType<typeof Actions.userActions.failure>
) =>
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = payload.message;

    return draft;
  });

const signUpUserFailure = (
  state = initialState,
  { payload }: ActionType<typeof Actions.signUpUserActions.failure>
) =>
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = payload.message;

    return draft;
  });

const verifyUserFailure = (
  state = initialState,
  { payload }: ActionType<typeof Actions.verifyUserActions.failure>
) =>
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = payload.message;
    draft.request.token = null;
    draft.request.data = null;

    return draft;
  });

const editUserRequest = (state = initialState) =>
  produce(state, (draft) => {
    draft.request.loading = true;
    draft.request.error = null;
    draft.request.isDeleted = false;
    draft.request.editSuccess = false;
    draft.request.isPasswordUpdated = false;

    return draft;
  });

const editUserSuccess = (
  state = initialState,
  { payload }: ActionType<typeof Actions.editUserActions.success>
) =>
  produce(state, (draft) => {
    draft.request.error = null;
    draft.request.editSuccess = payload.isSuccess;
    draft.request.data = payload.user;
    draft.request.loading = false;

    return draft;
  });

const editUserFailure = (
  state = initialState,
  { payload }: ActionType<typeof Actions.editUserActions.failure>
) =>
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = payload.message;

    return draft;
  });

const deleteUserRequest = (state = initialState) =>
  produce(state, (draft) => {
    draft.request.loading = true;
    draft.request.error = null;
    draft.request.isDeleted = false;
    draft.request.editSuccess = false;
    draft.request.isPasswordUpdated = false;

    return draft;
  });

const deleteUserSuccess = (
  state = initialState,
  { payload }: ActionType<typeof Actions.deleteUserActions.success>
) =>
  produce(state, (draft) => {
    draft.request.error = null;
    draft.request.isDeleted = payload.isSuccess;
    draft.request.loading = false;

    return draft;
  });

const deleteUserFailure = (
  state = initialState,
  { payload }: ActionType<typeof Actions.deleteUserActions.failure>
) =>
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = payload.message;

    return draft;
  });

const updatePasswordRequest = (state = initialState) =>
  produce(state, (draft) => {
    draft.request.loading = true;
    draft.request.error = null;
    draft.request.isDeleted = false;
    draft.request.editSuccess = false;
    draft.request.isPasswordUpdated = false;

    return draft;
  });

const updatePasswordSuccess = (
  state = initialState,
  { payload }: ActionType<typeof Actions.updatePasswordActions.success>
) =>
  produce(state, (draft) => {
    draft.request.error = null;
    draft.request.isPasswordUpdated = payload.isSuccess;
    draft.request.loading = false;

    return draft;
  });

const updatePasswordFailure = (
  state = initialState,
  { payload }: ActionType<typeof Actions.updatePasswordActions.failure>
) =>
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = payload.message;

    return draft;
  });

export default createReducer<typeof initialState, ActionType<typeof Actions>>(
  initialState
)
  .handleAction(Actions.userActions.request, fetchUserRequest)
  .handleAction(Actions.userActions.success, fetchUserSuccess)
  .handleAction(Actions.userActions.failure, fetchUserFailure)
  .handleAction(Actions.signUpUserActions.request, signUpUserRequest)
  .handleAction(Actions.signUpUserActions.success, signUpUserSuccess)
  .handleAction(Actions.signUpUserActions.failure, signUpUserFailure)
  .handleAction(Actions.verifyUserActions.request, verifyUserRequest)
  .handleAction(Actions.verifyUserActions.success, verifyUserSuccess)
  .handleAction(Actions.verifyUserActions.failure, verifyUserFailure)
  .handleAction(Actions.editUserActions.request, editUserRequest)
  .handleAction(Actions.editUserActions.success, editUserSuccess)
  .handleAction(Actions.editUserActions.failure, editUserFailure)
  .handleAction(Actions.deleteUserActions.request, deleteUserRequest)
  .handleAction(Actions.deleteUserActions.success, deleteUserSuccess)
  .handleAction(Actions.deleteUserActions.failure, deleteUserFailure)
  .handleAction(Actions.updatePasswordActions.request, updatePasswordRequest)
  .handleAction(Actions.updatePasswordActions.success, updatePasswordSuccess)
  .handleAction(Actions.updatePasswordActions.failure, updatePasswordFailure)
  .handleAction(Actions.logoutUser, logoutUserRequest);
  