import { combineReducers } from 'redux';
import UserReducer from './user_reducer';
import ErrorReducer from './error_reducer';
import PostReducer from './post_reducer';

const rootReducer = combineReducers({
  user: UserReducer,
  post: PostReducer,
  errors: ErrorReducer
});

export default rootReducer;