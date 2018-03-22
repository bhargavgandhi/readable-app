import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getPosts } from '../actions/PostsActions';

class Posts extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     posts: []
  //   };
  // }

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts } = this.props;
    const category = this.props.match.params.category;

    return (
      <div>
        <h2>Posts</h2>
          <div className="posts">
            {
              posts !== undefined &&
              posts.filter(post => category !==undefined ? post.category === category : post)
              .map(post => (
                <NavLink exact to={`/posts/${post.id}`} key={post.id}>
                  <div className="post">
                    <span className="post-header">
                      <span>{post.author} | </span>
                      <span>{post.category}</span>
                    </span>
                    <h2> {post.title} </h2>
                    <span className="post-actions">
                      <span><i className="material-icons">thumb_up</i></span>
                      {post.voteScore}
                      <span><i className="material-icons">thumb_down</i></span>

                    <span><i className="material-icons">comment</i></span>
                    {post.commentCount}
                    </span>
                  </div>
                </NavLink>
              ))
            }
          </div>
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => ({
  posts
})

export default connect(mapStateToProps, { getPosts })(Posts);
