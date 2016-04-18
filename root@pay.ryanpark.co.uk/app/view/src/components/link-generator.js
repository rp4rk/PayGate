import React, { Component } from 'react';
import { FormSelect, FormRow, FormField, FormInput, InputGroup, Button, Glyph } from 'elemental';
import clipboard from 'clipboard-js';

class LinkGenerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scheme: [],
      amount: "",
      copied: false
    }
  }

  // Handle plan change
  handlePlanChange(e) {
    this.setState({
      scheme: e
    });
  }

  // Handle Copy
  toggleCopied() {
    if (this.state.timeout) {
      window.clearTimeout(this.state.timeout);
    }

    this.setState({
      copied: true,
      timeout: window.setTimeout(() => {
        this.setState({
          copied: false
        });
      }, 4000),
    });
  }

  // Handle cost change
  handleAmountChange(e) {
    const numbers = e.toString().split(".");
    if (!isNaN(e) || (e.length === 1 && e === ".")) {
      if (numbers.length === 2) {
        if (numbers[1] >= 100) {
          this.props.setAlert('error', "Please enter a valid amount of currency.")
          return false
        }
      }
      this.setState({
        amount: e
      })
    } else {
      this.props.setAlert('error', "Please only use numbers and decimals.")
    }
  }

  // Copy the content to clipboard
  copyToClipboard(e) {
    if (this.state.scheme.length !== 0 && this.state.amount > 0) {
      this.toggleCopied();
      clipboard.copy({
        "text/plain": `${window.location.href}${this.state.scheme}/${this.state.amount.replace(".", "-")}/`
      });
      this.props.setAlert('success', "Copied to Clipboard!")
    } else {
      this.props.setAlert("error", "Please select a valid plan and enter a valid amount to pay.")
    }
  }

  render() {
    return (
      <div className="link-generator">
        <InputGroup contiguous>
        	<InputGroup.Section grow>
            <FormSelect
              options={this.props.intervals.map(o => { return {label: o, value: o } })}
              firstOption="Choose Plan"
              onChange={e => this.handlePlanChange(e)}
            />
        	</InputGroup.Section>
        	<InputGroup.Section grow>
        		<FormInput
              value={this.state.amount}
              onChange = {e => this.handleAmountChange(e.target.value)}
              placeholder="Amount"
            />
        	</InputGroup.Section>
          <InputGroup.Section>
        		<Button className="copy-button"
                    type="success"
                    onClick={e => this.copyToClipboard(e)}>
              <Glyph icon="clippy" />
              { this.state.copied ? 'Copied!' : 'Copy Link'}
            </Button>
        	</InputGroup.Section>
        </InputGroup>
      </div>
    )
  }
}

export default LinkGenerator;
