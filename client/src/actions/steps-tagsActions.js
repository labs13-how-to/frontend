import axios from 'axios';

export const ADDSTEP_FETCH = 'ADDSTEP_FETCH';
export const ADDSTEP_SUCCESS = 'ADDSTEP_SUCCESS';
export const ADDSTEP_FAILURE = 'ADDSTEP_FAILURE';

export const addStep = (id, newStep) => dispatch => {
    dispatch({ type: ADDSTEP_FETCH });
    axios
        .post(`http://localhost:4000/posts/${id}/steps`, newStep)
        .then(response => {
            console.log(response.data)
            dispatch({ type: ADDSTEP_SUCCESS, payload: response.data })
        })
        .catch(err => {
            dispatch({ type: ADDSTEP_FAILURE, payload: err });
        })
}