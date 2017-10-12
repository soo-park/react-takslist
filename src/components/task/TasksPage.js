import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'; // to connect redux with react
import { bindActionCreators } from 'redux'; // helper not to manually wrap function in dispatch
import * as taskActions from '../../actions/taskActions';
import TaskList from './TaskList';
import { browserHistory } from 'react-router';

class TasksPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.rendirectToAddTaskPage = this.rendirectToAddTaskPage.bind(this);
  }

taskRow(task, index) {
  return <div key={index}>{task.title}</div>;
}

rendirectToAddTaskPage() {
  browserHistory.push('/task');
}

  render() {
    const {tasks} = this.props;
    return (
      <div>
        <h3>Tasks</h3>
        <input
          type="submit"
          value="Add Task"
          className="btn btn-secondary"
          onClick={this.rendirectToAddTaskPage}/>

          <input
          type="submit"
          value="Save"
          className="btn btn-primary"
          onClick={this.rendirectToAddTaskPage}/>
        <TaskList tasks={tasks}/>
      </div>
    );
  }
}

TasksPage.propTypes = {
  tasks: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired
};

// react-router's mapStateToProps accepts two parameters
// state is in redux store
function mapStateToProps(state, ownProps) {
  return {
    tasks: state.tasks // pulls tasks in roodReducer as a state to here
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
