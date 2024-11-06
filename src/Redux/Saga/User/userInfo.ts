import { put, delay, takeLatest } from "@redux-saga/core/effects";
import { Actions, Types } from "../../Reducer/User";
import { User } from "../../../Types/allTypes";
import { editUser, userDeleteAccount, userSignIn, userSignUp, userUpdatePassword, verifyToken } from "../../../Utils/BackendAPICalls";


  interface UserCredentials {
    email: string;
    password: string;
  }
  
  interface FetchActiveUserAction {
    payload: UserCredentials;
  }

  interface EditActiveUserAction {
    payload: {
      user: User;
    };
  }

  interface DeleteActiveUserAction {
    payload: {
      token: string;
      password: string;
    };
  }

  interface UpdatePasswordActiveUserAction {
    payload: {
      token: string;
      currentPassword: string;
      newPassword: string;
    };
  }

  interface Response {
    user: User;
    token: string;
    error: string;
    isSuccess: boolean;
  }

export function* loginUserRequest(action: FetchActiveUserAction): Generator<any, void, Response> {
    const { email, password } = action.payload;   

    try {
        yield delay(100);

        const response = yield userSignIn({email, password});

        if (!response || response.error) {
            const error = { message: response.error };
            yield put(Actions.fetch.userActions.failure(error));
        } 
        if (response && response.token) {
            localStorage.setItem('token', response.token);
            yield put(
              Actions.fetch.userActions.success({
                  token: response.token,
              })
            );
        } else {
          yield put(Actions.fetch.userActions.failure({message: response.error}));
        }
        
    } catch (err) {
        const error = { message: "fatalFailure" };
        yield put(Actions.fetch.userActions.failure(error));
    }
  
}

export function* signUpUserRequest(action: {payload: {email: string, password: string, firstName: string, lastName: string}}): Generator<any, void, Response> {
  const { email, password, firstName, lastName } = action.payload;   

  try {
      yield delay(100);

      const response = yield userSignUp({email, password, firstName, lastName});

      if (!response || response.error) {
          const error = { message: response.error };
          yield put(Actions.fetch.signUpUserActions.failure(error));
      } 
      if (response && response.token) {
          localStorage.setItem('token', response.token);
          yield put(
            Actions.fetch.signUpUserActions.success({
                token: response.token,
            })
          );
      } else {
        yield put(Actions.fetch.signUpUserActions.failure({message: response.error}));
      }
      
  } catch (err) {
      const error = { message: "fatalFailure" };
      yield put(Actions.fetch.signUpUserActions.failure(error));
  }
}

export function* verifyUserRequest(action: {payload: {token: string}}): Generator<any, void, Response> {
  const { token } = action.payload;   

  try {
      yield delay(100);

      if (token) {
          const response = yield verifyToken(token);
          if (!response) {
              Actions.fetch.verifyUserActions.failure({message: "Invalid Token"});
              localStorage.removeItem('token');
              throw new Error("Invalid Token");
          } 
          yield put(
            Actions.fetch.verifyUserActions.success({
                user: response?.user,
            })
          );
}
      
  } catch (err) {
      const error = { message: "Something went wrong." };
      yield put(Actions.fetch.verifyUserActions.failure(error));
  }

}

export function* editUserRequest(action: EditActiveUserAction ): Generator<any, void, Response> {
  const { user } = action.payload;
    try {
        const token = localStorage.getItem('token');
        yield delay(100);
        if (!token) {
            yield put(Actions.fetch.editUserActions.failure({message: "No token found"}));
            throw new Error("No token found");
        }
        const response = yield editUser({token, user});

        if (!response || response.error) {
            const error = { message: response.error };
            yield put(Actions.fetch.editUserActions.failure(error));
        }

        if (response && response.isSuccess) {
            yield put(
              Actions.fetch.editUserActions.success({
                  isSuccess: response.isSuccess,
                  user: response.user,
              })
            );
        } else {
          yield put(Actions.fetch.editUserActions.failure({message: response.error}));
        }

    } catch (err) {
        const error = { message: "fatalFailure" };
        yield put(Actions.fetch.userActions.failure(error));
    }
}

export function* deleteUserRequest(action: DeleteActiveUserAction): Generator<any, void, Response> {
  const { password } = action.payload;   

  try {
      yield delay(100);
      const token = localStorage.getItem('token');
      if (!token) {
          yield put(Actions.fetch.deleteUserActions.failure({message: "No token found"}));
          throw new Error("No token found");
      }
      const response = yield userDeleteAccount(token, password);

      if (!response || response.error) {
          const error = { message: response.error };
          yield put(Actions.fetch.deleteUserActions.failure(error));
      }

      if (response && response.isSuccess) {
          yield put(
            Actions.fetch.deleteUserActions.success({
                isSuccess: response.isSuccess,
            })
          );
      } else {
        yield put(Actions.fetch.deleteUserActions.failure({message: response.error}));
      }
      
  } catch (err) {
      const error = { message: "Something went wrong." };
      yield put(Actions.fetch.deleteUserActions.failure(error));
  }
}

export function* updatePasswordRequest(action: UpdatePasswordActiveUserAction): Generator<any, void, Response> {
  const { currentPassword, newPassword } = action.payload;   

  try {
      yield delay(100);
      const token = localStorage.getItem('token');
      if (!token) {
          yield put(Actions.fetch.updatePasswordActions.failure({message: "No token found"}));
          throw new Error("No token found");
      }
      const response = yield userUpdatePassword(token, currentPassword, newPassword);

      if (!response || response.error) {
          const error = { message: response.error };
          yield put(Actions.fetch.updatePasswordActions.failure(error));
      }

      if (response && response.isSuccess) {
          yield put(
            Actions.fetch.updatePasswordActions.success({
                isSuccess: response.isSuccess,
            })
          );
      } else {
        yield put(Actions.fetch.updatePasswordActions.failure({message: response.error}));
      }
      
  } catch (err) {
      const error = { message: "Something went wrong." };
      yield put(Actions.fetch.updatePasswordActions.failure(error));
  }
}



export default function* userSaga() {
    yield takeLatest(Types.FETCH_USER_REQUEST as any, loginUserRequest);
    yield takeLatest(Types.SIGN_UP_USER_REQUEST as any, signUpUserRequest);
    yield takeLatest(Types.VERIFY_USER_REQUEST as any, verifyUserRequest);
    yield takeLatest(Types.EDIT_USER_REQUEST as any, editUserRequest);
    yield takeLatest(Types.DELETE_USER_REQUEST as any, deleteUserRequest);
    yield takeLatest(Types.UPDATE_PASSWORD_REQUEST as any, updatePasswordRequest);
}
