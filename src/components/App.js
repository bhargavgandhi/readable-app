import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import '../styles/App.css';
import Header from './Header';
import Categories from './Categories';
import Posts from './Posts';
import Post from './Post';
import AddPost from './AddPost';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Categories />
        <Switch>
          <Route exact path='/' component={Posts} />
          <Route path='/category/:category/' component={Posts}></Route>
          <Route path='/:category/:postid' component={Post} />
          <Route path='/add-post' component={AddPost} />
        </Switch>
      </div>
    );
  }
}

export default App;
