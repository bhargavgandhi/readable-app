import * as actions from '../actions/Constants';

const comments = (state = [], action) => {
  const { data, comment } = action;

  switch (action.type) {
    case actions.LOAD_COMMENTS:
      return data;
    case actions.ADD_COMMENT:
      return [
        ...state,
        comment,
      ];
    case actions.DELETE_COMMENT:
      return state.filter(c => c.id !== comment.id);
    default:
      return state;
  }
};

export default comments;
