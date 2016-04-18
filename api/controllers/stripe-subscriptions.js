'use strict';

// Imports
const customers = require('./stripe-customers');
const plans = require('./stripe-plans');
const parse = require('co-body');
const stripe = require('stripe')(
  process.env.PRODUCTION ? process.env.STRIPE_LIVE_SECRET : process.env.STRIPE_TEST_SECRET
);

/*
 * Stripe SUBSCRIPTION operation
 * Create a subscription
*/
module.exports.createByRoute = function *createStripeSubscriptionByRoute() {
  const data = yield parse(this);
  const plan = yield plans.create({
    name: `${data.amount / 100} - ${data.interval}`,
    interval: data.interval,
    amount: data.amount,
    currency: process.env.CURRENCY_TYPE,
  });
  const customer = yield customers.create(data.id, data.email);
  const subscription = yield stripe.customers.createSubscription(
    customer.id,
    { plan: plan.id }
  );

  this.body = subscription;
};
