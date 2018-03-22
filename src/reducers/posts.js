import * as actions from '../actions/Constants';

export default function posts(state = [], action) {
  const { post } = action;

  switch (action.type) {
    case actions.LOAD_POSTS:
      return post;
    case actions.ADD_POST:
      return {
        ...state,
        posts: state.posts !== undefined && state.posts.concat(post),
      };
    default:
      return state;
  }
}
