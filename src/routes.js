import React from 'react';
import {Route, IndexRoute } from 'react-router';
import App from './components/App';
import tasksPage from './components/task/TasksPage';
import ManageTask from './components/task/ManageTask';
import Sort from './components/task/Sort';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={tasksPage} />
    <Route path="task" component={ManageTask} />
    <Route path="task/:id" component={ManageTask} />
    <Route path="tasks" component={tasksPage} />
    <Route path="sort" component={Sort} />
  </Route>
);