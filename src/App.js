import React, { Component } from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import TaskListRow from './TaskListRow.js';
import TextInput from './common/TextInput.js';
import uniqid from 'uniqid';

const SortableItem = SortableElement(({value, deleteTask}) =>
  {
    return (
      <li>
        <TaskListRow task={value} deleteTask={deleteTask}/>
      </li>
    )
  }
);

const SortableList = SortableContainer(({items, deleteTask}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} deleteTask={deleteTask} index={index} value={value} />
      ))}
    </ul>
  );
});

const database = [
  {id: '0', title: 'id 0', category: ''}, 
  {id: '1', title: 'id1', category: ''}, 
  {id: '2', title: 'id2', category: ''}
];

class App extends Component {
  state = {
    items: [],
    turnDisplayOn: false,
    task: {id: '', title: '', category: ''},
    errors: {},
    addTaskButton: true,
    saveButton: false,
    isModalOpen: false
  };
  
  componentWillMount() {
    this.setState({items: database.slice()});
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };

  taskRow(task, index) {
    return <div key={index}>{task.title}</div>;
  }


  toggleAddTaskDisplay(event) {
    event.preventDefault();
    this.setState({turnDisplayOn: !this.state.turnDisplayOn});
  }

  // change handler for form field
  updateTaskState(event) {
    const field = event.target.name;
    let task = this.state.task;
    task[field] = event.target.value;
    return this.setState({
      task: task,
      saveButton: true
    });
  }

  saveTask(event) {
    event.preventDefault();
    let title = document.getElementsByClassName('form-control')[0].value;
    let category = document.getElementsByClassName('form-control')[1].value;
    let id = uniqid();
    let task = {id: id, category: category, title: title};

    this.setState({
      tasks: Object.freeze(this.state.tasks.concat(task)),
      task:  {id: '', title: '', category: ''},
      turnDisplayOn: false,
      isModalOpen: true
    });
  }

  deleteTask(id) {
    for (let i = 0; i < this.state.items.length; i++) {
      if (this.state.items[i].id === id) {
        this.setState(
          { items : this.state.items.push(
            {
              id:"gdfs", titile: "asdf"
            }
          )}
        );
      }
    }
  }

  render() {

    const display = this.state.turnDisplayOn ?  
    (<div className="task-card">
      <div className="card-space" />
      <TextInput name="title" placeholder="Title" value={this.state.task.title} onChange={this.updateTaskState.bind(this)} error={this.state.errors.title}/>
      <TextInput name="category" placeholder="Category" value={this.state.task.category} onChange={this.updateTaskState.bind(this)} error={this.state.errors.category}/>
      <input
        type="submit"
        value="Save"
        className={this.state.saveButton? "btn btn-primary pointer-cursor pull-right" : "btn btn-secondary disabled pointer-cursor pull-right"}
        onClick={this.saveTask.bind(this)}
      />
    </div>)
    : null;
  
    const modal = this.state.isModalOpen ?
    (
      <div>
        <div>Moha</div>
      </div>
    )
    : null;

    return (
      <div className="container-fluid">
        <nav></nav>
        <div className="task-list center-children">
        <div className="tasklist-top">
          <span className="pull-left">Tasks</span>
          <span className="pull-right">
            <input
              type="submit"
              value="Add Task"
              className={this.state.addTaskButton? "btn btn-secondary pointer-cursor" : "btn btn-secondary disabled pointer-cursor"}
              onClick={this.toggleAddTaskDisplay.bind(this)}/>

            <input
              type="submit"
              value="Save"
              className="btn btn-primary pointer-cursor"
              onClick={this.saveTask.bind(this)}/>
          </span>
        </div>
        {display}
       <SortableList items={this.state.items} deleteTask={this.deleteTask.bind(this)} onSortEnd={this.onSortEnd} />
       {modal}
      </div>
      </div>

    )
  }
}

export default App;
