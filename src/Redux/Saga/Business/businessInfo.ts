import { put, delay, takeLatest } from "@redux-saga/core/effects";
import { addBusiness, editBusiness, getFilteredBusinesses } from "../../../Utils/BackendAPICalls";
import { Actions, Types } from "../../Reducer/rootReducer";
import { Business } from "../../../Types/allTypes";

interface fetchBusinessRequestAction {
    payload: {
        searchValue?: string[];
        userListing?: string;
        showUnApprovedListings?: false;
    };
}

interface BusinessRequestAction {
    payload: {
        businessData: Business;
    };
}

export function* fetchBusinessRequest(action: fetchBusinessRequestAction ): Generator<any, void, Response> {
    const { searchValue, userListing, showUnApprovedListings } = action.payload;
    try {
        yield delay(100);
        const response: any = yield getFilteredBusinesses({
            searchValue,
            userListing,
            showUnApprovedListings,
        });

        if (!response) {
            yield put(Actions.business.fetch.businessActions.failure({message: "No data found"}));
        } 
        if (response) {
            yield put(
              Actions.business.fetch.businessActions.success({
                    businesses: response,
              })
            );
        }
    } catch (err) {
        const error = { message: "Something went wrong." };
        yield put(Actions.business.fetch.businessActions.failure(error));
    }
}

export function* addBusinessRequest(action: BusinessRequestAction): Generator<any, void, Response> {
    const { businessData } = action.payload;
    try {
        yield delay(100);
        const response: any = yield addBusiness(businessData);
        if (!response || response?.error) {
            yield put(Actions.business.business.addBusinessActions.failure({message: response.error}));
        }
        yield put(Actions.business.business.addBusinessActions.success());
    } catch (err) {
        const error = { message: "fatalFailure" };
        yield put(Actions.business.business.addBusinessActions.failure(error));
    }
}

export function* editBusinessRequest(action: BusinessRequestAction): Generator<any, void, Response> {
    const { businessData } = action.payload;
    try {
        yield delay(100);
        const response: any = yield editBusiness(businessData);
        if (!response) {
            yield put(Actions.business.business.editBusinessActions.failure({message: response.error}));
        }
        yield put(Actions.business.business.editBusinessActions.success());
    } catch (err) {
        const error = { message: "fatalFailure" };
        yield put(Actions.business.business.editBusinessActions.failure(error));
    }
}

export default function* businessSaga() {
    yield takeLatest(Types.FETCH_BUSINESS_REQUEST as any, fetchBusinessRequest);
    yield takeLatest(Types.ADD_BUSINESS_REQUEST as any, addBusinessRequest);
    yield takeLatest(Types.EDIT_BUSINESS_REQUEST as any, editBusinessRequest);
}
