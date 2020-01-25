import React, { Component } from "react";

export default class Quote extends Component {
  state = {
    like: 1
  };
  handleLikes = () => {
    this.setState({
      like: 2
    });
    this.props.setLiked(this.props.likedness, this.props.id);
  };

  handleDislikes = () => {
    this.setState({
      like: 3
    });
    this.props.setDisliked(this.props.dislikedness, this.props.id);
  };
  render() {
    return (
      <div>
        <h3
          style={
            this.state.like === 1
              ? { color: "black" }
              : this.state.like === 2
              ? { color: "green" }
              : { color: "red", textDecoration: "line-through" }
          }
        >
          {this.props.quoteText}
        </h3>
        <h5>{this.props.quoteAuthor}</h5>
        <button onClick={this.handleLikes}>:)</button>
        <button onClick={this.handleDislikes}>:(</button>
      </div>
    );
  }
}
