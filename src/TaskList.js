import React from 'react';
import TaskListRow from './TaskListRow';

const TaskList = ({tasks, deleteTask}) => {
  return (
    <ui id="sortable">
      {tasks.length ? tasks.map(task => 
        <TaskListRow key={task.id} task={task} deleteTask={deleteTask}/>
      ): <div className="error">No tasks found</div>}
    </ui>
  );
};

// connect retturns function
export default TaskList;