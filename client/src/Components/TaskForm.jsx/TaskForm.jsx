import { Box, Button, TextField } from "@mui/material";
import { useContext } from "react";
import styled from "styled-components";
import { MyContext } from "../../context/reactContext";
import SelectSmall from "../muicomponent/handleChange ";
import ResponsiveDateTimePickers from "../muicomponent/DateTimePicker";
import { useCreateTask } from "../../service/reactQuery/reactMutation";
import MultipleSelectChip from "../muicomponent/MultipleSelect";
import AddressForm from "../AddressForm";
import { useQueryClient } from "@tanstack/react-query";

const StyledBox = styled.div`
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: white;
  border: none;
  box-shadow: 24px;
  padding: 16px;
  display: contents;
  gap: 16px;
`;

const TaskForm = () => {
  const createSingleTask = useCreateTask();

  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData(["user"]);
  console.log("====================================");
  console.log(currentUser);
  console.log("====================================");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataValue = Object.fromEntries(formData.entries());
    dataValue.owner = currentUser.data._id;
    console.log(dataValue);
    createSingleTask.mutate(dataValue);
    e.currentTarget.reset();
  };

  return (
    <StyledBox>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex" }}>
          <SelectSmall options={["1", "2", "3", "4"]} name={"department"} />
          <MultipleSelectChip />
        </Box>
        <ResponsiveDateTimePickers />

        <AddressForm />
        <TextField
          name="personalized"
          label="Personalized"
          variant="outlined"
          fullWidth
          margin="dense"
          // value={formData.personalized}
          // onChange={handleChange}
          required
        />
        <Button
          margin="10 0 0 0 "
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Save Task
        </Button>
      </form>
    </StyledBox>
  );
};

export default TaskForm;
