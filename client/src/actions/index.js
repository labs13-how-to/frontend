import axios from "axios";

export const TEST = "TEST";
export const FETCH = "FETCH";
export const SUCCESS = "SUCCESS";
export const SUCCESS_ID = "SUCCESS_ID";
export const FAILURE = "FAILURE";
export const ADD_FETCH = "ADD_FETCH";
export const ADD_SUCCESS = "ADD_SUCCESS";
export const ADD_FAILURE = "ADD_FAILURE";

//USER_FETCH, USER_SUCCESS, USER_FAIL
export const USER_FETCH = "USER_FETCH";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_FAIL = "USER_FAIL";

export const getTest = () => dispatch => {
  dispatch({ type: FETCH });
  console.log("fetched");
  axios
    .get("https://lambda-how-to.herokuapp.com/")
    .then(res => {
      dispatch({ type: TEST, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FAILURE, payload: err });
    });
};

export const getPosts = () => dispatch => {
  dispatch({ type: FETCH });
  console.log("fetched");
  axios
    .get(`https://lambda-how-to.herokuapp.com/posts`)
    .then(res => {
      dispatch({ type: SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FAILURE, payload: err });
    });
};

export const getPost = id => dispatch => {
  dispatch({ type: FETCH });
  console.log("fetched");
  axios
    .get(`https://lambda-how-to.herokuapp.com/posts/${id}`)
    .then(res => {
      dispatch({ type: SUCCESS_ID, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FAILURE, payload: err });
    });
};

export const addPost = newPost => dispatch => {
  dispatch({ type: ADD_FETCH });
  axios
    .post("https://lambda-how-to.herokuapp.com/posts", newPost)
    .then(response => {
      dispatch({ type: ADD_SUCCESS, payload: { id: response.data } });
    })
    .catch(err => {
      dispatch({ type: ADD_FAILURE, payload: err });
    });
};

export const getUsers = id => dispatch => {
  dispatch({ type: USER_FETCH });
  console.log("fetched");
  axios
    .get(`https://lambda-how-to.herokuapp.com/users/${id}`)
    .then(res => {
      console.log(res);
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
  dispatch({ type: USER_POSTS_FETCH })
  console.log("fetching user posts");
  axios
    .get(`https://lambda-how-to.herokuapp.com/users/${id}/posts`)
    .then(res => {
      console.log(res);
      dispatch({ type: USER_POSTS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: USER_POSTS_FAIL, payload: err})
    });
};

// Register Action
export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const register = creds => dispatch => {
  dispatch({ type: REGISTER_START });
  console.log(creds);
  return axios
    .post(`https://lambda-how-to.herokuapp.com/auth/register`, creds)
    .then(res => {
      console.log("Register!", res.data);
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
    .get(`${process.env.REACT_APP_BE_URL}/auth/google`)
    .then(res => {
      console.log(res);
      dispatch({ type: LOGIN_SUCCESS });
    })
    .catch(err => {
      console.log(err.message);
      dispatch({ type: LOGIN_FAILURE });
    });
};

//Logout Action
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const logout = () => {
  localStorage.removeItem("token");
  return { type: LOGOUT_SUCCESS };
};
