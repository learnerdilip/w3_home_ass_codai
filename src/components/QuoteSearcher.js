import React, { Component } from "react";
import Quote from "./Quote";

export default class QuoteSearcher extends Component {
  state = {
    quotes: [],
    fetching: false
  };

  componentDidMount() {
    this.setState({
      fetching: true
    });
    fetch("https://quote-garden.herokuapp.com/quotes/search/tree")
      .then(response => response.json())
      .then(data => {
        const quoData = data.results;
        console.log("DATA", quoData);
        this.setState({
          quotes: quoData,
          fetching: false
        });
      })
      .catch(err => Error);
  }

  render() {
    console.log("THE LATEST STATE IS:", this.state.quotes);
    const quoteList = this.state.quotes.map(quote => (
      <Quote
        key={quote.id}
        quoteText={quote.quoteText}
        quoteAuthor={quote.quoteAuthor}
      />
    ));
    return (
      <div>
        <h1>The quote Searcher App</h1>
        {this.state.fetching && <h4>Loading...</h4>}
        {!this.state.fetching && quoteList}
      </div>
    );
  }
}
