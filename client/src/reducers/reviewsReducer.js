import {
    REVIEW_FETCH_START, REVIEW_FETCH_SUCCESS, REVIEW_FETCH_FAILURE,
    REVIEW_ADD_START, REVIEW_ADD_SUCCESS, REVIEW_ADD_FAILURE,
    REVIEW_UPDATE_START, REVIEW_UPDATE_SUCCESS, REVIEW_UPDATE_FAILURE,
    REVIEW_DELETE_START, REVIEW_DELETE_SUCCESS, REVIEW_DELETE_FAILURE,
} from "../actions";

const initialState = {
    tech: [],
    reviews: [],
    fetching: false,
    adding: false,
    updating: false,
    deleting: false,
    error: null,
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        //Get
        case REVIEW_FETCH_START:
        case REVIEW_FETCH_SUCCESS:
        case REVIEW_FETCH_FAILURE:
        
        //Post
        case REVIEW_ADD_START:
        case REVIEW_ADD_SUCCESS:
        case REVIEW_ADD_FAILURE:

        //Update
        case REVIEW_UPDATE_START:
        case REVIEW_UPDATE_SUCCESS:
        case REVIEW_UPDATE_FAILURE:

        //Delete
        case REVIEW_DELETE_START:
        case REVIEW_DELETE_SUCCESS:
        case REVIEW_DELETE_FAILURE:
    };
};

export default reducer;