import {
    TEST,
    FETCH, SUCCESS, SUCCESS_ID, FAILURE,
    ADD_FETCH, ADD_SUCCESS, ADD_FAILURE,
    POST_DELETE_START, POST_DELETE_SUCCESS, POST_DELETE_FAILURE,
    UPDATE_FETCH, UPDATE_SUCCESS, UPDATE_FAILURE,
    USER_POSTS_FETCH, USER_POSTS_SUCCESS, USER_POSTS_FAIL
} from "../actions";
import {
    ADDSTEP_FETCH, ADDSTEP_SUCCESS, ADDSTEP_FAILURE,
    GETTAG_FETCH, GETTAG_SUCCESS, GETTAG_FAILURE,
    STEP_DELETE_START, STEP_DELETE_SUCCESS, STEP_DELETE_FAILURE,
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
    deleting: false,
    refresh: false,
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
                currPost: action.payload,
                refresh: false,
            }
        case FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.payload
            }

        //add Post conditions ============
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
        //delete post conditions
        case POST_DELETE_START:
            return {
                ...state,
                deleting: true,
                error: null,
            }
        case POST_DELETE_SUCCESS:
            return {
                ...state,
                deleting: false,
                refresh: true,
            }
        case POST_DELETE_FAILURE:
            return {
                ...state,
                deleting: false,
            }
        //UPDATE Post conditions ============
        case UPDATE_FETCH:
            return {
                ...state,
                updating: true
            }
        case UPDATE_SUCCESS:
            return {
                ...state,
                error: null,
                updating: false,
                message: action.payload.id
            }
        case UPDATE_FAILURE:
            return {
                ...state,
                updating: false,
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

        case STEP_DELETE_START:
            return {
                ...state,
                deleting: true,
                error: null,
            }
        case STEP_DELETE_SUCCESS:
            return {
                ...state,
                deleting: false,
                refresh: true,
                error: null,
            }
        case STEP_DELETE_FAILURE:
            return {
                ...state,
                deleting: false,
                error: action.payload,
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