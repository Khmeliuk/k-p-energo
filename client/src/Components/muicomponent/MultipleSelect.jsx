// import * as React from "react";
// import { useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import Chip from "@mui/material/Chip";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const names = ["Задача 1", "Задача 2", "Задача 3", "Задача 4"];

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

// export default function MultipleSelectChip({ onChange }) {
//   const theme = useTheme();
//   const [personName, setPersonName] = React.useState([]);

//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     onChange(
//       // On autofill we get a stringified value.
//       typeof value === "string" ? value.split(",") : value
//     );
//   };

//   return (
//     <FormControl sx={{ m: 1, width: 300 }}>
//       <InputLabel id="demo-multiple-chip-label">Task</InputLabel>
//       <Select
//         labelId="demo-multiple-chip-label"
//         id="demo-multiple-chip"
//         multiple
//         value={personName}
//         onChange={handleChange}
//         input={<OutlinedInput id="select-multiple-chip" label="task" />}
//         renderValue={(selected) => (
//           <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//             {selected.map((value) => (
//               <Chip key={value} label={value} />
//             ))}
//           </Box>
//         )}
//         MenuProps={MenuProps}
//       >
//         {names.map((name) => (
//           <MenuItem
//             key={name}
//             value={name}
//             style={getStyles(name, personName, theme)}
//           >
//             {name}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// }

import PropTypes from "prop-types";

export default function MultipleSelectChip({ value, onChange, options }) {
  const handleChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    onChange(selectedOptions);
  };

  return (
    <div>
      <label htmlFor="tasks">Task:</label>
      <select
        id="tasks"
        name="tasks"
        multiple
        value={value}
        onChange={handleChange}
        style={{ width: "300px", height: "100px" }}
      >
        {options.map((task) => (
          <option key={task} value={task}>
            {task}
          </option>
        ))}
      </select>

      <div style={{ marginTop: "10px" }}>
        {value.map((task) => (
          <span
            key={task}
            style={{
              display: "inline-block",
              backgroundColor: "#e0e0e0",
              borderRadius: "15px",
              padding: "5px 10px",
              margin: "3px",
              fontSize: "0.9em",
            }}
          >
            {task}
          </span>
        ))}
      </div>
    </div>
  );
}

MultipleSelectChip.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};
