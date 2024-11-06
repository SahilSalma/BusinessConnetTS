import * as fetchCategory from "./fetchCategory";
import { initialState, FetchCategoryState } from "./fetchCategory";
import reduceReducers from "reduce-reducers";


export const Types = {
    ...fetchCategory.Types
};

export const Actions = {
    fetch: fetchCategory.Actions
};

export default reduceReducers<FetchCategoryState>(
    initialState,
    fetchCategory.default as any
);
