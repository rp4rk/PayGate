'use strict';

// Imports
const parse = require('co-body');
const stripe = require('stripe')(
  process.env.PRODUCTION ? process.env.STRIPE_LIVE_SECRET : process.env.STRIPE_TEST_SECRET
);
const utils = require('../utils/utils');

/*
 * Stripe PLAN operations
 * Create a Plan for users to sub to
*/
module.exports.create = function createStripePlan(planObj) {
  const { name, interval, amount, currency } = planObj;
  const stripeFormatInterval = utils.englishToStripe(interval);
  const planId = `${amount}/${stripeFormatInterval}`;

  return new Promise((resolve, reject) => {
    module.exports.get(planId)
      .then((plan) => {
        resolve(plan);
      })
      .catch(() => {
        // Plan doesn't exist, let's make one
        stripe.plans.create({
          amount,
          interval: stripeFormatInterval,
          name,
          currency,
          id: planId,
        })
          .then((plan) => resolve(plan))
          .catch(() => reject(false)); // TODO: proper error handling
      });
  });
};


/*
 * Stripe PLAN operations - ROUTE ONLY
 * Create a Plan for users to sub to via route
*/
module.exports.createByRoute = function *createStripePlanByRoute() {
  const planObj = yield parse(this);
  const planResponse = yield module.exports.create(planObj);

  this.body = planResponse;
  return planResponse;
};

/*
 * Stripe PLAN operations
 * Get a plan from Stripe
 * Returns false if plan does not exist, otherwise the plan is returned
*/

module.exports.get = function getStripePlan(id) {
  return new Promise((resolve, reject) => {
    stripe.plans.retrieve(id)
      .then((plan) => resolve(plan))
      .catch(() => reject(false));
  });
};
