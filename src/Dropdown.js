// src/Dropdown.js

import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./Dropdown.css";
import { FaCaretDown } from "react-icons/fa"; // Import the arrow icon

const Dropdown = ({
  options,
  selectedOptions,
  onChange,
  multiSelect,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Function to handle option selection
  const handleOptionClick = (option) => {
    if (multiSelect) {
      if (selectedOptions.includes(option)) {
        // If multiSelect is enabled and option is already selected, deselect it
        onChange(selectedOptions.filter((item) => item !== option));
      } else {
        // If multiSelect is enabled and option is not selected, select it
        onChange([...selectedOptions, option]);
      }
    } else {
      // If multiSelect is not enabled, select the option and close the dropdown
      onChange([option]);
      setIsOpen(false);
    }
  };

  // Function to handle click outside of the dropdown to close it
  const handleDocumentClick = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className="dropdown" ref={containerRef}>
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        <span>
          {selectedOptions.length > 0
            ? multiSelect
              ? selectedOptions.join(", ")
              : selectedOptions[0]
            : placeholder}
        </span>
        <FaCaretDown className="dropdown-arrow" />
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option) => (
            <li
              key={option}
              className={`dropdown-item ${
                selectedOptions.includes(option) ? "selected" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                readOnly
              />
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.array.isRequired, // Array of options to display in the dropdown
  selectedOptions: PropTypes.array, // Array of currently selected options
  onChange: PropTypes.func.isRequired, // Function to call when selected options change
  multiSelect: PropTypes.bool, // Boolean to enable/disable multi-select functionality
  placeholder: PropTypes.string, // Placeholder text when no option is selected
};

Dropdown.defaultProps = {
  selectedOptions: [],
  multiSelect: false,
  placeholder: "Select...",
};

export default Dropdown;
