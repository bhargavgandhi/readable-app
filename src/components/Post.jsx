import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getPosts } from '../actions/PostsActions';
import Comments from './Comments';

class Post extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts } = this.props;
    const postID = this.props.match.params.postid;
    return (
      <div>
        <h2>Posts</h2>
        <div className="posts">
          {
            posts !== undefined && posts.filter(post =>
              (postID !== undefined ? post.id === postID : post))
            .map(post => (
              <div className="post" key={post.id}>
                <span className="post-header">
                  <span>{post.author} | </span>
                  <span>{post.category}</span>
                  <span className="span-block timestamp">
                    <i className="material-icons">access_time</i> {moment(post.timestamp).fromNow()}
                  </span>
                </span>
                <h2>
                  {post.title}
                </h2>
                <p>
                  {post.body}
                </p>
                <span className="post-actions">
                  <span>
                    <i className="material-icons">thumb_up</i>
                  </span>
                  <span>
                    {post.voteScore}
                  </span>
                  <span>
                    <i className="material-icons">thumb_down</i>
                  </span>

                  <span>
                    <i className="material-icons">comment</i>
                  </span>
                  <span>
                    {post.commentCount}
                  </span>
                </span>
              </div>
            ))
          }
          <Comments postID={postID} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => ({
  posts,
});

export default connect(mapStateToProps, { getPosts })(Post);
