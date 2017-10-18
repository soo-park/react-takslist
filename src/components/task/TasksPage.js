import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'; // to connect redux with react
import { bindActionCreators } from 'redux'; // helper not to manually wrap function in dispatch
import * as taskActions from '../../actions/taskActions';
import TaskList from './TaskList';
import { browserHistory } from 'react-router';
import TextInput from '../common/TextInput';
import Sort from './Sort.js';
import $ from 'jquery';
import uniqid from 'uniqid';

class TasksPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      turnDisplayOn: false,
      task: {id: '', title: '', category: ''},
      errors: {},
      addTaskButton: true,
      saveButton: false,
      isModalOpen: false
    };
    this.rendirectToAddTaskPage = this.rendirectToAddTaskPage.bind(this);
    this.toggleAddTaskDisplay = this.toggleAddTaskDisplay.bind(this);
    this.updateTaskState = this.updateTaskState.bind(this);
    this.saveTask = this.saveTask.bind(this);
  }

  taskRow(task, index) {
    return <div key={index}>{task.title}</div>;
  }

  rendirectToAddTaskPage() {
    browserHistory.push('/task');
  }

  toggleAddTaskDisplay(event) {
    event.preventDefault();
    this.setState({turnDisplayOn: !this.state.turnDisplayOn});
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

  saveTask(event) {
    event.preventDefault();
    let title = document.getElementsByClassName('form-control')[0].value;
    let category = document.getElementsByClassName('form-control')[1].value;
    let id = uniqid();
    let task = {id: id, category: category, title: title};

    this.props.actions.saveTask(task);
    this.setState({
      tasks: Object.freeze(this.props.tasks.concat(task)),
      task:  {id: '', title: '', category: ''},
      turnDisplayOn: false,
      isModalOpen: true
    });
  }

  render() {
    const {tasks} = this.props;
    const onSave = this.props.actions.saveTask;
    
    const display = this.state.turnDisplayOn ?  
      (<div className="task-card">
        <div className="card-space" />
        <TextInput name="title" placeholder="Title" value={this.state.task.title} onChange={this.updateTaskState} error={this.state.errors.title}/>
        <TextInput name="category" placeholder="Category" value={this.state.task.category} onChange={this.updateTaskState} error={this.state.errors.category}/>
        <input
          type="submit"
          value="Save"
          className={this.state.saveButton? "btn btn-primary pointer-cursor pull-right" : "btn btn-secondary disabled pointer-cursor pull-right"}
          onClick={this.saveTask}
        />
      </div>)
    : null;

    const modal = this.state.isModalOpen ?
    (
      <div>
        <div>Moha</div>
      </div>
    )
    : null;

    return (
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
              className="btn btn-primary pointer-cursor"
              onClick={this.saveTask}/>
          </span>
        </div>
        {display}
        <TaskList />
      </div>
    );
  }
}

TasksPage.propTypes = {
  tasks: React.PropTypes.array.isRequired,
  task: PropTypes.object.isRequired,  
  actions: React.PropTypes.object.isRequired
};

// to avoid variable authentication error for context
TasksPage.contextTypes = {
  router: PropTypes.object
};

// react-router's mapStateToProps accepts two parameters
// state is in redux store
function mapStateToProps(state, ownProps) {
  let task = {id: '', title: '', category: ''};  
  return {
    tasks: state.tasks,
    task: task // pulls tasks in roodReducer as a state to here
  };
}

// bindActionCreators will go through taskActions file and wrap each actions in dispatch on call
// all actions will sit on this.props.actions
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(taskActions, dispatch)
  };
}
// connect retturns function
export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);
