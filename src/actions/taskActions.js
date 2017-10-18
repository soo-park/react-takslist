import * as types from './actionTypes';
import taskApi from '../api/mockTaskApi';
import axios from 'axios';

// action creator for tasks
export function loadTasksSuccess(tasks) {
  return { type: types.LOAD_TASKS_SUCCESS, tasks };
}

export function createTaskSuccess(task) {
  return { type: types.CREATE_TASK_SUCCESS, task };
}

export function updateTaskSuccess(tasks) {
  return { type: types.UPDATE_TASK_SUCCESS, tasks };
}

export function deleteTaskSuccess(tasks) {
  return { type: types.DELETE_TASK_SUCCESS, tasks };
}

// // // /* Thunk for mock API */ 
export function loadTasks() {
  return function(dispatch) {
    return taskApi.getAllTasks().then(response => {
      let tasks = response.data.tasks;
      let tasksArray = [];
      for (let key in tasks) {
        tasksArray.push(tasks[key]);
      }
      dispatch(loadTasksSuccess(tasksArray));
    }).catch(error => {
      throw(error);
    });
  };
}

// not used here, but you can get Redux state using this thunk
export function saveTask(task) {
  return function(dispatch) {
    return taskApi.getAllTasks().then(response => {
      console.log(task);
      let tasks = response.data.tasks;
      let tasksArray = [];
      for (let key in tasks) {
        tasksArray.push(tasks[key]);
      }
      Object.freeze(tasksArray.concat(task));
      dispatch(createTaskSuccess(tasksArray));
    }).catch(error => {
      throw(error);
    });
  };
}

// // this is the actual call to the herokuapp given
// export function loadTasks() {
//   const request = axios.get('http://cfassignment.herokuapp.com/spark/tasks');

//   return function (dispatch, getState) {
//     return request
//       .then(tasks => {
//         console.log(tasks);
//         dispatch(loadTasksSuccess(tasks.data.tasks));
//       })
//       .catch(error => {
//       throw(error);
//     });
//   };
// }

// export function saveTasks(tasks) {
//   const request = axios.post('http://cfassignment.herokuapp.com/spark/tasks',
//     tasks
//   );
//     return function (dispatch, getState) {
//       return request
//         .then(tasks => {
//           dispatch(loadTasksSuccess(tasks.data.tasks));
//         })
//         .catch(error => {
//         throw(error);
//       });
//     };
// }
