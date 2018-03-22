import { combineReducers } from 'redux';
import categories from '../reducers/categories';
import posts from '../reducers/posts';

const rootReducer = combineReducers({
  categories,
  posts
});

export default rootReducer;
