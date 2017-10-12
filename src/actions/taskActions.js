import * as types from './actionTypes';
import taskApi from '../api/mockTaskApi';

// action creator for tasks
export function loadTasksSuccess(tasks) {
  return { type: types.LOAD_TASKS_SUCCESS, tasks };
}

export function createTaskSuccess(task) {
  return { type: types.CREATE_TASK_SUCCESS, task };
}

export function updateTaskSuccess(task) {
  return { type: types.UPDATE_TASK_SUCCESS, task };
}

// Tunk for loading tasks
export function loadTasks() {
  return function(dispatch) {
    return taskApi.getAllTasks().then(tasks => {
      // dispatchEvent(loadTasksSuccess(tasks));
      dispatch(loadTasksSuccess(tasks));
    }).catch(error => {
      throw(error);
    });
  };
}

// not used here, but you can get Redux state using this thunk
export function saveTask(task) {
  return function (dispatch, getState) {
    return taskApi.saveTask(task).then(savedTask => {
      task.id ? dispatch(updateTaskSuccess(savedTask)) :
        dispatch(createTaskSuccess(savedTask));
    }).catch(error => {
      throw(error);
    });
  };
}
