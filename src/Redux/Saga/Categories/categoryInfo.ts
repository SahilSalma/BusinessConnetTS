import { put, delay, takeLatest } from "@redux-saga/core/effects";
import { getCategories } from "../../../Utils/BackendAPICalls";
import { Actions, Types } from "../../Reducer/rootReducer";


export function* fetchCategoriesRequest(): Generator<any, void, Response> {
    try {
        const response: any = yield getCategories();

        if (!response) {
            yield put(Actions.category.fetch.categoryActions.failure({message: "No data found"}));
        } 
        if (response) {
            yield put(
              Actions.category.fetch.categoryActions.success({
                    categories: response,
              })
            );
        }
    } catch (err) {
        const error = { message: "Something went wrong." };
        yield put(Actions.category.fetch.categoryActions.failure(error));
    }
  
}

export function* detailedCategoriesRequest(): Generator<any, void, Response> {

}

export default function* categoriesSaga() {
    yield takeLatest(Types.FETCH_CATEGORIES_REQUEST as any, fetchCategoriesRequest);
}
