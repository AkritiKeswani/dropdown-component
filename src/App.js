// src/App.js

import React, { useState } from "react";
import Dropdown from "./Dropdown";

const App = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = [
    "Oliver Hansen 1",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
  ];

  return (
    <div className="App">
      <h1>Reusable Dropdown Component!</h1>
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
