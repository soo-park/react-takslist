import React, { Component } from 'react';
import TaskList from './TaskList';
import TextInput from './common/TextInput';
import uniqid from 'uniqid';
import axios from 'axios';

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
    this.setState({tasks: this.processObjToArray(this.tasks).reverse()});
    axios.get("http://cfassignment.herokuapp.com/spark/tasks")
    .then(response => {
      if(response.status === 200 && response.data.tasks) {
        this.setState({
          saveMessage: "Initial loading successful",
          isModalOpen: true,
        });
      } else {
        this.setState({
          saveMessage: "[ERROR] Initial loading failed",
        });
      }
    })
    .catch(error => {
      this.setState({
        task: {id: '', title: '', category: ''},
        saveMessage: "[ERROR] Initial loading failed",
      });
    })
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
            saveMessage: "[ERROR] Post failed with status code 400",
            isModalOpen: true,
            addTaskButton: false
          });
        } else if(response.status === 200 && response.data.tasks) {
          this.setState({
            task: {id: '', title: '', category: ''},
            saveSuccessful: true,
            tasks: response.data.tasks, 
            saveMessage: "Post successful",
            saveButton: false,
            isModalOpen: true,
            addTaskButton: false
          });
        } else if(response.status === 200 && !response.data.tasks) {
          this.setState({
            task: {id: '', title: '', category: ''},
            saveSuccessful: false,
            saveMessage: "[ERROR] Post failsd with status code 200",
            isModalOpen: true,
            addTaskButton: false
          });
        } else {
          this.setState({
            task: {id: '', title: '', category: ''},
            saveSuccessful: false,
            saveMessage: "[ERROR] Post failed",
            isModalOpen: true,
            addTaskButton: false
          });
        }
      } 
    )
    .catch(error => {
      this.setState({
        task: {id: '', title: '', category: ''},
        saveSuccessful: false,
        saveMessage: "[ERROR] Post failed",
        isModalOpen: true,
        addTaskButton: false
      });
    })
  }

  saveTask(event) {
    event.preventDefault();
    if(document.getElementsByClassName('form-control')[0]) {
      let title = document.getElementsByClassName('form-control')[0].value;
      let category = document.getElementsByClassName('form-control')[1].value;
      let id = uniqid();
      let task = {id: id, category: category, title: title};
      if (this.state.tasks.length !== 0 && this.state.tasks[0].id === "-1") {
        this.setState({
          tasks: [task],
          turnDisplayOn: false,
          isModalOpen: true
        });        
      } else {
        this.setState({
          tasks: this.state.tasks.reverse().concat([task]).reverse(),
          turnDisplayOn: false,
          isModalOpen: true
        });
      }
    }
    this.saveToRemote()
  }

  deleteTask(id) {
    let tasks = this.state.tasks;
    for (let i = 0; i < tasks.length; i++) {
      if(tasks[i].id === id) {
        tasks.splice(i, 1)
      }
    }
    this.setState({
      tasks: tasks,
      saveButton: true
    });
    this.saveToRemote()
  }

  closeModal() {
    this.setState({
      isModalOpen: false,
      saveSuccessful: false,
      addTaskButton: true
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
                className={this.state.addTaskButton? "btn btn-primary pointer-cursor" : "btn btn-secondary disabled pointer-cursor"}
                onClick={this.state.addTaskButton? this.toggleAddTaskDisplay : () => this.setState({saveMessage: "Close this message to re-activate add task button"})}/>

              <input
                type="submit"
                value="Save"
                className={this.state.saveButton? "btn btn-primary pointer-cursor pull-right" : "btn btn-secondary disabled pointer-cursor pull-right"}
                onClick={this.state.saveButton? this.saveTask : () => this.setState({saveMessage: "No state change to save", isModalOpen: true})}/>
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
