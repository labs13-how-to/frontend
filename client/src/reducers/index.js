import { combineReducers } from 'redux';
import projectsReducer from './projectsReducer';
import usersReducer from './usersReducer';
import reviewsReducer from './reviewsReducer';

export default combineReducers({
    projectsReducer,
    usersReducer,
    reviewsReducer,
})