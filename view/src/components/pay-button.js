import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { Button, Glyph, Spinner } from 'elemental';
import { createCharge, createSubscription } from '../utils/api-interface';

// PayButton Component
class PayButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: this.props.params.amount * 1, // Coerce to float
      interval: this.props.params.interval,
      paid: false,
      processing: false
    };

  }


  // Check if currency is valid, and if so returns real number
  currencyCheck(amount) {
    const amountArray = Array.prototype.slice.call(amount);
    const count = amountArray.filter(letter => letter === "-").length;

    if (count <= 1) {
      // Calculate total
      if (count === 1) {
        const newAmount = amount.split("-").map((number, index) => {
          return index === 0 ? number * 100 : number * 1;
        });
        var total = newAmount[0] + newAmount[1];

        // Fail if pence > 99
        if (newAmount[1] > 99) {
          return false;
        }
      } else {
        var total = parseFloat(amount) * 100;
      }

      // Fail if type isn't number
      if (typeof(parseFloat(total)) === 'number') {
        return total;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }


  // Token received, post to server
  onToken(token) {
    this.setState({
      processing: true
    });

    let paymentPromise;
    // Create a subscription
    if (this.state.interval !== 'instant') {
      console.log('this.state.interval', 'fak');
      paymentPromise = createSubscription({
        id: token.id,
        email: token.email,
        interval: this.state.interval,
        amount: this.state.amount
      })
    } else {
      paymentPromise = createCharge({
        id: token.id,
        email: token.email,
        amount: this.state.amount
      })
    }

    paymentPromise
    .then(() => {
      this.setState({
        paid: true,
        processing: false
      });
    })
    .catch(() => {
      this.props.setAlert("error", "Payment Failed, Please Check Your Details!");
      this.setState({
        processing: false
      });
    });
  };

  // Check if route is valid
  componentWillMount() {
    if (this.props.params.amount) {
      const total = this.currencyCheck(this.props.params.amount);

      if (this.props.params.amount && total) {
        this.state.amount = this.currencyCheck(this.props.params.amount);
      } else {
        browserHistory.push('/');
      }
    }
  }

  // Render component
  render() {
    return (
      <div className="pay-button">
        <StripeCheckout
          className={ !this.state.processing ? this.state.paid ? 'stripe-paid' : null : 'stripe-processing' }
          name={ process.env.SERVICE_NAME }
          image={ require(`../images/${process.env.BADGE}`) }
          description={ `Pay ${this.state.interval} for ${process.env.SERVICE}.` }
          panelLabel={ this.state.interval === 'instant' ? 'Pay' : 'Subscribe'}
          amount={ this.state.amount }
          currency={ process.env.CURRENCY_TYPE }
          token={ this.onToken.bind(this) }
          stripeKey={ process.env.STRIPE_KEY }
        >
          <Button className={this.state.paid ? 'paid' : null} type="hollow-primary" size="lg">
            { this.state.paid ? <Glyph icon="thumbsup" /> : <Glyph icon="credit-card" /> }
            { !this.state.processing  ? this.state.paid ? 'Payment Successful!' : 'Pay By Card' : null}
            { this.state.processing && !this.state.paid ? <Spinner size="lg" type="inverted" /> : null }
          </Button>
        </StripeCheckout>
      </div>
    )
  }

}

export default PayButton;
