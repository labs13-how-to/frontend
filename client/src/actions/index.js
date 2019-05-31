import axios from 'axios';

export const FETCH = 'FETCH';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';
export const ADD_FETCH = 'ADD_FETCH';
export const ADD_SUCCESS = 'ADD_SUCCESS';
export const ADD_FAILURE = 'ADD_FAILURE';


export const getPosts = () => dispatch => {
    dispatch({ type: FETCH });
    console.log('fetched');
    axios
        .get('https://lambda-how-to.herokuapp.com/')
        .then(res => {
            dispatch({ type: SUCCESS, payload: res.data });
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
            dispatch({ type: ADD_SUCCESS, payload: response.data });
        })
        .catch(err => {
            dispatch({ type: ADD_FAILURE, payload: err });
        })
}
