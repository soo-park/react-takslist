import React from 'react';

const TaskListRow = ({task, deleteTask}) => {
  return (
    <div className="task-card">
      <div className="card-space" />
      <div>
        <i className="fa fa-ellipsis-v"/>
        <i className="fa fa-ellipsis-v"/>
        <i className="fa fa-ellipsis-v"/>
        <span className="left-padding">Task: </span>
        <span>{task.title}</span>
        <i className="fa fa-trash-o pull-right pointer-cursor" onClick={() => deleteTask(task.id)}></i>
      </div>
      <div className="card-space" />
      <div className="card-body">
        <div>Category: {task.category}</div>
      </div>
    </div>
  );
};

export default TaskListRow;
