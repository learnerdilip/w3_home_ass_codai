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
        // console.log("DATA COPY", quoData);
        this.setState({
          fetching: false,
          quotes: quoData
        });
      })
      .catch(err => Error);
  }

  //count the likes and dislikes after each like/dislike
  //and update in local state
  //this following function returns the updated state
  likecount = (arr, likeid, id) => {
    const newArray = arr.map(item => {
      const changedelement = arr.find(element => element._id === id);
      if (changedelement._id === item._id) {
        return { ...item, liking: likeid };
      } else {
        return { ...item };
      }
    });
    return newArray;
  };
  countliked = (arr, likeid) => {
    const lik = arr.reduce((agg, item) => {
      if (item.liking === likeid) {
        return agg + 1;
      } else {
        return agg;
      }
    }, 0);
    console.log(lik);
    return lik;
  };

  handleLike = async (likeid, id) => {
    const newA = await this.likecount(this.state.quotes, likeid, id);
    const likeNum = await this.countliked(this.state.quotes, 2);
    if (likeid === 2) {
      await this.setState({
        likes: likeNum,
        quotes: newA
      });
    }
  };

  handleDislike = async (likeid, id) => {
    const newA = await this.likecount(this.state.quotes, likeid, id);
    const likeNum = await this.countliked(this.state.quotes, 3);
    if (likeid === 3) {
      await this.setState({
        dislikes: likeNum,
        quotes: newA
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
    console.log("THE SEARCHER STATE IS:", this.state);
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
        {this.state.fetching ? (
          <h4>Loading...</h4>
        ) : quoteList.length === 0 ? (
          <h2>SORRY NO RESULTS FOR YOUR WORD </h2>
        ) : (
          quoteList
        )}
      </div>
    );
  }
}
