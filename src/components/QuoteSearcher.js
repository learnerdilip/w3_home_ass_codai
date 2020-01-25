import React, { Component } from "react";
import Quote from "./Quote";

export default class QuoteSearcher extends Component {
  state = {
    quotes: [],
    fetching: false,
    likedness: 0,
    dislikedness: 0
  };

  componentDidMount() {
    this.setState({
      fetching: true
    });
    fetch("https://quote-garden.herokuapp.com/quotes/search/tree")
      .then(response => response.json())
      .then(data => {
        //adding the additional keys for likedness and dislikedness
        const quoData = data.results.map(item => {
          return { ...item, likedness: 0, dislikedness: 0 };
        });
        console.log("DATA COPY", quoData);
        this.setState({
          fetching: false,
          quotes: quoData
        });
      })
      .catch(err => Error);
  }
  handleLike(like, id) {
    console.log("I was liked", like, id);
    if (like === 2) {
      this.setState({
        likedness: this.state.likedness + 1
      });
    }
  }
  handleDislike(like, id) {
    console.log("I was disliked", like, id);
    if (like === 3) {
      this.setState({
        dislikedness: this.state.dislikedness + 1
      });
    }
  }

  render() {
    console.log("THE LATEST STATE IS:", this.state.quotes);
    const quoteList = this.state.quotes.map(quote => (
      <Quote
        key={quote._id}
        id={quote._id}
        quoteText={quote.quoteText}
        quoteAuthor={quote.quoteAuthor}
        likedness={quote.likedness}
        dislikedness={quote.dislikedness}
        setLiked={this.handleLike}
        setDisliked={this.handleDislike}
      />
    ));
    return (
      <div>
        <h1>The quote Searcher App</h1>
        <h2>
          Liked: {this.state.likedness} / Disliked: {this.state.dislikedness}
        </h2>
        {this.state.fetching ? <h4>Loading...</h4> : quoteList}
      </div>
    );
  }
}
