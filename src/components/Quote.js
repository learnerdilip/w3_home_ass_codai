import React, { Component } from "react";

export default class Quote extends Component {
  render() {
    return (
      <div>
        {/* <h2>individul Quote will come here</h2> */}
        <h3>{this.props.quoteText}</h3>
        <h5>{this.props.quoteAuthor}</h5>
      </div>
    );
  }
}
