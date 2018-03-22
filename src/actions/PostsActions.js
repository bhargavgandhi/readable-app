import * as actions from './Constants';
import * as ReadableAPI from '../utils';

export const loadPosts = (posts) => ({
    type: actions.LOAD_POSTS,
    posts
});

export const getPosts = () => (dispatch) => (
  ReadableAPI
    .getPosts()
    .then((posts) => dispatch(loadPosts(posts)))
);
