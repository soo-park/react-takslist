import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'; // to connect redux with react
import { bindActionCreators } from 'redux'; // helper not to manually wrap function in dispatch
import * as taskActions from '../../actions/taskActions';


const TaskListRow = ({task, deleteTask}) => {
  return (
    <div className="task-card">
      <div className="card-space" />
      <div>
        <i className="fa fa-ellipsis-v"/>
        <i className="fa fa-ellipsis-v"/>
        <i className="fa fa-ellipsis-v"/>
        <span className="left-padding">Task: </span>
        <Link to={'/task/' + task.id}>{task.title}</Link>
        <i className="fa fa-trash-o pull-right pointer-cursor"></i>
      </div>
      <div className="card-space" />
      <div className="card-body">
        <div>Category: {task.category}</div>
      </div>
    </div>
  );
};

TaskListRow.propTypes = {
  task: PropTypes.object.isRequired
};

// react-router's mapStateToProps accepts two parameters
// state is in redux store
function mapStateToProps(state, ownProps) {
  let task = {id: '', title: '', category: ''};  
  return {
    tasks: state.tasks
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
export default connect(mapStateToProps, mapDispatchToProps)(TaskListRow);
