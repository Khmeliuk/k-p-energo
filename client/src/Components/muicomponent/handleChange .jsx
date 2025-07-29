import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";

export default function SelectSmall({ options, name, onChange }) {
  // const [optionValue, setoptionValue] = React.useState("");

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">{name}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        name={name}
        value={optionValue}
        label={name}
        onChange={handleChange}
      >
        {options?.map((option) => (
          <MenuItem key={option} name={name} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
SelectSmall.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string,
};
