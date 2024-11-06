import produce from "immer";
import { createAsyncAction, createAction } from "typesafe-actions";
import { ActionType, createReducer } from "typesafe-actions";
import { PostsInfoState, Post, Comment } from "../../../Types/allTypes";

export enum Types {
  RESET_POSTS_REQUEST = "RESET_POSTS_REQUEST",
  GET_POSTS_REQUEST = "GET_POSTS_REQUEST",
  GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS",
  GET_POSTS_FAILURE = "GET_POSTS_FAILURE",
  ADD_POST_REQUEST = "ADD_POST_REQUEST",
  ADD_POST_SUCCESS = "ADD_POST_SUCCESS",
  ADD_POST_FAILURE = "ADD_POST_FAILURE",
  DELETE_POST_REQUEST = "DELETE_POST_REQUEST",
  DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS",
  DELETE_POST_FAILURE = "DELETE_POST_FAILURE",
  LIKE_POST_REQUEST = "LIKE_POST_REQUEST",
  LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS",
  LIKE_POST_FAILURE = "LIKE_POST_FAILURE",
  UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST",
  UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS",
  UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE",
  COMMENT_POST_REQUEST = "COMMENT_POST_REQUEST",
  COMMENT_POST_SUCCESS = "COMMENT_POST_SUCCESS",
  COMMENT_POST_FAILURE = "COMMENT_POST_FAILURE",
  COMMENT_DELETE_REQUEST = "COMMENT_DELETE_REQUEST",
  COMMENT_DELETE_SUCCESS = "COMMENT_DELETE_SUCCESS",
  COMMENT_DELETE_FAILURE = "COMMENT_DELETE_FAILURE",
}

const getPostActions = createAsyncAction(
  Types.GET_POSTS_REQUEST,
  Types.GET_POSTS_SUCCESS,
  Types.GET_POSTS_FAILURE,
)
<
  { businessId?: string, page?: string },
  { posts: Post[]},
  { message: string }
>();

const addPostActions = createAsyncAction(
  Types.ADD_POST_REQUEST,
  Types.ADD_POST_SUCCESS,
  Types.ADD_POST_FAILURE,
)
<
  { post: Post },
  { post: Post },
  { message: string }
>();

const deletePostActions = createAsyncAction(
  Types.DELETE_POST_REQUEST,
  Types.DELETE_POST_SUCCESS,
  Types.DELETE_POST_FAILURE,
)
<
  { postId: string, businessId: string },
  { postId: string },
  { message: string }
>();

const likePostActions = createAsyncAction(
  Types.LIKE_POST_REQUEST,
  Types.LIKE_POST_SUCCESS,
  Types.LIKE_POST_FAILURE,
)
<
  { postId: string, userId: string },
  { postId: string, like: string },
  { message: string }
>();

const unlikePostActions = createAsyncAction(
  Types.UNLIKE_POST_REQUEST,
  Types.UNLIKE_POST_SUCCESS,
  Types.UNLIKE_POST_FAILURE,
)
<
  { postId: string, userId: string },
  { postId: string, like: string },
  { message: string }
>();

const commentPostActions = createAsyncAction(
  Types.COMMENT_POST_REQUEST,
  Types.COMMENT_POST_SUCCESS,
  Types.COMMENT_POST_FAILURE,
)
<
  { postId: string, content: string, userId: string },
  { postId: string, comment: Comment },
  { message: string }
>();

const commentDeleteActions = createAsyncAction(
  Types.COMMENT_DELETE_REQUEST,
  Types.COMMENT_DELETE_SUCCESS,
  Types.COMMENT_DELETE_FAILURE,
)
<
  { postId: string, commentId: string },
  { postId: string, commentId: string },
  { message: string }
>();

export const resetGetPostsRequestAction = createAction(Types.RESET_POSTS_REQUEST)();

export const Actions = { resetGetPostsRequestAction, getPostActions, addPostActions, deletePostActions, likePostActions, unlikePostActions, commentPostActions, commentDeleteActions };

export const initialState: PostsInfoState = {
  request: {
    loading: false,
    error: null as string | null,
    data: null
  }
};

export type PostsState = typeof initialState;

const requestGetPostsRequest = () => (
  produce(initialState, (draft) => {
    draft.request.error = null;
    draft.request.data = null;
    return draft;
  }
));

const getPostsRequest = (state = initialState) =>
  produce(state, (draft) => {
    draft.request.loading = true;
    draft.request.error = null;

    return draft;
  });

const getPostsSuccess = (
  state = initialState,
  { payload: { posts } }: ActionType<typeof Actions.getPostActions.success>
) =>
  produce(state, (draft) => {
    draft.request.error = null;
    draft.request.data = state.request.data 
      ? [...state.request.data, ...posts.filter(post => !state.request.data!.some(existingPost => existingPost._id === post._id))]
      : posts;
    if (draft.request.data) {
      draft.request.loading = false;
    }

    return draft;
  });

const getPostsFailure = (
  state = initialState,
  { payload }: ActionType<typeof Actions.getPostActions.failure>
) =>
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = payload.message;

    return draft;
  });

const addPostRequest = (state = initialState) =>
  produce(state, (draft) => {
    draft.request.loading = true;
    draft.request.error = null;

    return draft;
  });

const addPostSuccess = (state = initialState,
  { payload: { post } }: ActionType<typeof Actions.addPostActions.success>
) =>
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = null;
    draft.request.data = state.request.data ? [post, ...state.request.data] : [post];

    return draft;
  });

