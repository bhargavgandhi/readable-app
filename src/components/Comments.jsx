import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import sortBy from 'sort-by';
import PropTypes from 'prop-types';
import {
  getComments,
  addNewComment,
  updateComment,
  removeComment,
  updateCommentVote,
} from '../actions/CommentsActions';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      body: '',
      author: 'bg',
      parentId: this.props.postID,
      commentStatus: 'Submit',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.editComment = this.editComment.bind(this);
    this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
    this.changeVote = this.changeVote.bind(this);
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
    const submitComment = this.props.addNewComment;

    const comment = {
      id: commentId,
      timestamp,
      body,
      author,
      parentId,
    };
    body !== '' && submitComment(comment, parentId)

    this.setState({
      id: '',
      body: '',
      author: 'bg',
      parentId: this.props.postID,
      commentStatus: 'Submit',
    });
  }

  deleteComment(comment) {
    const { parentId } = this.state;
    this.props.removeComment(comment, parentId);
  }

  editComment(comment) {
    this.refs.commentBody.focus();

    this.setState({
      id: comment.id,
      body: comment.body,
      commentStatus: 'Update',
    });
  }

  handleCommentUpdate(e) {
    e.preventDefault();
    const { id, body } = this.state;
    const timestamp = new Date().getTime();

    const comment = {
      id,
      timestamp,
      body,
    };

    body !== '' && this.props.updateComment(comment)

    this.setState({
      id: '',
      body: '',
      author: 'bg',
      parentId: this.props.postID,
      commentStatus: 'Submit',
    });
  }

  changeVote(id, option) {
    this.props.updateCommentVote(id, option);
  }

  render() {
    const { comments } = this.props;
    const { commentStatus } = this.state;

    return (
      <div className="comments">
        <h2>Comments</h2>
        {
          comments !== undefined && comments
          .sort(sortBy('-timestamp'))
          .map(comment => (
            <div className="comment" key={comment.id}>
              <span className="comment-header">
                <span className="author-name">{comment.author} | </span>
                <span className="timestamp">
                  <i className="material-icons">access_time</i>
                  { moment(comment.timestamp).fromNow()}
                </span>
                <span className="controls">
                  <button
                    onClick={() => this.editComment(comment)}
                  >
                    <i className="material-icons">mode_edit</i>
                  </button>
                  <button
                    className="deleteBtn"
                    onClick={() => this.deleteComment(comment)}
                  >
                    <i className="material-icons">delete</i>
                  </button>
                </span>
              </span>
              <p>
                { comment.body }
              </p>
              <span className="comment-actions">
                <span>
                  <button
                    className="vote-button"
                    onClick={() =>
                      this.changeVote(comment.id, 'upVote')}
                  >
                    <i className="material-icons">thumb_up</i>
                  </button>
                </span>
                {comment.voteScore}
                <span>
                  <button
                    className="vote-button"
                    onClick={() =>
                      this.changeVote(comment.id, 'downVote')}
                  >
                    <i className="material-icons">thumb_down</i>
                  </button>
                </span>
              </span>
            </div>
          ))
        }
        {
          comments.length === 0 && (
            <div>No Comments!</div>
          )
        }

        <div id="new-comment-form">
          <form onSubmit={(commentStatus === 'Submit' ?
             this.handleCommentSubmit : this.handleCommentUpdate)}
          >
            <div className="form-field">
              <label htmlFor="body">
                <textarea
                  ref="commentBody"
                  className="input-message-box"
                  rows="4"
                  cols="30"
                  name="body"
                  value={this.state.body}
                  placeholder="Write Comment"
                  onChange={e => this.handleInputChange(e)}
                  required
                />
                <span className="submit-button">
                  <button type="submit">
                    <span>{ commentStatus }</span>
                    <i className="material-icons">send</i>
                  </button>
                </span>
              </label>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    parentId: PropTypes.string,
    timestamp: PropTypes.number,
    body: PropTypes.string,
    author: PropTypes.string,
    voteScore: PropTypes.number,
    deleted: PropTypes.bool,
    parentDeleted: PropTypes.bool,
  })).isRequired,
  getComments: PropTypes.func.isRequired,
  addNewComment: PropTypes.func.isRequired,
  removeComment: PropTypes.func.isRequired,
  updateCommentVote: PropTypes.func.isRequired,
  postID: PropTypes.string.isRequired,
};

const mapStateToProps = ({ comments }) => ({
  comments,
});

export default connect(mapStateToProps, {
  getComments,
  addNewComment,
  updateComment,
  removeComment,
  updateCommentVote,
})(Comments);
