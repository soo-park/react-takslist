import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as taskActions from '../../actions/taskActions';
import TaskForm from './TaskForm';

class ManageTaskPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      task: Object.assign({}, this.props.task),
      errors: {}
    };

    this.updateTaskState = this.updateTaskState.bind(this);
    this.saveTask = this.saveTask.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    alert(nextProps.task);
    if (this.props.task.id != nextProps.task.id) {
      this.setState({task: Object.assign({}, nextProps.task)});
    }
  }

  // change handler for form field
  updateTaskState(event) {
    const field = event.target.name;
    let task = this.state.task;
    task[field] = event.target.value;
    return this.setState({task: task});
  }

  saveTask(event) {
    event.preventDefault();
    this.props.actions.saveTask(this.state.task);
    // context is a global variable for React Router and Redux
    // boiler plate plumbing can be avoided, but usually global var is bad
    this.context.router.push('/tasks');
  }

  render() {
    return (
      <div>
        <h1>Manage Task</h1>
        <TaskForm
          allOrders={this.props.orders}
          task={this.state.task}
          errors={this.state.errors}
          onChange={this.updateTaskState}
          onSave={this.saveTask}
        />
      </div>
    );
  }
} 

ManageTaskPage.propTypes = {
  task: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// to avoid variable authentication error for context
ManageTaskPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let task = {id: '', wachHref: '', title: '', orderId: '', length: '', category: ''};

  const ordersFormattedForDropdown = state.orders.map( order => {
    return {
      value: order.id,
      text: order.firstName + '' + order.lastName
    };
  });

  return {
    task: task,
    orders: ordersFormattedForDropdown  
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(taskActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTaskPage);