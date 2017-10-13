import React, { PropTypes } from 'react';
import TaskListRow from './TaskListRow';

const TaskList = ({tasks}) => {
  return (
    <div>
      {tasks.map(task => 
        <TaskListRow key={task.id} task={task} />
      )}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired
};

export default TaskList;