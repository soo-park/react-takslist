import 'babel-polyfill'; // ES6 - object.assign is not traspiled by bebel yet
import React from 'react';
import { render } from 'react-dom';
import cofigureStore from './store/configureStore';
import { Provider } from 'react-redux'; 
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import { loadTasks } from './actions/taskActions';
import { loadOrders } from  './actions/orderActions';
import './styles/styles.css'; //webpack can import CSS files too!

const store = cofigureStore();
store.dispatch(loadTasks());
store.dispatch(loadOrders());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
