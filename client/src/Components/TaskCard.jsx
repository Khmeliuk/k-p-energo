import { useState } from "react";
import { TextField, Switch, FormControlLabel, Box } from "@mui/material";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useAllTaskQuery } from "../service/reactQuery/reactQuery";

const CardContainer = styled(Box)`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  max-width: 400px;
  margin: 20px auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const TaskCard = ({ name, department, address, tasks, comment, date }) => {
  const [isEditable, setIsEditable] = useState(false);

  const handleSwitchChange = () => {
    setIsEditable(!isEditable);
  };

  return (
    <CardContainer>
      <FormControlLabel
        control={<Switch checked={isEditable} onChange={handleSwitchChange} />}
        label="Edit Mode"
      />
      <TextField
        label="Owner"
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: !isEditable,
        }}
        defaultValue={name}
      />
      <TextField
        label="Department"
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: !isEditable,
        }}
        defaultValue={department}
      />
      <TextField
        label="Task"
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: !isEditable,
        }}
        defaultValue={tasks}
      />
      <TextField
        label="Address"
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: !isEditable,
        }}
        defaultValue={address}
      />
      <TextField
        label="date"
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: !isEditable,
        }}
        defaultValue={date}
      />
    </CardContainer>
  );
};

export default TaskCard;
