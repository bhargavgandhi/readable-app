import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import sortBy from 'sort-by';
import { getComments, addNewComment } from '../actions/CommentsActions';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      author: 'bg',
      parentId: this.props.postID,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }
  // id: Any unique ID. As with posts, UUID is probably the best here.
  // timestamp: timestamp. Get this however you want.
  // body: String
  // author: String
  // parentId: Should match a post id in the database.

  componentDidMount() {
    const { postID } = this.props;
    this.props.getComments(postID);
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleCommentSubmit(e) {
    e.preventDefault();
    const {
      body, author, parentId,
    } = this.state;
    const commentId = `comment-${Math.floor(Math.random() * 100)}`;
    const timestamp = new Date().getTime();

    const comment = {
      id: commentId,
      timestamp,
      body,
      author,
      parentId,
    };
    this.props.addNewComment(comment);

    this.setState({
      body: '',
      author: 'bg',
      parentId: this.props.postID,
    });

  }
  render() {
    const { comments } = this.props;

    return (
      <div className="comments">
        <h2>Comments</h2>
        <div id="new-comment-form">
          <form onSubmit={this.handleCommentSubmit}>
            <div className="form-field">
              <label htmlFor="body">
                <textarea
                  className="input-message-box"
                  rows="4"
                  cols="30"
                  name="body"
                  value={this.state.body}
                  placeholder="Write Comment"
                  onChange={e => this.handleInputChange(e)}
                />
                <span className="submit-button">
                  <button type="submit">
                    <span>Submit</span>
                    <i className="material-icons">send</i>
                  </button>
                </span>
              </label>
            </div>
          </form>
        </div>
        {
          comments !== undefined && comments
          .sort(sortBy('-timestamp'))
          .map(comment => (
            <div className="comment" key={comment.id}>
              <span className="comment-header">
                <span className="author-name">{comment.author} | </span>
                <span className="timestamp">
                  <i className="material-icons">access_time</i> {moment(comment.timestamp).fromNow()}
                </span>
              </span>
              <p>
                { comment.body }
              </p>
              <span className="comment-actions">
                <span><i className="material-icons">thumb_up</i></span>
                {comment.voteScore}
                <span><i className="material-icons">thumb_down</i></span>
              </span>
            </div>
          ))
        }
        {
          comments.length === 0 && (
            <div>No Comments!</div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = ({ comments }) => ({
  comments,
});

export default connect(mapStateToProps, { getComments, addNewComment })(Comments);
