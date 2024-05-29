import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Dropdown from "./Dropdown";
import "./Dropdown.css";

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <h1>Reusable Dropdown Menu</h1>
      <Dropdown
        options={options}
        onOptionSelect={(option) => setSelectedOption(option)}
      />
      {selectedOption && <p>Selected Option: {selectedOption.label}</p>}
    </div>
  );
};

export default App;
