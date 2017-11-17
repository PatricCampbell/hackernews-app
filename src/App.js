import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    const helloWorld = "Welcome to the Road to Learn React";
    const myName = {
      firstName: "Patric",
      lastName: "Campbell"
    };

    return (
      <div className="App">
        <h2>{helloWorld}</h2>
        <h3>
          My name is {myName.firstName} {myName.lastName}!
        </h3>
      </div>
    );
  }
}

export default App;
