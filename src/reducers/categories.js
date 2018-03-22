import * as actions from '../actions/Constants';

const categories = (state = [], action) => {
  const { data } = action;

  switch (action.type) {
    case actions.LOAD_CATEGORIES:
      return data;
    default:
      return state;
  }
};

export default categories;
