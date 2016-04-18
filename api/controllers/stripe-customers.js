'use strict';

// Imports
const parse = require('co-body');
const stripe = require('stripe')(
  process.env.PRODUCTION ? process.env.STRIPE_LIVE_SECRET : process.env.STRIPE_TEST_SECRET
);

/*
 * Stripe CUSTOMER operation
 * Create a customer
*/
module.exports.create = function createStripeCustomer(id, email) {
  const now = new Date();
  return new Promise((resolve, reject) => {
    stripe.customers.create({
      description: `${email} - Created on ${now.getDate()}/${now.getDay()}/${now.getFullYear()}`,
      source: id,
    })
      .then((data) => resolve(data))
      .catch(() => reject(false)); // TODO: Proper error handling
  });
};

/*
 * Stripe CUSTOMER operation
 * Create a customer - ROUTE
*/
module.exports.createByRoute = function *createStripeCustomerByRoute() {
  // Token generated on client side using stripe checkout
  const { id, email } = yield parse(this);
  const stripeCustomerResponse = yield module.exports.create(id, email);

  this.body = stripeCustomerResponse;
  return stripeCustomerResponse;
};
