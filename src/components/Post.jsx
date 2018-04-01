import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import Comments from './Comments';
import NotFound from './NotFound';
import {
  getSinglePost,
  removePost,
  updatePostVote,
} from '../actions/PostsActions';

class Post extends Component {
  constructor(props) {
    super(props);

    this.deletePost = this.deletePost.bind(this);
    this.changeVote = this.changeVote.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.postid || false;
    this.props.getSinglePost(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      const id = nextProps.match.params.id || false;
      this.props.getSinglePost(id);
    }
  }

  deletePost(post) {
    this.props.removePost(post).then(() => {
      this.props.history.push('/');
    });
  }

  changeVote(id, option) {
    this.props.updatePostVote(id, option);
  }

  render() {
    const { posts } = this.props;
    const { category } = this.props.match.params;
    const postID = this.props.match.params.postid;
    return (
      <div>
        {
          posts !== undefined && Object.keys(posts).map(p => posts[p])
          .map(post => (
          (!post || post.category !== category)
            ? <NotFound key={post.id} />
            :
            <div key={post.id}>
              <h2>Posts</h2>
              <div className="posts">
                <div className="post">
                  <span className="post-header">
                    <span>{post.author} | </span>
                    <span>{post.category}</span>
                    <span className="span-block timestamp">
                      <i className="material-icons">access_time</i>
                      { moment(post.timestamp).fromNow() }
                    </span>
                    <span className="controls">
                      <NavLink exact to={`/edit/${post.id}`}>
                        <i className="material-icons">mode_edit</i>
                      </NavLink>
                      <button
                        className="deleteBtn"
                        onClick={() => this.deletePost(post)}
                      >
                        <i className="material-icons">delete</i>
                      </button>
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
                      <button
                        className="vote-button"
                        onClick={() =>
                        this.changeVote(post.id, 'upVote')}
                      >
                        <i className="material-icons">thumb_up</i>
                      </button>
                    </span>
                    <span>
                      {post.voteScore}
                    </span>
                    <span>
                      <button
                        className="vote-button"
                        onClick={() =>
                          this.changeVote(post.id, 'downVote')}
                      >
                        <i className="material-icons">thumb_down</i>
                      </button>
                    </span>
                    <span>
                      <i className="material-icons">comment</i>
                    </span>
                    <span>
                      {post.commentCount}
                    </span>
                  </span>
                </div>
                <Comments postID={postID} />
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

Post.propTypes = {
  getSinglePost: PropTypes.func.isRequired,
  removePost: PropTypes.func.isRequired,
  updatePostVote: PropTypes.func.isRequired,
};

const mapStateToProps = ({ posts }) => ({
  posts,
});

export default connect(mapStateToProps, {
  getSinglePost,
  removePost,
  updatePostVote,
})(Post);
