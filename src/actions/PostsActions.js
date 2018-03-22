import * as actions from './Constants';
import * as ReadableAPI from '../utils';

export const loadPosts = post => ({
  type: actions.LOAD_POSTS,
  post,
});

export const getPosts = () => dispatch => (
  ReadableAPI
    .getPosts()
    .then(posts => dispatch(loadPosts(posts)))
);

// Add Post
export const SubmitPost = post => ({
  type: actions.ADD_POST,
  post,
});

export const addNewPost = post => dispatch => (
  ReadableAPI
    .addPost(post)
    .then(data => dispatch(SubmitPost(data)))
);

export default {
  getPosts,
  addNewPost,
};
