import React, { PropTypes } from 'react';
import TaskListRow from './TaskListRow';

const TaskList = ({tasks, deleteTask}) => {
  return (
    <div>
      {tasks.map(task => 
        <TaskListRow key={task.id} task={task} deleteTask={deleteTask}/>
      )}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired
};

export default TaskList;