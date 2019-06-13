import {
    TEST,
    FETCH, SUCCESS, SUCCESS_ID, FAILURE,
    ADD_FETCH, ADD_SUCCESS, ADD_FAILURE,
    USER_POSTS_FETCH, USER_POSTS_SUCCESS, USER_POSTS_FAIL
} from "../actions";
import {
    ADDSTEP_FETCH, ADDSTEP_SUCCESS, ADDSTEP_FAILURE,
    GETTAG_FETCH, GETTAG_SUCCESS, GETTAG_FAILURE,
    ADDTAG_FETCH, ADDTAG_SUCCESS, ADDTAG_FAILURE,
    REMOVETAG_FETCH, REMOVETAG_SUCCESS, REMOVETAG_FAILURE,
} from '../actions/steps-tagsActions';


const initialState =
{
    posts: ['one', 'two', 'three'],
    userPosts: [],
    currPost: {},
    allTags: [],
    message: 'default',
    addId: 0,
    addMsg: '',
    fetching: false,
    adding: false,
    error: null,
    refresh: false
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
                currPost: action.payload,
                refresh: false,
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
                addId: action.payload.id
            }
        case ADD_FAILURE:
            return {
                ...state,
                adding: false,
                error: action.payload
            }
        //add a step reducers
        case ADDSTEP_FETCH:
            return {
                ...state,
                adding: true
            }
        case ADDSTEP_SUCCESS:
            return {
                ...state,
                error: null,
                adding: false,
                addMsg: action.payload.id
            }
        case ADDSTEP_FAILURE:
            return {
                ...state,
                adding: false,
                error: action.payload
            }

        //Tag reducer section
        case GETTAG_FETCH:
            return {
                ...state,
                fetching: true
            }
        case GETTAG_SUCCESS:
            return {
                ...state,
                error: null,
                fetching: false,
                allTags: action.payload,
            }
        case GETTAG_FAILURE:
            return {
                ...state,
                fetching: false,
            }
        case ADDTAG_FETCH:
            return {
                ...state,
                fetching: true
            }
        case ADDTAG_SUCCESS:
            return {
                ...state,
                error: null,
                fetching: false,
                refresh: true,
            }
        case ADDTAG_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.payload
            }

        case REMOVETAG_FETCH:
            return {
                ...state,
                fetching: true
            }
        case REMOVETAG_SUCCESS:
            return {
                ...state,
                error: null,
                fetching: false,
                refresh: true,

            }
        case REMOVETAG_FAILURE:
            return {
                ...state,
                fetching: false,
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
                userPosts: action.payload
            }
        case USER_POSTS_FAIL:
            return {
                ...state,
                fetching: false,
                userPosts: [],
                error: action.payload
            }

        default:
            return state;
    }
};

export default reducer;