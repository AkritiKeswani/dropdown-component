// src/App.js

import React, { useState } from "react";
import Dropdown from "./Dropdown";

const App = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];

  return (
    <div className="App">
      <h1>Dropdown Component</h1>
      <Dropdown
        options={options}
        selectedOptions={selectedOptions}
        onChange={setSelectedOptions}
        multiSelect
        placeholder="Select options..."
      />
    </div>
  );
};

export default App;
