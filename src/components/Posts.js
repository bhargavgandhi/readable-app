import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    console.log(category);

    return (
      <div>
        <h2>Posts</h2>
          <div className="posts">
            {
              posts !== undefined &&
              posts.filter(post => category !==undefined ? post.category === category : post)
              .map(post => (
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

const mapStateToProps = ({ posts }) => ({
  posts
})

export default connect(mapStateToProps, { getPosts })(Posts);
