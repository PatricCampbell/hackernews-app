import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";

const DEFAULT_QUERY = "redux";
const DEFAULT_HPP = "100";

const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";
const PARAM_HPP = "hitsPerPage=";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  setSearchTopStories(result) {
    const { hits, page } = result;

    const oldHits = page !== 0 ? this.state.result.hits : [];

    const updatedHits = [...oldHits, ...hits];

    this.setState({
      result: { hits: updatedHits, page }
    });
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then(res => res.json())
      .then(res => this.setSearchTopStories(res))
      .catch(e => e);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  onDismiss(itemId) {
    const isNotId = item => item.objectID !== itemId;
    const updatedHits = this.state.result.hits.filter(isNotId);

    this.setState({
      result: { ...this.state.result, hits: updatedHits }
    });
  }

  onSearchChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  render() {
    const { searchTerm, result } = this.state;
    const page = (result && result.page) || 0;

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        {result ? (
          <Table list={result.hits} onDismiss={this.onDismiss} />
        ) : null}
        <div className="interactions">
          <Button
            onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}
          >
            More
          </Button>
        </div>
      </div>
    );
  }
}

const Search = ({ value, onChange, onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit}>
      {children}
      <input type="text" onChange={onChange} value={value} />
      <Button type="submit">{children}</Button>
    </form>
  );
};

const Table = ({ list, pattern, onDismiss }) => {
  return (
    <div className="table">
      {list.map(item => {
        return (
          <div key={item.objectID} className="table-row">
            <span style={{ width: "40%" }}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={{ width: "30%" }}>{item.author}</span>
            <span style={{ width: "10%" }}>{item.num_comments}</span>
            <span style={{ width: "10%" }}>{item.points}</span>
            <span style={{ width: "10%" }}>
              <Button
                onClick={() => onDismiss(item.objectID)}
                className="button-inline"
              >
                Dismiss
              </Button>
            </span>
          </div>
        );
      })}
    </div>
  );
};

const Button = ({ onClick, className = "", children }) => {
  return (
    <button onClick={onClick} className={className} type="button">
      {children}
    </button>
  );
};

export default App;
