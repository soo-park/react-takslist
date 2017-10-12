import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const TaskListRow = ({task}) => {
  return (
    <div className="jumbotron task-card">
      <div> 
        Task:
        <Link to={'/task/' + task.id}>{task.title}</Link>
        <i className="fa fa-trash-o"></i>
      </div>
      <div>
        <div>Status: <a href={task.watchHref} target="_blank">Watch</a></div>
        <div>Order: {task.orderId}</div>
        <div>Category: {task.category}</div>
        <div>Detail: {task.length}</div>
      </div>
    </div>
  );
};

TaskListRow.propTypes = {
  task: PropTypes.object.isRequired
};

export default TaskListRow;
