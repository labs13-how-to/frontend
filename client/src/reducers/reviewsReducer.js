import {
  REVIEW_FETCH_START,
  REVIEW_FETCH_SUCCESS,
  REVIEW_FETCH_FAILURE,
  REVIEW_ADD_START,
  REVIEW_ADD_SUCCESS,
  REVIEW_ADD_FAILURE,
  REVIEW_UPDATE_START,
  REVIEW_UPDATE_SUCCESS,
  REVIEW_UPDATE_FAILURE,
  REVIEW_DELETE_START,
  REVIEW_DELETE_SUCCESS,
  REVIEW_DELETE_FAILURE
} from "../actions";

const initialState = {
  posts: [],
  reviews: [],
  fetching: false,
  adding: false,
  updating: false,
  deleting: false,
  refresh: false,
  refreshReview: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //Get
    case REVIEW_FETCH_START:
      return {
        ...state,
        fetching: true,
        refresh: false,
        refreshReview: false,
        error: null
      };
    case REVIEW_FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        reviews: action.payload,
        error: null
      };
    case REVIEW_FETCH_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload
      };

    //Post
    case REVIEW_ADD_START:
      return {
        ...state,
        adding: true,
        error: null
      };
    case REVIEW_ADD_SUCCESS:
      return {
        ...state,
        adding: false,
        reviews: [...state.reviews, action.payload],
        error: null
      };
    case REVIEW_ADD_FAILURE:
      return {
        ...state,
        adding: false,
        error: action.payload
      };

    //Update
    case REVIEW_UPDATE_START:
      return {
        ...state,
        updating: true,
        error: null
      };
    case REVIEW_UPDATE_SUCCESS:
      return {
        ...state,
        updating: false,
        refreshReview: true,
        error: null
      };
    case REVIEW_UPDATE_FAILURE:
      return {
        ...state,
        updating: false,
        error: null
      };

    //Delete
    case REVIEW_DELETE_START:
      return {
        ...state,
        deleting: true,
        error: null
      };
    case REVIEW_DELETE_SUCCESS:
      return {
        ...state,
        deleting: false,
        refresh: true
      };
    case REVIEW_DELETE_FAILURE:
      return {
        ...state,
        deleting: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default reducer;