import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import sortBy from 'sort-by';
import { getPosts } from '../actions/PostsActions';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sorting: 'timestamp',
    };

    this.sortPosts = this.sortPosts.bind(this);
  }

  componentDidMount() {
    this.props.getPosts();
  }

  sortPosts(filter) {
    this.setState({
      sorting: filter,
    });
  }

  render() {
    const { posts } = this.props;
    const { category } = this.props.match.params;
    const { sorting } = this.state;

    return (
      <div>
        <h2>Posts</h2>
        <div className="posts">
          <div className="sorting">
            <button onClick={() => this.sortPosts('voteScore')}> Vote </button>
            <button onClick={() => this.sortPosts('timestamp')}> Time </button>
          </div>
          {
            posts !== undefined && posts.filter(post =>
              (category !== undefined ? post.category === category : post))
              .sort(sortBy(`-${sorting}`))
              .map(post => (
                <NavLink exact to={`/${post.category}/${post.id}`} key={post.id}>
                  <div className="post">
                    <span className="post-header">
                      <span>{post.author} | </span>
                      <span>{post.category}</span>
                      <span className="span-block timestamp">
                        <i className="material-icons">access_time</i> {moment(post.timestamp).fromNow()}
                      </span>
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
  posts,
});

export default connect(mapStateToProps, { getPosts })(Posts);
