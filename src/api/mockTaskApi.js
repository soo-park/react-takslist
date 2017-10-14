import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const tasks = [
  {
    id: "board-001-item-0",
    title: "This is the item number zero, order Id 0",
    category: "Lorem ipsum "
  },
  {
    id: "board-001-item-1",
    title: "This is the item number one, order Id 1",
    category: "Lorem ipsum dolor sit amet consequat."
  },
  {
    id: "board-001-item-2",
    title: "This is the item number three, order Id 2",
    category: "Lorem ipsum dolor sit amet, commodo consequat."
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (task) => {
  return replaceAll(task.title, ' ', '-');
};

class TaskApi {
  static getAllTasks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], tasks));
      }, delay);
    });
  }

  static saveTask(task) {
    task = Object.assign({}, task); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minTaskTitleLength = 1;
        if (task.title.length < minTaskTitleLength) {
          reject(`Title must be at least ${minTaskTitleLength} characters.`);
        }

        if (task.id) {
          const existingTaskIndex = tasks.findIndex(a => a.id == task.id);
          tasks.splice(existingTaskIndex, 1, task);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new tasks in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          task.id = generateId(task);
          task.watchHref = `http://cfassignment.herokuapp.com/soo-park/tasks/${task.id}`;
          tasks.push(task);
        }

        resolve(task);
      }, delay);
    });
  }

  static deleteTask(taskId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfTaskToDelete = tasks.findIndex(task => {
          task.id == taskId;
        });
        tasks.splice(indexOfTaskToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default TaskApi;
