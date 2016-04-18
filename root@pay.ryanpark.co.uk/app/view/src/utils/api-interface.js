import axios from 'axios';

if (typeof location.origin === 'undefined')
    location.origin = location.protocol + '//' + location.host;

const BASE_URL = `${location.origin}/api`;

// Create a charge
export function createCharge(configObj) {
  const {id, email, amount} = configObj;
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${BASE_URL}/charges/create`,
      data: {
        id,
        email,
        amount
      }
    })
    .then((data) => resolve(data))
    .catch(() => reject(false));
  });
}

// Create a Subscription
export function createSubscription(configObj) {
  const {id, email, interval, amount} = configObj;
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${BASE_URL}/subscriptions/create`,
      data: {
        id,
        email,
        interval,
        amount
      }
    })
    .then((data) => resolve(data))
    .catch(() => reject(false));
  });
};
