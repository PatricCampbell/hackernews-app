import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";

import App, { Search, Button, Table } from "./App";

describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Search", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Search>Search</Search>, div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(<Search>Search</Search>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
