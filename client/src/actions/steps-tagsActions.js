import axios from 'axios';

export const ADDSTEP_FETCH = 'ADDSTEP_FETCH';
export const ADDSTEP_SUCCESS = 'ADDSTEP_SUCCESS';
export const ADDSTEP_FAILURE = 'ADDSTEP_FAILURE';

export const addStep = (id, newStep) => dispatch => {
    dispatch({ type: ADDSTEP_FETCH });
    axios
        .post(`https://lambda-how-to.herokuapp.com/posts/${id}/steps`, newStep)
        .then(response => {
            console.log(response.data)
            dispatch({ type: ADDSTEP_SUCCESS, payload: response.data })
        })
        .catch(err => {
            dispatch({ type: ADDSTEP_FAILURE, payload: err });
        })
}

export const GETTAG_FETCH = 'GETTAG_FETCH';
export const GETTAG_SUCCESS = 'GETTAG_SUCCESS';
export const GETTAG_FAILURE = 'GETTAG_FAILURE';

export const getTag = () => dispatch => {
    dispatch({ type: GETTAG_FETCH });
    axios
        .get(`https://lambda-how-to.herokuapp.com/tags`)
        .then(response => {
            console.log(response.data)
            dispatch({ type: GETTAG_SUCCESS, payload: response.data })
        })
        .catch(err => {
            dispatch({ type: GETTAG_FAILURE, payload: err });
        })
}

export const ADDTAG_FETCH = 'ADDTAG_FETCH';
export const ADDTAG_SUCCESS = 'ADDTAG_SUCCESS';
export const ADDTAG_FAILURE = 'ADDTAG_FAILURE';

export const addTag = (tag) => dispatch => {
    dispatch({ type: ADDTAG_FETCH });
    axios
        .post(`https://lambda-how-to.herokuapp.com/posts/${tag.post_id}/tags`, tag)
        .then(response => {
            console.log(response.data)
            dispatch({ type: ADDTAG_SUCCESS, payload: response.data })
        })
        .catch(err => {
            dispatch({ type: ADDTAG_FAILURE, payload: err });
        })
}

export const REMOVETAG_FETCH = 'REMOVETAG_FETCH';
export const REMOVETAG_SUCCESS = 'REMOVETAG_SUCCESS';
export const REMOVETAG_FAILURE = 'REMOVETAG_FAILURE';

export const removeTag = (tag) => dispatch => {
    dispatch({ type: REMOVETAG_FETCH });
    axios
        .delete(`https://lambda-how-to.herokuapp.com/posts/${tag.post_id}/tags/${tag.tag_id}`)
        .then(response => {
            console.log(response.data)
            dispatch({ type: REMOVETAG_SUCCESS, payload: response.data })
        })
        .catch(err => {
            dispatch({ type: REMOVETAG_FAILURE, payload: err });
        })
}
