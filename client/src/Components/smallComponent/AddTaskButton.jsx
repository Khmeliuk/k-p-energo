import { Button } from "@mui/material";
import styled from "styled-components";

const StyledButton = styled(Button)`
  && {
    position: fixed;
    right: 1%;
    bottom: 12%;
  }
`;
export default function AddTaskButton({ onClick }) {
  return (
    <StyledButton variant="contained" color="primary" onClick={onClick}>
      Add Task
    </StyledButton>
  );
}
