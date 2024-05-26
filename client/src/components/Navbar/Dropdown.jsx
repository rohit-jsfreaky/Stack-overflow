// src/components/Navbar/Dropdown.js
import React, { useState, useEffect } from 'react';

const Dropdown = ({ options, onSelect, selected }) => {
  const [selectedOption, setSelectedOption] = useState(selected);

  useEffect(() => {
    setSelectedOption(selected); // Update selected option when the prop changes
  }, [selected]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedLabel = options.find(option => option.value === selectedValue).label;
    setSelectedOption(selectedValue);
    onSelect({ value: selectedValue, label: selectedLabel });
  };

  return (
    <select value={selectedOption} onChange={handleChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
