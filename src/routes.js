import React from 'react';
import {Route, IndexRoute } from 'react-router';
import App from './components/App';
import tasksPage from './components/task/TasksPage';
import ManageTaskPage from './components/task/ManageTaskPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={tasksPage} />
    <Route path="task" component={ManageTaskPage} />
    <Route path="task/:id" component={ManageTaskPage} />
    <Route path="tasks" component={tasksPage} />
  </Route>
);