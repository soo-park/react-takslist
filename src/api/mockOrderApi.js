import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const orders = [
  {
    id: 'soo-park',
    firstName: 'Soo',
    lastName: 'Park'
  },
  {
    id: 'scott-allen',
    firstName: 'Scott',
    lastName: 'Allen'
  },
  {
    id: 'dan-wahlin',
    firstName: 'Dan',
    lastName: 'Wahlin'
  }
];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (order) => {
  return order.firstName.toLowerCase() + '-' + order.lastName.toLowerCase();
};

class OrderApi {
  static getAllOrders() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], orders));
      }, delay);
    });
  }

  static saveOrder(order) {
	order = Object.assign({}, order); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minOrderNameLength = 3;
        if (order.firstName.length < minOrderNameLength) {
          reject(`First Name must be at least ${minOrderNameLength} characters.`);
        }

        if (order.lastName.length < minOrderNameLength) {
          reject(`Last Name must be at least ${minOrderNameLength} characters.`);
        }

        if (order.id) {
          const existingOrderIndex = orders.findIndex(a => a.id == order.id);
          orders.splice(existingOrderIndex, 1, order);
        } else {
          //Just simulating creation here.
          //The server would generate ids for new orders in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          order.id = generateId(order);
          orders.push(order);
        }

        resolve(order);
      }, delay);
    });
  }

  static deleteOrder(orderId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfOrderToDelete = orders.findIndex(order => {
          order.id == orderId;
        });
        orders.splice(indexOfOrderToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default OrderApi;
