import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {getCategories} from '../actions/CategoriesActions';

class Categories extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const {categories} = this.props;

    return (
      <div>
      <h2>Categories</h2>
      <ul className="categories-nav">
        {
          <li key='home'>
            <NavLink exact to='/'
              activeClassName='active'>
              Home
            </NavLink>
          </li>
        }
        {
          categories !== undefined && categories.map(category => (
            <li key={category.path}>
              <NavLink exact to={`/category/${category.path}`}
                activeClassName='active'>
                {category.name}
              </NavLink>
            </li>
          ))
        }
      </ul>

      <div className="add-post">
        <NavLink exact to='/add-post'
          activeClassName='active'>
          <i className="material-icons">add_box</i>
        </NavLink>

      </div>
    </div>
  );
  }
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired
}

const mapStateToProps = ({categories}) => ({categories})

export default connect(mapStateToProps, { getCategories }, null, { pure: false })(Categories);
