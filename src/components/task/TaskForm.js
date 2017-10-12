import React, { PropTypes } from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const TaskForm = ({task, allOrders, onSave, onChange, loading, errors}) => {
  return (
    <form>
      <TextInput
        name="title"
        label="Title"
        value={task.title}
        onChange={onChange}
        error={errors.title}/>

      <SelectInput
        name="orderId"
        label="Order"
        value={task.orderId}
        defaultOption="Select Order"
        options={allOrders}
        onChange={onChange} error={errors.orderId}/>

      <TextInput
        name="category"
        label="Category"
        value={task.category}
        onChange={onChange}
        error={errors.category}/>

      <TextInput
        name="length"
        label="Length"
        value={task.length}
        onChange={onChange}
        error={errors.length}/>

      <input
        type="submit"
        disable={loading}
        value={loading ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

TaskForm.propTypes = {
  task: React.PropTypes.object.isRequired,
  allOrders: React.PropTypes.array,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default TaskForm;