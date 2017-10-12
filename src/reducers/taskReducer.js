import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function taskReducer(state = initialState.tasks, action) {
  switch (action.type) {
  case types.LOAD_TASKS_SUCCESS:
    return action.tasks;
  
  case types.CREATE_TASK_SUCCESS:
    return [
      ...state,
      Object.assign({}, action.task)
    ];
    
  case types.UPDATE_TASK_SUCCESS:
    return [
      ...state.filter(task => task.id !== action.task.id),
      Object.assign({}, action.task)
    ];

  default:
    return state;
  }
}