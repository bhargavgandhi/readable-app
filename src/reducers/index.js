import { combineReducers } from 'redux';
import categories from '../reducers/categories';
import posts from '../reducers/posts';
import comments from '../reducers/comments';

const rootReducer = combineReducers({
  categories,
  posts,
  comments,
});

export default rootReducer;
