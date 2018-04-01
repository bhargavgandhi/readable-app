import * as actions from './Constants';
import * as ReadableAPI from '../utils';

// Load / Get Posts
export const loadPosts = post => ({
  type: actions.LOAD_POSTS,
  id: post.id,
  post,
});

export const getPosts = filter => dispatch => (
  ReadableAPI
    .getPosts(filter)
    .then(posts => dispatch(loadPosts(posts)))
);


// Load Single Posts
export const loadSinglePost = post => ({
  type: actions.LOAD_SINGLE_POST,
  post,
});

export const getSinglePost = id => dispatch => (
  ReadableAPI
    .getSinglePost(id)
    .then(post => dispatch(loadSinglePost(post)))
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
export const EditPost = post => ({
  type: actions.UPDATE_POST,
  post,
});

export const updatePost = post => dispatch => (
  ReadableAPI
    .updatePost(post)
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


const changePostVote = post => ({
  type: actions.UPDATE_POST_VOTE,
  post,
});

export const updatePostVote = (id, option) => dispatch => (
  ReadableAPI
    .updateVote(id, option, 'posts')
    .then(data => dispatch(changePostVote(data)))
);


// export default {
//   getPosts,
//   addNewPost,
//   UpdatePost,
//   RemovePost,
// };
