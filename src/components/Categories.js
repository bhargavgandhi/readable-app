import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {getCategories} from '../actions/CategoriesActions';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.isActive = this.isActive.bind(this)
  }

  isActive = (match, location) => {
    if (!match) {
      return false
    }
    const category = parseInt(match.params.category)
    console.log(category + ' location is - ' + location);
    if(category === location) return true
  }

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const {categories} = this.props;

    return (<div>
      <h2>Categories</h2>
      <ul className="categories-nav">
        {
          categories !== undefined && categories.map(category => (<li key={category.path}>
            <NavLink to={`/category/${category.path}`}
            activeClassName='active'
            isActive={this.isActive}>
              {category.name}
            </NavLink>
          </li>))
        }
      </ul>
    </div>);
  }
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired
}

const mapStateToProps = ({categories}) => ({categories})

export default connect(mapStateToProps, {getCategories})(Categories);
