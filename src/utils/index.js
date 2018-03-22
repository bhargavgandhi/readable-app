const api = 'http://localhost:3001'

// Generate a unique token for storing your bookshelf data on the backend server.
let {token} = localStorage;
if (!token) {
  token = localStorage.token;
  token = Math.random().toString(36).substr(-8);
}

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
}

// Get Categories
export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

// Get Posts
export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

// Add Post
export const addPost = post => (
  fetch(`${api}/posts/`, {
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
);

export const updatePost = (post) => {
  const postData = {
    ...post,
    timestamp: new Date().getTime(),
  };

  return (
    fetch(`${api}/posts/${post.id}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
      headers,
    })
      .then(res => res.json())
      .then(data => data)
  );
};

export const removePost = id =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers,
  });
