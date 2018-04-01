import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getSinglePost,
  updatePost,
} from '../actions/PostsActions';

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      body: '',
      category: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUpdatePost = this.handleUpdatePost.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id || false;
    this.props.getSinglePost(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      const id = nextProps.match.params.id || false;
      this.props.getSinglePost(id);
    }
  }

  componentDidUpdate() {
    const postArray = Object.keys(this.props.posts).map(p => this.props.posts[p]);
    postArray.map(p => (
      this.state.title === '' && this.setState({
        id: p.id,
        title: p.title,
        body: p.body,
        category: p.category,
      })
    ));
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleUpdatePost(e) {
    e.preventDefault();
    const {
      id, title, body, category,
    } = this.state;

    const post = {
      id,
      title,
      body,
      category,
    };

    this.props.updatePost(post).then(() => {
      this.props.history.push(`/${post.category}/${post.id}`);
    });
  }

  render() {
    return (
      <div>
        <h2>
          Edit Post
        </h2>
        <div className="posts">
          <div id="new-post-form">
            <form onSubmit={this.handleUpdatePost}>
              <div className="form-field">
                <label htmlFor="title">
                  <span>Title</span>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={this.state.title}
                    placeholder="Post Title..."
                    onChange={e => this.handleInputChange(e)}
                  />
                </label>
              </div>
              <div className="form-field">
                <label htmlFor="body">
                  <span>Body</span>
                  <textarea
                    className="input-message-box"
                    rows="4"
                    cols="30"
                    name="body"
                    value={this.state.body}
                    placeholder="Body texts...."
                    onChange={e => this.handleInputChange(e)}
                  />
                </label>
              </div>
              <div className="form-field submit-button">
                <button type="submit">
                  <span>Update</span>
                  <i className="material-icons">send</i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EditPost.propTypes = {
  getSinglePost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
};

const mapStateToProps = ({ posts }) => ({
  posts,
});

export default connect(mapStateToProps, {
  getSinglePost,
  updatePost,
})(EditPost);
