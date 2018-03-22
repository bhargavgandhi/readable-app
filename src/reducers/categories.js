import * as actions from '../actions/Constants';

const categories = (state=[], action) => {
  const { categories } = action;

  switch (action.type) {
    case actions.LOAD_CATEGORIES:
      return categories;
    default:
      return state;
  }
};

export default categories;
