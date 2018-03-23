import React, { Component } from 'react';
import { connect } from 'react-redux';
// import FormSerialize from 'form-serialize';
import { getPosts, addNewPost } from '../actions/PostsActions';

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      category: 'react',
      author: 'bg',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getPosts();
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handlePostSubmit(e) {
    e.preventDefault();
    // const serializedPost = FormSerialize(e.target, {hash: true});
    const {
      title, body, category, author,
    } = this.state;
    const postId = `bg${Math.floor(Math.random() * 100)}`;
    const timestamp = new Date().getTime();

    const post = {
      id: postId,
      timestamp,
      title,
      body,
      author,
      category,
    };

    this.props.addNewPost(post).then(() => {
      this.props.history.push(`/${post.category}/${post.id}`);
    });
  }

  render() {
    return (
      <div>
        <h2>Add Post</h2>
        <div className="posts">
          <div id="new-post-form">
            <form onSubmit={this.handlePostSubmit}>
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
              <div className="form-field">
                <label htmlFor="category">
                  <span>Category</span>
                  <select
                    id="category"
                    name="category"
                    value={this.state.category}
                    onChange={e => this.handleInputChange(e)}
                  >
                    <option value="react">react</option>
                    <option value="redux">redux</option>
                    <option value="udacity">udacity</option>
                  </select>
                </label>
              </div>
              <div className="form-field submit-button">
                <button type="submit">
                  <span>Submit</span>
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

export default connect(null, { getPosts, addNewPost })(AddPost);
