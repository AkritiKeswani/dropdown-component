/*built so that we can handle multiple items*/
import React from "react";
import PropTypes from "prop-types";

const DropdownItem = ({ option, isSelected, onClick }) => (
  <li
    className={`dropdown-item ${isSelected ? "selected" : ""}`}
    onClick={onClick}
  >
    <input type="checkbox" checked={isSelected} readOnly />
    {option.label}
  </li>
);

DropdownItem.propTypes = {
  option: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DropdownItem;
