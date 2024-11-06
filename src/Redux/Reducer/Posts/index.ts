import * as posts from "./posts";
import { initialState, PostsState } from "./posts";
import reduceReducers from "reduce-reducers";


export const Types = {
    ...posts.Types
};

export const Actions = {
    ...posts.Actions
};

export default reduceReducers<PostsState>(
    initialState,
    posts.default as any
);