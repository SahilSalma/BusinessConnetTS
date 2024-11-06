import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./Reducer/rootReducer";

export const user = createSelector(
    (state: RootState) => state.user.request.data,
    (data) => data
);

export const userError = createSelector(
    (state: RootState) => state.user.request.error,
    (error) => error
);

export const userEditSuccess = createSelector(
    (state: RootState) => state.user.request.editSuccess,
    (success) => success
);

export const userToken = createSelector(
    (state: RootState) => state.user.request.token,
    (data) => data
);
export const userIsLoading = createSelector(
    (state: RootState) => state.user.request.loading,
    (loading) => loading
);

export const categories = createSelector(
    (state: RootState) => state.category.request.data,
    (data) => data
);

export const categoriesLoading = createSelector(
    (state: RootState) => state.category.request.loading,
    (loading) => loading
);

export const businesses = createSelector(
    (state: RootState) => state.fetchBusinesses.request.data,
    (data) => data
);

export const businessesLoading = createSelector(
    (state: RootState) => state.fetchBusinesses.request.loading,
    (loading) => loading
);

export const addBusiness = createSelector(
    (state: RootState) => state.addBusiness.request.success,
    (data) => data
);

export const addBusinessLoading = createSelector(
    (state: RootState) => state.addBusiness.request.loading,
    (loading) => loading
);

export const posts = createSelector(
    (state: RootState) => state.posts.request.data,
    (data) => data
);

export const postsLoading = createSelector(
    (state: RootState) => state.posts.request.loading,
    (loading) => loading
);

export const reviews = createSelector(
    (state: RootState) => state.reviews.request.data,
    (data) => data
);

export const reviewsLoading = createSelector(
    (state: RootState) => state.reviews.request.loading,
    (loading) => loading
);

export const notifications = createSelector(
    (state: RootState) => state.notifications.request.data,
    (data) => data
);

export const notificationsLoading = createSelector(
    (state: RootState) => state.notifications.request.loading,
    (loading) => loading
);

export const notificationsError = createSelector(
    (state: RootState) => state.notifications.request.error,
    (error) => error
);
