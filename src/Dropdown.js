// src/Dropdown.js

import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./Dropdown.css";

const Dropdown = ({
  options,
  selectedOptions,
  onChange,
  multiSelect,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const containerRef = useRef(null);

  const handleOptionClick = (option) => {
    if (multiSelect) {
      if (selectedOptions.includes(option)) {
        onChange(selectedOptions.filter((item) => item !== option));
      } else {
        onChange([...selectedOptions, option]);
      }
    } else {
      onChange([option]);
      setIsOpen(false);
    }
  };

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
        {selectedOptions.length > 0
          ? multiSelect
            ? selectedOptions.join(", ")
            : selectedOptions[0]
          : placeholder}
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {filteredOptions.map((option) => (
            <li
              key={option}
              className={`dropdown-item ${
                selectedOptions.includes(option) ? "selected" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  selectedOptions: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  multiSelect: PropTypes.bool,
  placeholder: PropTypes.string,
};

Dropdown.defaultProps = {
  selectedOptions: [],
  multiSelect: false,
  placeholder: "Select...",
};

export default Dropdown;
