import * as actions from '../actions/Constants';

export default function posts(state=[], action) {
  const { posts } = action;

  switch (action.type) {
    case actions.LOAD_POSTS:
      return posts;
    default:
      return state;
  }
}
