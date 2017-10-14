import React from 'react';
import {Route, IndexRoute } from 'react-router';
import App from './components/App';
import tasksPage from './components/task/TasksPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={tasksPage} />
    <Route path="tasks" component={tasksPage} />
  </Route>
);