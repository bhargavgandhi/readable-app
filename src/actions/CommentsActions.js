import * as actions from './Constants';
import * as ReadableAPI from '../utils';
import { getPosts } from '../actions/PostsActions';

const loadComments = data => ({
  type: actions.LOAD_COMMENTS,
  data,
});

export const getComments = id => dispatch => (
  ReadableAPI
    .getComments(id)
    .then(comments => dispatch(loadComments(comments)))
);
// Add Post
export const SubmitComment = comment => ({
  type: actions.ADD_COMMENT,
  comment,
});

export const addNewComment = comment => dispatch => (
  ReadableAPI
    .addNewComment(comment)
    .then(data => dispatch(SubmitComment(data)))
    .then(() => dispatch(getPosts()))
);

// Delete Comment
export const DeleteComment = comment => ({
  type: actions.DELETE_COMMENT,
  comment,
});

export const removeComment = comment => dispatch => (
  ReadableAPI
    .removeComment(comment.id)
    .then(dispatch(DeleteComment(comment)))
    .then(() => dispatch(getPosts()))
);

// export default {
//   getComments,
//   addNewComment,
// };
