import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledDialog = styled(Dialog)`
  & .MuiPaper-root {
    width: 500px;
    height: 600px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    border-radius: 12px;

    /* Адаптивність для мобілок */
    @media (max-width: 600px) {
      width: 95vw;
      height: 90vh;
      margin: 0 10px;
      border-radius: 8px;
    }
  }
`;

const StyledDialogContent = styled(DialogContent)`
  flex: 1 1 auto;
  overflow-y: auto;
  padding-right: 16px;
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
      <StyledButton
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Add New Task
      </StyledButton>
      <StyledDialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <StyledDialogContent dividers>{children}</StyledDialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </StyledDialog>
    </div>
  );
};

CustomModal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomModal;

const StyledButton = styled(Button)`
  && {
    position: fixed;
    right: 1%;
    bottom: 5%;
  }
`;
