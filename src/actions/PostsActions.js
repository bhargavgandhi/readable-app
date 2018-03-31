import * as actions from './Constants';
import * as ReadableAPI from '../utils';

// Load / Get Posts
export const loadPosts = post => ({
  type: actions.LOAD_POSTS,
  id: post.id,
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
    .then(() => dispatch(getPosts()))
);


// UPDATE POST
export const EditPost = id => ({
  type: actions.UPDATE_POST,
  id,
});

export const UpdatePost = id => dispatch => (
  ReadableAPI
    .updatePost(id)
    .then(data => dispatch(EditPost(data)))
    .then(() => dispatch(getPosts()))
);


// Delete or Remove POST
export const DeletePost = post => ({
  type: actions.DELETE_POST,
  post,
});

export const removePost = post => dispatch => (
  ReadableAPI
    .removePost(post.id)
    .then(dispatch(DeletePost(post)))
);


// export default {
//   getPosts,
//   addNewPost,
//   UpdatePost,
//   RemovePost,
// };
