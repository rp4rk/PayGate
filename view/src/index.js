import _ from 'lodash';
import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { Card } from 'elemental';

import PayButton from './components/pay-button';
import LinkGenerator from './components/link-generator';
import AlertBar from './components/alert-bar';

require('../node_modules/elemental/less/elemental.less');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      intervals: ['instant', 'monthly', 'yearly'],
      currentAlert: {
        type: 'none',
        str: ''
      },
    };
  }

  // Check our params
  checkPage(interval, amount) {
    if (interval && amount) {
      if(!this.state.intervals.find((plan) => { return plan === interval })) {
        browserHistory.push('/');
        this.setAlert('error', `Invalid URL - "${interval}" - Please request new PayLink.`);
      }

      if(!parseFloat(amount)) {
        browserHistory.push('/');
        this.setAlert('error', `Invalid Amount - "${amount}" - Please request new PayLink.`);
      }
    }
  }

  // Set a page error
  setAlert(type, str) {
    this.setState({
      currentAlert: {
        type,
        str
      }
    });
  }

  // Check the address
  componentWillMount() {
    this.checkPage(this.props.params.interval, this.props.params.amount);
  }

  render() {
    return (
      <div>
        <AlertBar type={ this.state.currentAlert.type } alert={ this.state.currentAlert.str } />
        <div className="center">
          <img className="logo" src={ require('./images/logo.svg') } />
          {React.cloneElement(this.props.children, {
            setAlert: this.setAlert.bind(this),
            intervals: this.state.intervals
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ LinkGenerator } />
      <Route path=":interval/:amount" component={ PayButton } />
    </Route>
  </Router>
  , document.querySelector('.container'));
