'use strict';

// General Helpers

// Stripe only accepts 'day', 'week', 'month', 'year' for intervals
module.exports.englishToStripe = function englishToStripe(interval) {
  switch (interval) {
    case 'daily':
      return 'day';
    case 'weekly':
      return 'week';
    case 'monthly':
      return 'month';
    case 'yearly':
      return 'year';
    default:
      return 'Invalid';
  }
};
