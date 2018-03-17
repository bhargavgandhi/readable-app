import React, { Component } from 'react';
import * as ReadableAPI from '../utils';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    ReadableAPI.getCategories().then((categories) => {
      this.setState({categories})
    })
  }

  render() {
    const { categories } = this.state;

    return (
      <div>
        <h2>Categories</h2>
          <ul className="categories-nav">
            {
              categories.map( category => (
                <li key={category.path}> {category.name} </li>
              ))
            }
          </ul>
      </div>
    );
  }
}

export default Categories;
