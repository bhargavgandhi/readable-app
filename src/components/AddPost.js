import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormSerialize from 'form-serialize';
import { addNewPost } from '../actions/PostsActions';

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

  handleInputChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handlePostSubmit = ( e ) => {
    e.preventDefault();
    //const serializedPost = FormSerialize(e.target, {hash: true});
    const { title, body, category, author } = this.state;
    const postId = Math.floor(Math.random() * 100);
    const timestamp = new Date().getTime();

    const post = {
      id: postId,
      timestamp,
      title,
      body,
      author,
      category
    }
    console.log(post);

    const headers = {
      'Accept': 'application/json',
      'Authorization': Math.random().toString(36).substr(-8),
    }

    this.props.addNewPost(post);
    fetch('http://localhost:3001/posts/', {
      method: 'POST',
      body: JSON.stringify(post),
      headers,
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => res.json())
      .then(data => data)
      .catch((error) => { console.log(error); })

    //this.props.history.push(`/${post.category}/${post.id}`);
  }

  // PARAMS:
  //    id - UUID should be fine, but any unique id will work
  //    timestamp - timestamp in whatever format you like, you can use Date.now() if you like
  //    title - String
  //    body - String
  //    author - String
  //    category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.

  render() {
    return (
      <div>
        <h2>Add Post</h2>
        <div className="posts">
          <div id="new-post-form">
            <form onSubmit={this.handlePostSubmit}>
              <div className="form-field">
                <label htmlFor="title"> Title </label>
                <input id="title"
                  name="title"
                  type="text"
                  value={this.state.title}
                  placeholder="Post Title..."
                  onChange={e => this.handleInputChange(e)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="body"> Body </label>
                <textarea
                  className="input-message-box"
                  rows="4"
                  cols="30"
                  name="body"
                  value={this.state.body}
                  placeholder="Body texts...."
                  onChange={e => this.handleInputChange(e)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="category">Category</label>
                <select id="category"
                  name="category"
                  value={this.state.category}
                  onChange={e => this.handleInputChange(e)}
                >
                  <option value='react'>react</option>
                  <option value='redux'>redux</option>
                  <option value='udacity'>udacity</option>
                </select>
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

export default connect(null, { addNewPost })(AddPost);
