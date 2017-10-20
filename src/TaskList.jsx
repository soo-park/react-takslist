import React from 'react';
import TaskListRow from './TaskListRow.jsx';

const TaskList = ({tasks, deleteTask, onMouseDown, onMouseUp}) => {
  return (
    <ui id="sortable" ref={sortable => this.sortable = sortable}>
      {tasks.length ? tasks.map(task => 
        <TaskListRow key={task.id} task={task} deleteTask={deleteTask} onMouseDown={onMouseDown} onMouseUp={onMouseUp}/>
      ): <div className="error">No tasks found</div>}
    </ui>
  );
};

// connect retturns function
export default TaskList;