import * as fetchBusinesses from "./fetchBusinesses";
import * as business from "./business";
import { initialState as fetchBusinessInitialState, FetchBusinessState } from "./fetchBusinesses";
import { initialState as businessInitialState, BusinessState } from "./business";
import reduceReducers from "reduce-reducers";


export const Types = {
    ...fetchBusinesses.Types,
    ...business.Types
};

export const Actions = {
    fetch: fetchBusinesses.Actions,
    business: business.Actions
};

export const fetchBusinessesReducer = reduceReducers<FetchBusinessState>(
    fetchBusinessInitialState,
    fetchBusinesses.default as any
);

export const addBusinessReducer = reduceReducers<BusinessState>(
    businessInitialState,
    business.default as any
);

export default {
    fetchBusinesses: fetchBusinessesReducer,
    addBusiness: addBusinessReducer
};