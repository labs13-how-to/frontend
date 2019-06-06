import axios from 'axios';

export const TEST = 'TEST';
export const FETCH = 'FETCH';
export const SUCCESS = 'SUCCESS';
export const SUCCESS_ID = 'SUCCESS_ID';
export const FAILURE = 'FAILURE';
export const ADD_FETCH = 'ADD_FETCH';
export const ADD_SUCCESS = 'ADD_SUCCESS';
export const ADD_FAILURE = 'ADD_FAILURE';

//USER_FETCH, USER_SUCCESS, USER_FAIL
export const USER_FETCH = 'USER_FETCH';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAIL = 'USER_FAIL';

export const getTest = () => dispatch => {
    dispatch({ type: FETCH });
    console.log('fetched');
    axios
        .get('https://lambda-how-to.herokuapp.com/')
        .then(res => {
            dispatch({ type: TEST, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: FAILURE, payload: err });
        })
}

export const getPosts = () => dispatch => {
    dispatch({ type: FETCH });
    console.log('fetched');
    axios
        .get(`https://lambda-how-to.herokuapp.com/posts`)
        .then(res => {
            dispatch({ type: SUCCESS, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: FAILURE, payload: err });
        })
}

export const getPost = (id) => dispatch => {
    dispatch({ type: FETCH });
    console.log('fetched');
    axios
        .get(`https://lambda-how-to.herokuapp.com/posts/${id}`)
        .then(res => {
            dispatch({ type: SUCCESS_ID, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: FAILURE, payload: err });
        })
}

export const addPost = (newPost) => dispatch => {
    dispatch({ type: ADD_FETCH });
    axios
        .post('https://lambda-how-to.herokuapp.com/posts', newPost)
        .then(response => {
            dispatch({ type: ADD_SUCCESS, payload: { id: response.data } })
        })
        .catch(err => {
            dispatch({ type: ADD_FAILURE, payload: err });
        })
}

export const getUsers = (id) => dispatch => {
    dispatch({ type: USER_FETCH });
    console.log('fetched');
    axios
        .get(`https://lambda-how-to.herokuapp.com/users/${id}`)
        .then(res => {
            console.log(res);
            dispatch({ type: USER_SUCCESS, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: USER_FAIL, payload: err });
        })
}
