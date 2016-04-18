'use strict';

// Imports
const route = require('koa-route');
const koa = require('koa');
const cors = require('koa-cors');
const app = module.exports = koa();


// Set up CORS
app.use(cors(false));


// Import Controllers
// const plans = require('./controllers/stripe-plans');
// const customers = require('./controllers/stripe-customers');
const subscriptions = require('./controllers/stripe-subscriptions');
const charges = require('./controllers/stripe-charges');


// Stripe Subscription Routing
app.use(route.post('/api/subscriptions/create', subscriptions.createByRoute));
app.use(route.post('/api/charges/create', charges.createByRoute));


// Listen
if (!module.parent) {
  app.listen(3000);
  console.log('Listening on port: 3000');
}
