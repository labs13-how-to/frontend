import {
  USER_FETCH,
  USER_SUCCESS,
  USER_FAIL,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../actions";

const initialState = {
  user: { message: "wow" },
  fetching: false,
  adding: false,
  error: null,
  isRegistered: false,
  isLoggedIn: false,
  token: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_FETCH:
      return {
        ...state,
        fetching: true
      };
    case USER_SUCCESS:
      return {
        ...state,
        error: null,
        fetching: false,
        user: action.payload
      };
    case USER_FAIL:
      return {
        ...state,
        fetching: false,
        error: action.payload
      };

    case REGISTER_START:
      return {
        ...state,
        isRegistered: true,
        error: null
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isRegistered: false,
        isLoggedIn: true,
        user_id: action.payload.id,
        error: null
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isRegistered: false,
        error: action.payload
      };

    case LOGIN_START:
      return {
        ...state,
        error: null
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user_id: action.payload.id,
        isLoggedIn: true,
        isRegistered: true
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
