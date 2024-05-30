import React, { useState } from "react";
import Dropdown from "./components/Dropdown";
import "./App.css";

const App = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = [
    { id: "1", value: "Oliver Hansen", label: "Oliver Hansen" },
    { id: "2", value: "Van Henry", label: "Van Henry" },
    { id: "3", value: "April Tucker", label: "April Tucker" },
    { id: "4", value: "Ralph Hubbard", label: "Ralph Hubbard" },
  ];

  return (
    <div className="App">
      <h1>dropdown menu component!</h1>
      <Dropdown
        options={options}
        selectedOptions={selectedOptions}
        // Pass onChange prop to handle state changes (controlled component)
        onChange={setSelectedOptions}
        multiSelect
        placeholder="Select options..."
      />
    </div>
  );
};

export default App;
