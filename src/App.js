import React, { Component } from 'react';
import TaskList from './TaskList';
import TextInput from './common/TextInput';
import uniqid from 'uniqid';
import axios from 'axios';

const database = {
  0: {
    id: "0",
    title: "This is 0",
    category: "."
  },
  1: {
    id: "1",
    title: "This is 1",
    category: ".. "
  },
  2: {
    id: "2",
    title: "This is 2",
    category: ".. "
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      turnDisplayOn: false,
      task: {id: '', title: '', category: ''},
      errors: {},
      addTaskButton: true,
      saveButton: false,
      isModalOpen: false,
      saveSuccessful: false,
      saveMessage: ""
    };
    this.toggleAddTaskDisplay = this.toggleAddTaskDisplay.bind(this);
    this.processObjToArray = this.processObjToArray.bind(this);
    this.updateTaskState = this.updateTaskState.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    this.setState({tasks: this.processObjToArray(database).reverse()});
    axios.get("http://cfassignment.herokuapp.com/spark/tasks")
    .then(resolve => console.log(resolve.data.tasks))
    .catch(error => console.log(error))
  }

  toggleAddTaskDisplay(event) {
    event.preventDefault();
    this.setState({turnDisplayOn: !this.state.turnDisplayOn});
  }

  processObjToArray(obj) {
    let tasksArray = [];
    for (let key in obj) {
      tasksArray.push(obj[key]);
    }
    return tasksArray;
  }

  // change handler for form field
  updateTaskState(event) {
    const field = event.target.name;
    let task = this.state.task;
    task[field] = event.target.value;
    return this.setState({
      task: task,
      saveButton: true
    });
  }

  saveToRemote() {
    axios.post("http://cfassignment.herokuapp.com/spark/tasks", this.state.tasks)
    .then(response => {
        if(response.status === 400) {
          this.setState({
            task: {id: '', title: '', category: ''},
            saveSuccessful: false,
            saveMessage: "[ERROR] Post failed with status code 400" 
          });
        } else if(response.status === 200 && response.data.tasks) {
          this.setState({
            task: {id: '', title: '', category: ''},
            saveSuccessful: true,
            tasks: response.data.tasks, 
            saveMessage: "Post successful" 
          });
        } else if(response.status === 200 && !response.data.tasks) {
          this.setState({
            task: {id: '', title: '', category: ''},
            saveSuccessful: false,
            saveMessage: "[ERROR] Post failsd with status code 200"
          });
        } else {
          this.setState({
            task: {id: '', title: '', category: ''},
            saveSuccessful: false,
            saveMessage: "[ERROR] Post failed"
          });
        }
      } 
    )
    .catch(error => console.log(error))
  }

  saveTask(event) {
    event.preventDefault();
    let title = document.getElementsByClassName('form-control')[0].value;
    let category = document.getElementsByClassName('form-control')[1].value;
    let id = uniqid();
    let task = {id: id, category: category, title: title};

    this.setState({
      tasks: this.state.tasks.reverse().concat([task]).reverse(),
      turnDisplayOn: false,
      isModalOpen: true,
      saveButton: false
    });
    this.saveToRemote()
  }

  deleteTask(id) {
    let tasks = this.state.tasks;
    for (let i = 0; i < tasks.length; i++) {
      if(tasks[i].id === id) {
        tasks.splice(i, 1)
      }
    }
    this.setState({tasks: tasks});
    this.saveToRemote()
  }

  closeModal() {
    this.setState({
      isModalOpen: false,
      saveSuccessful: false
    })
  }

  render() {

    const display = this.state.turnDisplayOn ?  
    (<div className="task-card">
      <div className="card-space" />
      <TextInput name="title" placeholder="Title" value={this.state.task.title} onChange={this.updateTaskState} error={this.state.errors.title}/>
      <TextInput name="category" placeholder="Category" value={this.state.task.category} onChange={this.updateTaskState} error={this.state.errors.category}/>
    </div>)
    : null;
  
    const modal = this.state.isModalOpen ?
    (
      <div>
        <div className="floater pull-right">
          {this.state.saveMessage}
          <span className="pull-right" onClick={this.closeModal}>X</span>
        </div>
      </div>
    )
    : null;

    return (
      <div>
        <nav></nav>
        <div className="task-list center-children">
          <div className="tasklist-top">
            <span className="pull-left">Tasks</span>
            <span className="pull-right">
              <input
                type="submit"
                value="Add Task"
                className={this.state.addTaskButton? "btn btn-secondary pointer-cursor" : "btn btn-secondary disabled pointer-cursor"}
                onClick={this.toggleAddTaskDisplay}/>

              <input
                type="submit"
                value="Save"
                className={this.state.saveButton? "btn btn-primary pointer-cursor pull-right" : "btn btn-secondary disabled pointer-cursor pull-right"}
                onClick={this.saveTask}/>
            </span>
          </div>
          {display}
          {modal}
          <TaskList tasks={this.state.tasks} deleteTask={this.deleteTask}/>
        </div>
      </div>
    );
  }
}

export default App;
