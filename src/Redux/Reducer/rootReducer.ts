import { combineReducers } from 'redux';
import * as user from './User';
import * as category from './Category';
import * as business from './Business';
import * as posts from './Posts';
import * as reviews from './Reviews';
import * as notifications from './Notification';

export const Types = {
    ...user.Types,
    ...category.Types,
    ...business.Types,
    ...posts.Types,
    ...reviews.Types,
    ...notifications.Types,
  };
  
  export const Actions = {
    user: user.Actions,
    category: category.Actions,
    business: business.Actions,
    posts: posts.Actions,
    reviews: reviews.Actions,
    notifications: notifications.Actions,
  };

const rootReducer = combineReducers({
  user: user.default,
  category: category.default,
  addBusiness: business.addBusinessReducer,
  fetchBusinesses: business.fetchBusinessesReducer,
  posts: posts.default,
  reviews: reviews.default,
  notifications: notifications.default,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
