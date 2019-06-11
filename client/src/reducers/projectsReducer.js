import {
    TEST,
    FETCH, SUCCESS, SUCCESS_ID, FAILURE,
    ADD_FETCH, ADD_SUCCESS, ADD_FAILURE,
    USER_POSTS_FETCH, USER_POSTS_SUCCESS, USER_POSTS_FAIL
} from "../actions";


const initialState =
{
    posts: ['one', 'two', 'three'],
    currPost: {},
    message: 'default',
    addMsg: 'default',
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
        case TEST:
            return {
                ...state,
                error: null,
                fetching: false,
                message: action.payload.message
            }
        case SUCCESS:
            return {
                ...state,
                error: null,
                fetching: false,
                posts: action.payload
            }
        case SUCCESS_ID:
            return {
                ...state,
                error: null,
                fetching: false,
                currPost: action.payload
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
                addMsg: action.payload.id
            }
        case ADD_FAILURE:
            return {
                ...state,
                adding: false,
                error: action.payload
            }

        // User Posts Fetching
        case USER_POSTS_FETCH:
            return {
                ...state,
                fetching: true,
                error: null
            }
        case USER_POSTS_SUCCESS:
            return {
                ...state,
                fetching: false,
                posts: action.payload
            }
        case USER_POSTS_FAIL:
            return {
                ...state,
                fetching: false,
                posts: [],
                error: action.payload
            }

        default:
            return state;
    }
};

export default reducer;