import * as actions from './Constants';
import * as ReadableAPI from '../utils';

const loadCategories = categories => ({
    type: actions.LOAD_CATEGORIES,
    categories
});

export const getCategories = () => dispatch => (
  ReadableAPI
    .getCategories()
    .then(categories => dispatch(loadCategories(categories)))
);

export default getCategories();
