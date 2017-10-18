import React, { PropTypes } from 'react';
import TaskListRow from './TaskListRow';
import { connect } from 'react-redux'; // to connect redux with react
import { bindActionCreators } from 'redux'; // helper not to manually wrap function in dispatch
import * as taskActions from '../../actions/taskActions';

const TaskList = ({tasks, deleteTask}) => {
  return (
    <div>
      {tasks.length ? tasks.map(task => 
        <TaskListRow key={task.id} task={task} deleteTask={()=>deleteTask(task.id)}/>
      ): "No tasks found"}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired
};

TaskListRow.propTypes = {
  task: PropTypes.object.isRequired
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
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);