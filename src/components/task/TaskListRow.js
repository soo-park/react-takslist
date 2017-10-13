import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const TaskListRow = ({task}) => {
  return (
    <div className="task-card">
      <div className="card-space" />
      <div>
        <i className="fa fa-ellipsis-v"/>
        <i className="fa fa-ellipsis-v"/>
        <i className="fa fa-ellipsis-v"/>
        <span className="left-padding">Task:</span>
        <Link to={'/task/' + task.id}>{task.title}</Link>
        <i className="fa fa-trash-o pull-right"></i>
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

export default TaskListRow;
