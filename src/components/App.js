import React, { Component } from 'react';
import '../styles/App.css';
import Header from './Header';
import Categories from './Categories';
import Posts from './Posts';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Header />
      <Categories />

      <Posts />
      </div>
    );
  }
}

export default App;
