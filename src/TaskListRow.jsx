import React, {Component} from 'react';

class TaskListRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLoaded: true
    };
  }

  render() {
    let {task, deleteTask, onMouseDown, onMouseUp} = this.props;
    return (
      <li 
        className="task-card ui-state-default button-container" 
        ref="buttonContainer" 
        id={"item_" + task.id}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <div className="card-space" />
        <div>
          <i className="fa fa-ellipsis-v"/>
          <i className="fa fa-ellipsis-v"/>
          <i className="fa fa-ellipsis-v"/>
          <span className="left-padding task-title">TASK </span>
          <span className="left-padding ">{task.title}</span>
          <i className="fa fa-trash-o pull-right pointer-cursor" onClick={() => deleteTask(task.id)}></i>
        </div>
        <div className="card-space" />
        <div className="card-body">
          <div>{task.category}</div>
        </div>
      </li>
    );
  }  
};

export default TaskListRow;
