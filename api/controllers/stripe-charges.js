'use strict';

// Imports
const parse = require('co-body');
const stripe = require('stripe')(
  process.env.PRODUCTION ? process.env.STRIPE_LIVE_SECRET : process.env.STRIPE_TEST_SECRET
);

/*
 * Stripe PLAN operations
 * Create a charge for user
*/
module.exports.createByRoute = function *createStripeChargeByRoute() {
  const data = yield parse(this);
  const now = new Date();
  const charge = yield stripe.charges.create({
    amount: data.amount,
    currency: process.env.CURRENCY_TYPE,
    source: data.id,
    receipt_email: data.email,
    description: `${data.email} - Created on ${now.getDate()}/${now.getDay()}/${now.getFullYear()}`,
  });

  this.body = charge;
};