const addPostFailure = (
  state = initialState,
  { payload }: ActionType<typeof Actions.addPostActions.failure>
) =>
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = payload.message;

    return draft;
  });

const deletePostRequest = (state = initialState) =>
  produce(state, (draft) => {
    draft.request.loading = true;
    draft.request.error = null;

    return draft;
  });

const deletePostSuccess = (state = initialState,
  { payload: { postId } }: ActionType<typeof Actions.deletePostActions.success>
) =>
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = null;
    draft.request.data = state.request.data!.filter((p) => p._id !== postId);

    return draft;
  });

const deletePostFailure = (
  state = initialState,
  { payload }: ActionType<typeof Actions.deletePostActions.failure>
) =>
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = payload.message;

    return draft;
  });

const likePostRequest = (state = initialState) =>
  produce(state, (draft) => {
    draft.request.loading = true;
    draft.request.error = null;

    return draft;
  });

const likePostSuccess = (state = initialState,
  { payload: { postId, like } }: ActionType<typeof Actions.likePostActions.success>
) =>
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = null;
    draft.request.data = state.request.data!.map((p) => {
      if (p._id === postId) {
        return {
          ...p,
          likes: p.likes ? [...p.likes, like] : [like]
        }
      }
      return p;
    });

    return draft;
  });

const likePostFailure = (
  state = initialState,
  { payload }: ActionType<typeof Actions.likePostActions.failure>
) =>
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = payload.message;

    return draft;
  });

const unlikePostRequest = (state = initialState) =>
  produce(state, (draft) => {
    draft.request.loading = true;
    draft.request.error = null;

    return draft;
  });

const unlikePostSuccess = (state = initialState, 
  { payload: { postId, like } }: ActionType<typeof Actions.unlikePostActions.success>
) => 
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = null;
    
    draft.request.data = draft.request.data!.map((p) => {
      if (p._id === postId) {
        return {
          ...p,
          likes: p.likes ? p.likes.filter((l) => l !== like) : [],
        };
      }
      return p;
    });
  });
  

const unlikePostFailure = (
  state = initialState,
  { payload }: ActionType<typeof Actions.unlikePostActions.failure>
) =>
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = payload.message;

    return draft;
  });

const commentPostRequest = (state = initialState) =>
  produce(state, (draft) => {
    draft.request.loading = true;
    draft.request.error = null;

    return draft;
  });

const commentPostSuccess = (state = initialState,
  { payload: { postId, comment } }: ActionType<typeof Actions.commentPostActions.success>
) =>
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = null;
    draft.request.data = state.request.data!.map((p) => {
      if (p._id === postId) {
        return {
          ...p,
          comments: p.comments ? [comment, ...p.comments] : [comment]
        };
      }
      return p;
    });
    return draft;
  }
);

const commentPostFailure = (
  state = initialState,
  { payload }: ActionType<typeof Actions.commentPostActions.failure>
) =>
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = payload.message;

    return draft;
  });

const commentDeleteRequest = (state = initialState) =>
  produce(state, (draft) => {
    draft.request.loading = true;
    draft.request.error = null;

    return draft;
  });

const commentDeleteSuccess = (state = initialState,
  { payload: { postId, commentId } }: ActionType<typeof Actions.commentDeleteActions.success>
) =>
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = null;
    draft.request.data = state.request.data!.map((p) => {
      if (p._id === postId) {
        return {
          ...p,
          comments: p.comments?.filter((c) => c._id !== commentId)
        };
      }
      return p;
    });

    return draft;
  });

const commentDeleteFailure = (
  state = initialState,
  { payload }: ActionType<typeof Actions.commentDeleteActions.failure>
) =>
  produce(state, (draft) => {
    draft.request.loading = false;
    draft.request.error = payload.message;

    return draft;
  });


export default createReducer<typeof initialState, ActionType<typeof Actions>>(
  initialState
)
  .handleAction(Actions.resetGetPostsRequestAction, requestGetPostsRequest)
  .handleAction(Actions.getPostActions.request, getPostsRequest)
  .handleAction(Actions.getPostActions.success, getPostsSuccess)
  .handleAction(Actions.getPostActions.failure, getPostsFailure)
  .handleAction(Actions.addPostActions.request, addPostRequest)
  .handleAction(Actions.addPostActions.success, addPostSuccess)
  .handleAction(Actions.addPostActions.failure, addPostFailure)
  .handleAction(Actions.deletePostActions.request, deletePostRequest)
  .handleAction(Actions.deletePostActions.success, deletePostSuccess)
  .handleAction(Actions.deletePostActions.failure, deletePostFailure)
  .handleAction(Actions.likePostActions.request, likePostRequest)
  .handleAction(Actions.likePostActions.success, likePostSuccess)
  .handleAction(Actions.likePostActions.failure, likePostFailure)
  .handleAction(Actions.unlikePostActions.request, unlikePostRequest)
  .handleAction(Actions.unlikePostActions.success, unlikePostSuccess)
  .handleAction(Actions.unlikePostActions.failure, unlikePostFailure)
  .handleAction(Actions.commentPostActions.request, commentPostRequest)
  .handleAction(Actions.commentPostActions.success, commentPostSuccess)
  .handleAction(Actions.commentPostActions.failure, commentPostFailure)
  .handleAction(Actions.commentDeleteActions.request, commentDeleteRequest)
  .handleAction(Actions.commentDeleteActions.success, commentDeleteSuccess)
  .handleAction(Actions.commentDeleteActions.failure, commentDeleteFailure);
  