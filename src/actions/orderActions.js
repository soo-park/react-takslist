import * as types from './actionTypes';
import orderApi from '../api/mockOrderApi';

// action creator for orders
export function loadOrdersSuccess(orders) {
  return { type: types.LOAD_ORDERS_SUCCESS, orders };
}

// Thunk for loading orders
export function loadOrders() {
  return function(dispatch) {
    return orderApi.getAllOrders().then(orders => {
      dispatch(loadOrdersSuccess(orders));
    }).catch(error => {
      throw(error);
    });
  };
}
