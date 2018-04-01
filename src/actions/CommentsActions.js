import * as actions from './Constants';
import * as ReadableAPI from '../utils';

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

export const addNewComment = (comment, parentId) => dispatch => (
  ReadableAPI
    .addNewComment(comment)
    .then(data => dispatch(SubmitComment(data)))
    .then(() => dispatch(getComments(parentId)))
);

// UPDATE POST
export const EditComment = comment => ({
  type: actions.UPDATE_COMMENT,
  comment,
});

export const updateComment = comment => dispatch => (
  ReadableAPI
    .updateComment(comment)
    .then(data => dispatch(EditComment(data)))
);

// Delete Comment
export const DeleteComment = comment => ({
  type: actions.DELETE_COMMENT,
  comment,
});

export const removeComment = (comment, parentId) => dispatch => (
  ReadableAPI
    .removeComment(comment.id)
    .then(dispatch(DeleteComment(comment)))
    .then(() => dispatch(getComments(parentId)))
);

// Update Comments Vote
const changeCommentVote = comment => ({
  type: actions.UPDATE_COMMENT_VOTE,
  comment,
});

export const updateCommentVote = (id, option) => dispatch => (
  ReadableAPI
    .updateVote(id, option, 'comments')
    .then(data => dispatch(changeCommentVote(data)))
);

// export default {
//   getComments,
//   addNewComment,
// };
