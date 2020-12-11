import { combineReducers } from 'redux';
import tasksReducer from './tasksReducer';
import toggleReducer from './toggleReducer';
import editTaskReducer from './editTaskReducer';
const myReducer = combineReducers({
    tasksReducer,
    toggleReducer,
    editTaskReducer
})

export default myReducer