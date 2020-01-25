import React, { Component } from "react";
import Quote from "./Quote";

export default class QuoteSearcher extends Component {
  state = {
    quotes: [],
    fetching: false,
    likes: 0,
    dislikes: 0,
    search: ""
  };

  componentDidMount() {
    this.setState({
      fetching: true
    });
    fetch(`https://quote-garden.herokuapp.com/quotes/search/tree`)
      .then(response => response.json())
      .then(data => {
        //adding the additional keys for likedness and dislikedness
        const quoData = data.results.map(item => {
          return { ...item, liking: 0 };
        });
        console.log("DATA COPY", quoData);
        this.setState({
          fetching: false,
          quotes: quoData
        });
      })
      .catch(err => Error);
  }

  handleLike = (likeid, id) => {
    console.log("I was liked", likeid, id, this.state.likes);
    if (likeid === 1) {
      this.setState({
        likes: this.state.likes + 1
      });
    }
  };

  handleDislike = (likeid, id) => {
    console.log("I was disliked", likeid, id);
    if (likeid === 3) {
      this.setState({
        dislikes: this.state.dislikes + 1
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const searchterm = this.state.search;
    this.setState({
      fetching: true,
      likes: 0,
      dislikes: 0
    });
    fetch(`https://quote-garden.herokuapp.com/quotes/search/${searchterm}`)
      .then(response => response.json())
      .then(data => {
        //adding the additional keys for likedness and dislikedness
        const quoData = data.results.map(item => {
          return { ...item, liking: 0 };
        });
        console.log("DATA COPY", quoData);
        this.setState({
          fetching: false,
          quotes: quoData
        });
      })
      .catch(err => Error);
  };

  handleChange = event => {
    this.setState({
      search: event.target.value
    });
  };

  render() {
    // console.log("THE SEARCHER STATE IS:", this.state);
    const quoteList = this.state.quotes.map(quote => (
      <Quote
        key={quote._id}
        id={quote._id}
        quoteText={quote.quoteText}
        quoteAuthor={quote.quoteAuthor}
        setLiked={this.handleLike}
        setDisliked={this.handleDislike}
      />
    ));
    return (
      <div>
        <h1>The quote Searcher App</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            name="search"
            type="text"
            value={this.state.search}
          />
          <button type="submit">Search</button>
        </form>
        <h2>
          Liked: {this.state.likes} / Disliked: {this.state.dislikes}
        </h2>
        {this.state.fetching ? <h4>Loading...</h4> : quoteList}
      </div>
    );
  }
}
