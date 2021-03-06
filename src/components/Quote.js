import React, { Component } from "react";

export default class Quote extends Component {
  state = {
    like: 1
  };

  // using async to fix the problem of setState late updation of data
  handleLikes = async () => {
    await this.setState({
      like: 2
    });
    this.props.setLiked(this.state.like, this.props.id);
  };

  handleDislikes = async () => {
    await this.setState({
      like: 3
    });
    this.props.setDisliked(this.state.like, this.props.id);
  };
  render() {
    // console.log("QUOTE STATE", this.state);
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
