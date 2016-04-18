# PayGate

PayGate is a Stripe-powered, developer controlled payment gateway, allowing for more flexibility than traditional options. PayGate supports sum payments, monthly subscriptions, and yearly subscriptions. PayGate is easy to rebrand, and straightforward for clients to use. PayGate provides an all-in-one solution for developers wanting to charge in intervals without the hassle of reissuing an invoice each month manually.

## How To

- Clone the Repo
- Create a .env file in the project root, containing the following variables:

```
# 3 letter ISO currency code (GBP, USD, etc.).
CURRENCY_TYPE=GBP

# The name of the entity being paid.
NAME=Ryan

# The label that will be used for the entity.
SERVICE_NAME=PayGate

# The name of the image file used for Stripe Checkout, located in /view/src/images/
BADGE=PayGate.jpg

# The service being paid for.
SERVICE=Web Development


# Stripe Details - You will need to obtain these from your Stripe dashboard.
STRIPE_TEST_SECRET=sk_test_
STRIPE_TEST_PUBLIC=pk_test_
STRIPE_LIVE_SECRET=sk_live_
STRIPE_LIVE_PUBLIC=pk_live_

```
- Run NPM install in the view directory.
- Currently the view and API are independent, as such the view is built separately. It can either be built for production (live), or development (local testing).


### Building for Development
Build the view by running `npm run build-dev` in the view directory.

To run the application in development mode, run `docker-compose up` in the project root directory after building the view for development.

### Building for production
Build the view by running `npm run build-production` in the view directory.

To run the application in production mode, run:
```
docker-compose -f docker-compose.yml -f production.yml up
```
in the project root directory.
