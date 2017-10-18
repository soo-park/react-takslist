import delay from './delay';

// const tasks = null;
const tasks = {
  0: {
    id: "0",
    title: "This is the item number zero, order Id 0",
    category: "Lorem ipsum "
  }
};

let response = {
  data: {tasks: tasks},
  status: 200, 
  statusText: "OK", 
  headers: {}, 
  config: {},
  request: {}
};

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

const generateId = (task) => {
  return replaceAll(task.title, ' ', '-');
};

class TaskApi {
  static getAllTasks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(response);
      }, delay);
    });
  }

  static saveTasks(tasks) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        tasks = response.data.tasks;
        response.data.tasks = tasks;
        resolve(response);
      }, delay);
    });
  }
}

export default TaskApi;
