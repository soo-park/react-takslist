import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TaskList from './TaskList.jsx';
import TextInput from './common/TextInput';
import uniqid from 'uniqid';
import axios from 'axios';
import $ from 'jquery';


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
      saveMessage: "",
      modalColor: "green",
      y: 0,
      sorted: false
    };
    this.toggleAddTaskDisplay = this.toggleAddTaskDisplay.bind(this);
    this.processObjToArray = this.processObjToArray.bind(this);
    this.updateTaskState = this.updateTaskState.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.mouseUpHandle = this.mouseUpHandle.bind(this);
  }

  // lifecycle for getting initial data
  componentWillMount() {
    this.getRemoteData();
  }

  mouseUpHandle(e) {
    let listItems = $('.button-container');
    let currentTasks = this.state.tasks.slice();
    let currentOrder = [];
    let stateOrder = [];
    let itemsById = {};

    // get the items, get the id
    for (let i = 0; i < listItems.length; i++) {
      currentOrder.push(($('.button-container')[i].id.slice(5, )));
    }

    for (let i = 0; i < this.state.tasks.length; i++) {
      let key = this.state.tasks[i].id;
      stateOrder.push(key);
      itemsById[key] = this.state.tasks[i];
    }

    if (currentOrder.join() !== stateOrder.join()) {
      var tasksToUpdate = [];
      for (let i = 0; i < currentOrder.length; i++) {
        tasksToUpdate.push(itemsById[currentOrder[i]])        
      }
      this.setState({tasks: tasksToUpdate});
      this.saveToRemote();
      this.setState({addTaskButton: true});
    }
  }

  // display methods
  toggleAddTaskDisplay(event) {
    event.preventDefault();
    this.setState({turnDisplayOn: !this.state.turnDisplayOn});
  }

  // helper for processing object to array
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

  // API call helper
  getRemoteData() {
    axios.get("http://cfassignment.herokuapp.com/spark/tasks")
    .then(response => {
      if(response.status === 200 && response.data.tasks) {
        if(response.data.tasks.length !== 0) {
          this.setState({
            saveMessage: "Initial loading successful",
            tasks: this.processObjToArray(response.data.tasks),
            isModalOpen: true,
            modalColor: "green"
          });
          this.setState({tasks: this.state.tasks.reverse()});          
        }
        else {
          this.setState({
            saveMessage: "There is no message saved in the server",
            isModalOpen: true,
            modalColor: "green"
          });
        }
      } else if (response.status === 400) {
        this.setState({
          saveMessage: "[ERROR] Initial loading failed (status:400)",
          isModalOpen: true,
          modalColor: "red"
        }); 
      } else {
        this.setState({
          saveMessage: "[ERROR] Initial loading failed",
          modalColor: "red"
        });
      }
    })
    .catch(error => {
      this.setState({
        task: {id: '', title: '', category: ''},
        saveMessage: "[ERROR] Initial loading failed",
        modalColor: "red"
      });
    })
  }

  // API call helper
  saveToRemote() {
    axios.post("http://cfassignment.herokuapp.com/spark/tasks", { tasks: this.state.tasks })
    .then(response => {
        if(response.status === 400) {
          this.setState({
            task: {id: '', title: '', category: ''},
            saveSuccessful: false,
            saveMessage: "[ERROR] Post failed with status code 400",
            modalColor: "red",
            isModalOpen: true,
            addTaskButton: false,
            saveButton: true
          });
        } else if(response.status === 200 && response.data.tasks) {
          this.setState({
            task: {id: '', title: '', category: ''},
            saveSuccessful: true,
            saveMessage: "Post successful",
            saveButton: false,
            isModalOpen: true,
            addTaskButton: false,
            modalColor: "green",
            turnDisplayOn: false
          });
        } else if(response.status === 200 && !response.data.tasks) {
          this.setState({
            task: {id: '', title: '', category: ''},
            saveSuccessful: false,
            saveMessage: "[ERROR] Post failsd with status code 200",
            modalColor: "red",
            isModalOpen: true,
            addTaskButton: false,
            saveButton: true
          });
        } else {
          this.setState({
            task: {id: '', title: '', category: ''},
            saveSuccessful: false,
            saveMessage: "[ERROR] Post failed",
            modalColor: "red",
            isModalOpen: true,
            addTaskButton: false,
            saveButton: true
          });
        }
      } 
    )
    .catch(error => {
      this.setState({
        saveSuccessful: false,
        saveMessage: "[ERROR] Post failed",
        modalColor: "red",
        isModalOpen: true,
        addTaskButton: false,
        saveButton: true
      });
    })
  }

  // save button rig
  saveTask(event) {
    event.preventDefault();
    this.saveToRemote()
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
        let tasks = this.state.tasks.reverse().concat([task]).reverse();
        this.saveToRemote();
        if (this.state.tasks.length === tasks.length) {
          this.setState({
            tasks: tasks
          });
        } else {
          this.setState({
            tasks: tasks,
            isModalOpen: true,
            saveMessage: "System and state mismatch. Save again."
          })
        }
      }
    }
  }

  // delete trash can rig
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

  // display helper for message modal
  closeModal() {
    this.setState({
      isModalOpen: false,
      saveSuccessful: false,
      addTaskButton: true
    })
  }

  // render function for rendering dom
  render() {

    const display = this.state.turnDisplayOn ?  
    (<div className="task-card">
      <div className="card-space" />
      <TextInput name="title" placeholder="Title" value={this.state.task.title} onChange={this.updateTaskState} error={this.state.errors.title}/>
      <TextInput name="category" placeholder="Category" value={this.state.task.category} onChange={this.updateTaskState} error={this.state.errors.category}/>
    </div>)
    : null;
  
    let modalClass = "floater pull-right " + this.state.modalColor;
    const modal = this.state.isModalOpen ?
    (
      <div>
        <div className={modalClass}>
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
                onClick={this.state.addTaskButton? this.toggleAddTaskDisplay : () => this.setState({saveMessage: "Close this message to re-activate add task button", modalColor: "red"})}/>

              <input
                type="submit"
                value="Save"
                className={this.state.saveButton? "btn btn-primary pointer-cursor pull-right" : "btn btn-secondary disabled pointer-cursor pull-right"}
                onClick={this.state.saveButton? this.saveTask : () => this.setState({saveMessage: "No state change to save", isModalOpen: true, modalColor: "red"})}/>
            </span>
          </div>
          {display}
          {modal}
          <TaskList tasks={this.state.tasks} deleteTask={this.deleteTask} onMouseDown={this.mouseDownHandle} onMouseUp={this.mouseUpHandle}/>
        </div>
      </div>
    );
  }
}

export default App;
