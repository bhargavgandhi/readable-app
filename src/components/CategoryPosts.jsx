import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import sortBy from 'sort-by';
import PropTypes from 'prop-types';
import {
  getPosts,
  removePost,
  updatePostVote,
} from '../actions/PostsActions';

class CategoryPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sorting: 'timestamp',
    };

    this.sortPosts = this.sortPosts.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.changeVote = this.changeVote.bind(this);
  }

  componentDidMount() {
    const filter = this.props.match.params.category || false;
    this.props.getPosts(filter);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.category !== this.props.match.params.category) {
      const filter = nextProps.match.params.category || false;
      this.props.getPosts(filter);
    }
  }

  sortPosts(filter) {
    this.setState({
      sorting: filter,
    });
  }
  deletePost(post) {
    this.props.removePost(post);
  }

  changeVote(id, option) {
    this.props.updatePostVote(id, option);
  }

  render() {
    const { sorting } = this.state;
    const { category } = this.props.match.params;
    const { posts } = this.props;

    return (
      <div>
        <h2>Posts</h2>
        <div className="posts">
          <div className="sorting">
            <button onClick={() => this.sortPosts('voteScore')}> Vote </button>
            <button onClick={() => this.sortPosts('timestamp')}> Time </button>
          </div>
          {
            posts !== undefined && Object.keys(posts).map(p => posts[p])
            .filter(post =>
              (category !== undefined ? post.category === category : post))
              .sort(sortBy(`-${sorting}`))
              .map(post => (
                <div className="post" key={post.id}>
                  <span className="post-header">
                    <span>{post.author} | </span>
                    <span>{post.category}</span>
                    <span className="span-block timestamp">
                      <i className="material-icons">access_time</i>
                      {moment(post.timestamp).fromNow()}
                    </span>

                    <span className="controls">
                      <NavLink exact to={`/edit/${post.id}`}>
                        <i className="material-icons">mode_edit</i>
                      </NavLink>
                      <button onClick={() => this.deletePost(post)}>
                        <i className="material-icons">delete</i>
                      </button>
                    </span>
                  </span>
                  <h2>
                    <NavLink exact to={`/${post.category}/${post.id}`}>
                      {post.title}
                    </NavLink>
                  </h2>
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
                    {post.voteScore}
                    <span>
                      <button
                        className="vote-button"
                        onClick={() =>
                          this.changeVote(post.id, 'downVote')}
                      >
                        <i className="material-icons">thumb_down</i>
                      </button>
                    </span>
                    <span><i className="material-icons">comment</i></span>
                    {post.commentCount}
                  </span>
                </div>
              ))
          }
        </div>
      </div>
    );
  }
}

CategoryPosts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  removePost: PropTypes.func.isRequired,
  updatePostVote: PropTypes.func.isRequired,
};

const mapStateToProps = ({ posts }) => ({
  posts,
});

export default connect(mapStateToProps, {
  getPosts,
  removePost,
  updatePostVote,
})(CategoryPosts);
