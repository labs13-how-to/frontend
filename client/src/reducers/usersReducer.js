import { 
    USER_FETCH, USER_SUCCESS, USER_FAIL, 
    REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILURE,

} from '../actions';

const initialState =
{
    user: { message: 'wow' },
    fetching: false,
    adding: false,
    error: null,
    isRegistered: false,
    isLoggedIn: false,
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case USER_FETCH:
            return {
                ...state,
                fetching: true
            }
        case USER_SUCCESS:
            return {
                ...state,
                error: null,
                fetching: false,
                user: action.payload
            }
        case USER_FAIL:
            return {
                ...state,
                fetching: false,
                error: action.payload
            }

        case REGISTER_START:
            return {
                ...state,
                isRegistered: true,
                error: null,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isRegistered: false,
                isLoggedIn: true,
                user_id: action.payload.id,
                error: null
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                isRegistered: false,
                error: action.payload
            }

        default:
            return state;
    }
};

export default reducer;