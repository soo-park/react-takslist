import {combineReducers} from 'redux';
import tasks from './taskReducer';
import orders from './orderReducer';

const rootReducer = combineReducers({
  tasks,
  orders
});

export default rootReducer;
