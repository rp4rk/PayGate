import React, { Component } from 'react';
import { Glyph } from 'elemental';

class AlertBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
      timeout: null
    }
  }

  // Return appropriate glyph for alert
  getGlyph() {
    return this.props.type !== "success" ? <Glyph className="tag" icon='alert'/> : <Glyph className="tag" icon='heart'/>;
  }

  // Return appropriate class for alert
  isHidden() {
    return this.state.hidden ? '' : 'show';
  }

  // Timeout management
  componentWillReceiveProps() {
    if (this.state.timeout) {
      window.clearTimeout(this.state.timeout);
    }

    this.setState({
      hidden: false,
      timeout: window.setTimeout(() => {
        this.setState({
          hidden: true
        });
      }, 4000),
    });
  }

  render() {
    return (
      <div className={`alert-bar ${ this.props.type } ${ this.isHidden() }`}>
          { this.getGlyph() } { this.props.alert }
      </div>
    )
  }
}


export default AlertBar;
