import React, { PropTypes } from 'react';
import TextInput from '../common/TextInput';

const TaskForm = ({task, onSave, onChange, loading, errors}) => {
  return (
    <form>
      <TextInput
        name="title"
        placeholder="Title"
        value={task.title}
        onChange={onChange}
        error={errors.title}/>

      <TextInput
        name="category"
        placeholder="Category"
        value={task.category}
        onChange={onChange}
        error={errors.category}/>

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
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default TaskForm;