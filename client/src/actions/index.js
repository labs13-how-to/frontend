import axios from "axios";
import axiosWithAuth from "../auth/needAuth";

const backendUrl = process.env.REACT_APP_BE_URL || `http://localhost:5000`;

export const TEST = "TEST";
export const FETCH = "FETCH";
export const SUCCESS = "SUCCESS";
export const SUCCESS_ID = "SUCCESS_ID";
export const FAILURE = "FAILURE";
export const REFRESH = "REFRESH";

export const getRefresh = () => dispatch => dispatch({ type: REFRESH });

export const getTest = () => dispatch => {
  dispatch({ type: FETCH });
  axios
    .get(backendUrl)
    .then(res => {
      dispatch({ type: TEST, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FAILURE, payload: err });
    });
};

export const getPosts = () => dispatch => {
  dispatch({ type: FETCH });
  axios
    .get(`${backendUrl}/posts/`)
    .then(res => {
      dispatch({ type: SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FAILURE, payload: err });
    });
};

export const getPost = id => dispatch => {
  dispatch({ type: FETCH });
  axios
    .get(`${backendUrl}/posts/${id}`)
    .then(res => {
      dispatch({ type: SUCCESS_ID, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FAILURE, payload: err });
    });
};

export const ADD_FETCH = "ADD_FETCH";
export const ADD_SUCCESS = "ADD_SUCCESS";
export const ADD_FAILURE = "ADD_FAILURE";

export const addPost = newPost => dispatch => {
  dispatch({ type: ADD_FETCH });
  axios
    .post(`${backendUrl}/posts/`, newPost)
    .then(response => {
      dispatch({ type: ADD_SUCCESS, payload: { id: response.data } });
    })
    .catch(err => {
      dispatch({ type: ADD_FAILURE, payload: err });
    });
};

//Uploading an IMage from post
export const IMAGE_FETCH = "IMAGE_FETCH";
export const IMAGE_SUCCESS = "IMAGE_SUCCESS";
export const IMAGE_FAILURE = "IMAGE_FAILURE";

export const uploadImageHandler = newImage => dispatch => {
  dispatch({ type: IMAGE_FETCH });
  const fd = new FormData();
  fd.append("image", newImage, newImage.name);

  axios
    .post(`${backendUrl}/upload`, fd, {
      onUploadProgress: progressEvent => {
        console.log(
          "Upload Progress: ",
          Math.round((progressEvent.loaded / progressEvent.total) * 100),
          "%"
        );
      }
    })
    .then(response => {
      dispatch({ type: IMAGE_SUCCESS, payload: response.data.img_url.img_url });
    })
    .catch(err => {
      dispatch({ type: IMAGE_FAILURE, payload: err });
    });
};

export const POST_DELETE_START = "POST_DELETE_START";
export const POST_DELETE_SUCCESS = "POST_DELETE_SUCCESS";
export const POST_DELETE_FAILURE = "POST_DELETE_FAILURE";

export const deletePost = id => dispatch => {
  dispatch({ type: POST_DELETE_START });
  axios
    .delete(`${backendUrl}/posts/${id}`)
    .then(res => {
      dispatch({ type: POST_DELETE_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: POST_DELETE_FAILURE, payload: err });
    });
};

//Update a post
export const UPDATE_FETCH = "UPDATE_FETCH";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";
export const UPDATE_FAILURE = "UPDATE_FAILURE";

export const updatePost = (id, updatedPost) => dispatch => {
  dispatch({ type: UPDATE_FETCH });
  axios
    .put(`${backendUrl}/posts/${id}`, updatedPost)
    .then(response => {
      dispatch({ type: UPDATE_SUCCESS, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: UPDATE_FAILURE, payload: err });
    });
};

//USER_FETCH, USER_SUCCESS, USER_FAIL
export const USER_FETCH = "USER_FETCH";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_FAIL = "USER_FAIL";

export const getUsers = id => dispatch => {
  dispatch({ type: USER_FETCH });
  axios
    .get(`${backendUrl}/users/${id}`)
    .then(res => {
      dispatch({ type: USER_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: USER_FAIL, payload: err });
    });
};

