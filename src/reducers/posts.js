import * as actions from '../actions/Constants';

const posts = (state = [], action) => {
  const { post } = action;

  switch (action.type) {
    case actions.LOAD_POSTS: {
      const postArray = post.reduce(
        (map, p) => {
          map[p.id] = p;
          return map;
        },
        {},
      );
      return postArray;
    }

    case actions.LOAD_SINGLE_POST:
      return {
        [post.id]: post,
      };
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
        [post.id]: {
          ...state,
          post,
        },
      };
    case actions.DELETE_POST:
      // return state.filter(p => p.id !== post.id);
      return Object.keys(state).map(p => state[p])
        .filter(p => p.id !== post.id);

    case actions.UPDATE_POST_VOTE:
      return {
        ...state,
        [post.id]: post,
      };
      // return state.map(p => (p.id === post.id ? post: p));

    default:
      return state;
  }
};

export default posts;
