import React, { Component } from "react";

export default class Quote extends Component {
  state = {
    likes: 0,
    dislikes: 0
  };
  handleLikes = () => {
    console.log("you liked");
  };

  handleDislikes = () => {
    console.log("you disliked");
  };
  render() {
    return (
      <div>
        <h3>{this.props.quoteText}</h3>
        <h5>{this.props.quoteAuthor}</h5>
        <button onClick={this.handleLikes}>:)</button>
        <button onClick={this.handleDislikes}>:(</button>
      </div>
    );
  }
}
