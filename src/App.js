import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

const list = [
  {
    title: "React",
    url: "https://facebook.github.io/react/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: "Redux",
    url: "https://github.com/reactjs/redux",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list,
      user: "Patric",
      searchTerm: ""
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(itemId) {
    const isNotId = item => item.objectID !== itemId;
    const updatedList = this.state.list.filter(isNotId);

    this.setState({
      list: updatedList
    });
  }

  onSearchChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  render() {
    const { searchTerm, list } = this.state;

    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search
          </Search>
          <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
        </div>
      </div>
    );
  }
}

const Search = ({ value, onChange, children }) => {
  return (
    <form>
      {children}
      <input type="text" onChange={onChange} value={value} />
    </form>
  );
};

const Table = ({ list, pattern, onDismiss }) => {
  const isSearched = pattern => item =>
    item.title.toLowerCase().includes(pattern.toLowerCase());

  return (
    <div className="table">
      {list.filter(isSearched(pattern)).map(item => {
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
