import React, { Component } from 'react';
import * as ReadableAPI from '../utils';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    ReadableAPI.getPosts().then((posts) => {
      this.setState({posts})
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div>
        <h2>posts</h2>
        <div className="posts">
            {posts !== undefined && posts.map(post => (
                <div className="post" key={post.id}>
                  <span className="post-header">
                    <span>{post.author}</span>
                    <span>{post.category}</span>
                  </span>
                  <h2> {post.title} </h2>
                  <span className="post-actions">
                    <span><i className="material-icons">thumb_up</i></span>
                    <span><i className="material-icons">thumb_down</i></span>
                  </span>
                </div>
              ))
            }
          </div>
      </div>
    );
  }
}

export default Posts;
