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
