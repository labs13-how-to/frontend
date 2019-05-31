import { USER_FETCH, USER_SUCCESS, USER_FAIL } from '../actions';

const initialState =
{
    user: { message: 'wow' },
    fetching: false,
    adding: false,
    error: null,
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


        default:
            return state;
    }
};

export default reducer;