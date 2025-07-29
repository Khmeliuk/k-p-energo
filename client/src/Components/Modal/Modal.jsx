import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import styled from "styled-components";
import PropTypes from "prop-types";

//styled
const StyledDialog = styled(Dialog)`
  & .MuiPaper-root {
    height: inherit;
  }
`;

const CustomModal = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add New Task
      </Button>
      <StyledDialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          {children}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </StyledDialog>
    </div>
  );
};

CustomModal.propTypes = { children: PropTypes.node.isRequired };

export default CustomModal;