//Get User Posts --> Account Page
export const USER_POSTS_FETCH = "USER_POSTS_FETCH";
export const USER_POSTS_SUCCESS = "USER_POSTS_SUCCESS";
export const USER_POSTS_FAIL = "USER_POSTS_FAIL";

export const getUserPosts = id => dispatch => {
  dispatch({ type: USER_POSTS_FETCH });
  axios
    .get(`${backendUrl}/users/${id}/posts`)
    .then(res => {
      dispatch({ type: USER_POSTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: USER_POSTS_FAIL, payload: err });
    });
};

//Get User favorites --> Account Page
export const FAVORITE_POSTS_FETCH = "FAVORITE_POSTS_FETCH";
export const FAVORITE_POSTS_SUCCESS = "FAVORITE_POSTS_SUCCESS";
export const FAVORITE_POSTS_FAIL = "FAVORITE_POSTS_FAIL";

export const getFavoritePosts = id => dispatch => {
  dispatch({ type: FAVORITE_POSTS_FETCH });
  axios
    .get(`https://lambda-how-to.herokuapp.com/users/${id}/favorites`)
    .then(res => {
      dispatch({ type: FAVORITE_POSTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FAVORITE_POSTS_FAIL, payload: err });
    });
};

// Register Action
export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const register = creds => dispatch => {
  dispatch({ type: REGISTER_START });
  return axios
    .post(`${backendUrl}/auth/register`, creds)
    .then(res => {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    })
    .catch(err => dispatch({ type: REGISTER_FAILURE, payload: err }));
};

// Login Actions
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const login = () => dispatch => {
  dispatch({ type: LOGIN_START });
  return axios
    .get(`${backendUrl}/auth/google`)
    .then(res => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: LOGIN_FAILURE });
    });
};

//Logout Action
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const logout = () => {
  localStorage.removeItem("jwt");
  return { type: LOGOUT_SUCCESS };
};

//Reviews Actions
//Getting reviews for specified post
export const REVIEW_FETCH_START = "REVIEW_FETCH_START";
export const REVIEW_FETCH_SUCCESS = "REVIEW_FETCH_SUCCESS";
export const REVIEW_FETCH_FAILURE = "REVIEW_FETCH_FAILURE";

export const getReviews = id => dispatch => {
  dispatch({ type: REVIEW_FETCH_START });
  axios
    .get(`${backendUrl}/posts/${id}/reviews`)
    .then(res => {
      dispatch({ type: REVIEW_FETCH_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: REVIEW_FETCH_FAILURE, payload: err });
    });
};

export const REVIEW_ADD_START = "REVIEW_ADD_START";
export const REVIEW_ADD_SUCCESS = "REVIEW_ADD_SUCCESS";
export const REVIEW_ADD_FAILURE = "REVIEW_ADD_FAILURE";

export const addReview = (id, newPost) => dispatch => {
  dispatch({ type: REVIEW_ADD_START });
  axiosWithAuth()
    .post(`${backendUrl}/posts/${id}/reviews`, newPost)
    .then(res => {
      dispatch({ type: REVIEW_ADD_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: REVIEW_ADD_FAILURE, payload: err });
    });
};

export const REVIEW_UPDATE_START = "REVIEW_UPDATE_START";
export const REVIEW_UPDATE_SUCCESS = "REVIEW_UPDATE_SUCCESS";
export const REVIEW_UPDATE_FAILURE = "REVIEW_UPDATE_FAILURE";

export const updateReview = (id, updatedPost) => dispatch => {
  dispatch({ type: REVIEW_UPDATE_START });
  axios
    .put(`${backendUrl}/posts/reviews/${id}`, updatedPost)
    .then(res => {
      dispatch({ type: REVIEW_UPDATE_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: REVIEW_UPDATE_FAILURE, payload: err });
    });
};

export const REVIEW_DELETE_START = "REVIEW_DELETE_START";
export const REVIEW_DELETE_SUCCESS = "REVIEW_DELETE_SUCCESS";
export const REVIEW_DELETE_FAILURE = "REVIEW_DELETE_FAILURE";

export const deleteReview = id => dispatch => {
  dispatch({ type: REVIEW_DELETE_START });
  axios
    .delete(`${backendUrl}/posts/reviews/${id}`)
    .then(res => {
      dispatch({ type: REVIEW_DELETE_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: REVIEW_DELETE_FAILURE, payload: err });
    });
};
