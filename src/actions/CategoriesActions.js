import * as actions from './Constants';
import * as ReadableAPI from '../utils';

const loadCategories = data => ({
  type: actions.LOAD_CATEGORIES,
  data,
});

export const getCategories = () => dispatch => (
  ReadableAPI
    .getCategories()
    .then(categories => dispatch(loadCategories(categories)))
);

export default getCategories();
