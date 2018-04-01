import React from 'react';
import { Switch, Route } from 'react-router-dom';
import '../styles/App.css';
import Header from './Header';
import Categories from './Categories';
import Posts from './Posts';
import CategoryPosts from './CategoryPosts';
import Post from './Post';
import AddPost from './AddPost';
import EditPost from './EditPost';
import NotFound from './NotFound';

function App() {
  return (
    <div className="App">
      <Header />
      <Categories />
      <Switch>
        <Route exact path="/" component={Posts} />
        <Route exact path="/add" component={AddPost} />
        <Route exact path="/edit/:id" component={EditPost} />
        <Route exact path="/category/:category" component={CategoryPosts} />
        <Route exact path="/:category/:postid" component={Post} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
