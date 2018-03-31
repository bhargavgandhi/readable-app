import * as actions from '../actions/Constants';

const posts = (state = [], action) => {
  const { post } = action;

  switch (action.type) {
    case actions.LOAD_POSTS:
      return post;
    case actions.ADD_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          post,
        },
      };
    case actions.UPDATE_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          post,
        },
      };
    case actions.DELETE_POST:
      return state.filter(p => p.id !== post.id);
    default:
      return state;
  }
};

export default posts;
