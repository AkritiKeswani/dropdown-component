import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./Dropdown.css";

/* Accounting for different options in the menu */
const DropdownItem = ({ label, isSelected, onClick }) => (
  <li className="dropdown-item" onClick={onClick}>
    <input type="checkbox" checked={isSelected} readOnly />
    {label}
  </li>
);

DropdownItem.propTypes = {
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Dropdown = ({
  options,
  selectedOptions,
  onChange,
  multiSelect,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleStart, setVisibleStart] = useState(0);
  const [visibleEnd, setVisibleEnd] = useState(10);

  const containerRef = useRef(null);
  const listRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  /* for single & multi-select options */
  const handleOptionClick = (optionValue) => {
    const updatedSelectedOptions = multiSelect
      ? selectedOptions.includes(optionValue)
        ? selectedOptions.filter((item) => item !== optionValue)
        : [...selectedOptions, optionValue]
      : [optionValue];
    /* onChange prop to have state changes -> controlled component */
    onChange(updatedSelectedOptions);
    if (!multiSelect) setIsOpen(false);
  };

  /* single & multi select options */
  const handleSelectAll = () => {
    const updatedSelectedOptions =
      selectedOptions.length === options.length
        ? []
        : options.map((opt) => opt.value);
    onChange(updatedSelectedOptions);
  };

  /* for items on scroll */
  const handleScroll = () => {
    const itemHeight = 35;
    const newVisibleStart = Math.floor(listRef.current.scrollTop / itemHeight);
    setVisibleStart(newVisibleStart);
    setVisibleEnd(newVisibleStart + 10);
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
      <div className="dropdown-header" onClick={toggleDropdown}>
        <span>
          {selectedOptions.length > 0
            ? multiSelect
              ? selectedOptions.join(", ")
              : selectedOptions[0]
            : placeholder}
        </span>
        <svg
          className="dropdown-arrow"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M7.247 11.14l-4.796-5.481C1.837 5.21 2.115 4.5 2.67 4.5h10.66c.554 0 .832.71.415 1.159l-4.796 5.481a1 1 0 0 1-1.415 0z"
          />
        </svg>
      </div>
      {isOpen && (
        <ul className="dropdown-list" onScroll={handleScroll} ref={listRef}>
          {multiSelect && (
            <DropdownItem
              key="select-all"
              label={
                selectedOptions.length === options.length
                  ? "Deselect All"
                  : "Select All"
              }
              isSelected={selectedOptions.length === options.length}
              onClick={handleSelectAll}
            />
          )}
          {options.slice(visibleStart, visibleEnd).map((option) => (
            <DropdownItem
              key={option.id}
              label={option.label}
              isSelected={selectedOptions.includes(option.value)}
              onClick={() => handleOptionClick(option.value)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedOptions:
    PropTypes.array.isRequired /* prop -> controlled component */,
  onChange: PropTypes.func.isRequired,
  multiSelect: PropTypes.bool,
  placeholder: PropTypes.string,
};

Dropdown.defaultProps = {
  multiSelect: false,
  placeholder: "Select...",
};

export default Dropdown;
