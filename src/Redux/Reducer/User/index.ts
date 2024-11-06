import * as fetchUser from "./fetchData";
import { initialState, FetchUserState } from "./fetchData";
import reduceReducers from "reduce-reducers";


export const Types = {
    ...fetchUser.Types
    
};

export const Actions = {
    fetch: fetchUser.Actions
};

export default reduceReducers<FetchUserState>(
    initialState,
    fetchUser.default as any
);
