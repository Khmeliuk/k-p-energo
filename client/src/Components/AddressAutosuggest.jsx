import { useState } from "react";
import Autosuggest from "react-autosuggest";

const AddressAutosuggest = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [value, setvalue] = useState("");
  const onChange = (e) => {
    setvalue(e);
    console.log("====================================");
    console.log(e);
    console.log("====================================");
  };

  const handleSuggestionsFetchRequested = ({ value }) => {
    if (value.length >= 3) {
      // Фіктивний список підказок. Можете замінити на реальні дані з API.
      const fakeSuggestions = [
        "123 Main St, qwert",
        "456 Elm St, asdf",
        "789 Oak St, zxcvbn",
      ].filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(fakeSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Enter address",
    value,
    onChange: (event, { newValue }) => onChange(newValue),
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
      onSuggestionsClearRequested={handleSuggestionsClearRequested}
      getSuggestionValue={(suggestion) => suggestion}
      renderSuggestion={(suggestion) => <span>{suggestion}</span>}
      inputProps={inputProps}
    />
  );
};

export default AddressAutosuggest;
