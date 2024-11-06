import { put, delay, takeLatest } from "@redux-saga/core/effects";
import { addComment, addPost, deleteComment, deletePost, getPosts, likePost, unlikePost } from "../../../Utils/BackendAPICalls";
import { Actions, Types } from "../../Reducer/rootReducer";
import { Post } from "../../../Types/allTypes";

interface getPostsRequestAction {
    payload: {
        businessId?: string;
        page?: string;
    };
}

interface addPostRequestAction {
    payload: {
        post: Post;
    };
}

interface deletePostRequestAction {
    payload: {
        postId: string;
        businessId: string;
    };
}

interface likePostRequestAction {
    payload: {
        postId: string;
        userId: string;
    };
}

interface commentPostAction {
    payload: {
        postId: string;
        content: string;
        userId: string;
    };
}

interface commentDeleteAction {
    payload: {
        postId: string;
        commentId: string;
    };
}

export function* getPostsRequest(action: getPostsRequestAction ): Generator<any, void, Response> {
    const { businessId, page } = action.payload;
    try {
        yield delay(100);
        const response: any = yield getPosts({businessId, page});

        if (!response) {
            yield put(Actions.posts.getPostActions.failure({message: "No data found"}));
        } 
        if (response) {
            yield put(
              Actions.posts.getPostActions.success({
                    posts: response,
              })
            );
        }
    } catch (err) {
        const error = { message: "Something went wrong." };
        yield put(Actions.posts.getPostActions.failure(error));
    }
}

export function* addPostRequest(action: addPostRequestAction): Generator<any, void, Response> {
    const { post } = action.payload;
    console.log("post", post);
    try {
        yield delay(100);
        const response: any = yield addPost({...post});

        if (!response) {
            yield put(Actions.posts.addPostActions.failure({message: "No data found"}));
        } 
        if (response) {
            yield put(
              Actions.posts.addPostActions.success({
                post: response,
              })
            );
        }
    } catch (err) {
        const error = { message: "Something went wrong." };
        yield put(Actions.posts.addPostActions.failure(error));
    }
}

export function* deletePostRequest(action: deletePostRequestAction): Generator<any, void, Response> {
    const { postId, businessId } = action.payload;
    try {
        yield delay(100);
        const response: any = yield deletePost({postId, businessId});

        if (!response) {
            yield put(Actions.posts.deletePostActions.failure({message: "No data found"}));
        } 
        if (response) {
            yield put(
              Actions.posts.deletePostActions.success({
                postId,
              })
            );
        }
    } catch (err) {
        const error = { message: "Something went wrong." };
        yield put(Actions.posts.deletePostActions.failure(error));
    }
}

export function* likePostRequest(action: likePostRequestAction): Generator<any, void, Response> {
    const { postId, userId } = action.payload;
    try {
        const response: any = yield likePost({postId, userId});

        if (!response) {
            yield put(Actions.posts.likePostActions.failure({message: "No data found"}));
        } 
        if (response) {
            yield put(
              Actions.posts.likePostActions.success({
                postId,
                like: response.userId,
              })
            );
        }
    } catch (err) {
        const error = { message: "Something went wrong." };
        yield put(Actions.posts.likePostActions.failure(error));
    }
}

export function* unlikePostRequest(action: likePostRequestAction ): Generator<any, void, Response> {
    const { postId, userId } = action.payload;
    try {
        const response: any = yield unlikePost({postId, userId});

        if (!response) {
            yield put(Actions.posts.unlikePostActions.failure({message: "No data found"}));
        } 
        if (response) {
            yield put(
              Actions.posts.unlikePostActions.success({
                postId,
                like: response,
              })
            );
        }
    } catch (err) {
        const error = { message: "Something went wrong." };
        yield put(Actions.posts.unlikePostActions.failure(error));
    }
}

export function* commentPostRequest(action: commentPostAction ): Generator<any, void, Response> {
    const { postId, content, userId } = action.payload;
    try {
        const response: any = yield addComment({postId, content, userId});

        if (!response) {
            yield put(Actions.posts.commentPostActions.failure({message: "No data found"}));
        } 
        if (response) {
            yield put(
              Actions.posts.commentPostActions.success({
                postId,
                comment: response,
              })
            );
        }
    } catch (err) {
        const error = { message: "Something went wrong." };
        yield put(Actions.posts.commentPostActions.failure(error));
    }
}

export function* commentDeleteRequest(action: commentDeleteAction ): Generator<any, void, Response> {
    const { postId, commentId } = action.payload;
    try {
        const response: any = yield deleteComment({postId, commentId});

        if (!response) {
            yield put(Actions.posts.commentDeleteActions.failure({message: "No data found"}));
        } 
        if (response) {
            yield put(
              Actions.posts.commentDeleteActions.success({
                postId,
                commentId,
              })
            );
        }
    } catch (err) {
        const error = { message: "Something went wrong." };
        yield put(Actions.posts.commentDeleteActions.failure(error));
    }
}

export default function* postsSaga() {
    yield takeLatest(Types.GET_POSTS_REQUEST as any, getPostsRequest);
    yield takeLatest(Types.ADD_POST_REQUEST as any, addPostRequest);
    yield takeLatest(Types.DELETE_POST_REQUEST as any, deletePostRequest);
    yield takeLatest(Types.LIKE_POST_REQUEST as any, likePostRequest);
    yield takeLatest(Types.UNLIKE_POST_REQUEST as any, unlikePostRequest);
    yield takeLatest(Types.COMMENT_POST_REQUEST as any, commentPostRequest);
    yield takeLatest(Types.COMMENT_DELETE_REQUEST as any, commentDeleteRequest);
}
