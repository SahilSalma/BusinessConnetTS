import * as review from "./review";
import { initialState, ReviewsState } from "./review";
import reduceReducers from "reduce-reducers";


export const Types = {
    ...review.Types,
};

export const Actions = {
    ...review.Actions,
};

export default reduceReducers<ReviewsState>(
    initialState,
    review.default as any
);
