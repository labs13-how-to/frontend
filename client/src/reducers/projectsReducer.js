import {
    FETCH, SUCCESS, FAILURE,
    ADD_FETCH, ADD_SUCCESS, ADD_FAILURE,
} from "../actions";


const initialState =
{
    posts: ['one', 'two', 'three'],
    message: 'default',
    fetching: false,
    adding: false,
    error: null,
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case FETCH:
            return {
                ...state,
                fetching: true
            }
        case SUCCESS:
            return {
                ...state,
                error: null,
                fetching: false,
                message: action.payload.message
            }
        case FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.payload
            }

        //add conditions ============
        case ADD_FETCH:
            return {
                ...state,
                adding: true
            }
        case ADD_SUCCESS:
            return {
                ...state,
                error: null,
                adding: false,
                posts: action.payload
            }
        case ADD_FAILURE:
            return {
                ...state,
                adding: false,
                error: action.payload
            }

        default:
            return state;
    }
};

export default reducer;