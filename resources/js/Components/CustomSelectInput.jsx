import React, { useState, useRef, useEffect } from "react";

const CustomSelectInput = ({ label, placeholder, options, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    setSelectedValue(event.target.value);
    setShowSuggestions(event.target.value.length > 0);
    filterSuggestions(event.target.value);
  };

  const handleSelectOption = (option) => {
    setSelectedValue(option);
    setShowSuggestions(false);
    onSelect(option); // Emit the selected option
  };

  const filterSuggestions = (value) => {
    // Implement your custom filtering logic here
    // You can use fuzzy matching, case-insensitive search, etc.
    setSuggestions(
      options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div className="custom-select-input">
      <label htmlFor="custom-select">{label}</label>
      <input
        type="text"
        id="custom-select"
        ref={inputRef}
        value={selectedValue}
        onChange={handleInputChange}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            if (suggestions.length > 0) {
              handleSelectOption(suggestions[0]);
            }
          }
        }}
        placeholder={placeholder}
      />
      <ul className="suggestions" v-if={showSuggestions}>
        {suggestions.map((option) => (
          <li key={option} onClick={() => handleSelectOption(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomSelectInput;
