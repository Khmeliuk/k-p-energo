import styled from "styled-components";
import PropTypes from "prop-types";
import { dateConvector } from "../../service/methods/dateConvector";
import { useState, useMemo } from "react";
import {
  TextField,
  FormControlLabel,
  Switch,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  PendingActions,
  HourglassBottom,
} from "@mui/icons-material";

const CardContainer = styled.div`
  position: relative;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  background: #fff;
  margin-bottom: 1rem;
`;

const StatusIcon = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const TaskCard = ({
  owner,
  department,
  address,
  tasks,
  dateToEndTask,
  createDate,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [status, setStatus] = useState("заплановане");

  const newdateToEndTask = dateConvector(dateToEndTask);
  const newCreateDate = dateConvector(createDate);
  const now = new Date();

  const handleSwitchChange = () => {
    setIsEditable((prev) => !prev);
  };

  const getStatusIcon = useMemo(() => {
    switch (status) {
      case "виконано":
        return (
          <Tooltip title="Виконано">
            <CheckCircle color="success" />
          </Tooltip>
        );
      case "не виконано":
        return (
          <Tooltip title="Не виконано">
            <Cancel color="error" />
          </Tooltip>
        );
      case "виконується":
        return (
          <Tooltip title="Виконується">
            <HourglassBottom color="warning" />
          </Tooltip>
        );
      case "заплановане":
      default:
        return (
          <Tooltip title="Заплановане">
            <PendingActions color="disabled" />
          </Tooltip>
        );
    }
  }, [status]);

  // Автоматична логіка для статусу (окрім ручного)
  useMemo(() => {
    if (status === "виконано" || status === "не виконано") return;
    const taskEnd = new Date(dateToEndTask);
    if (now === taskEnd) {
      setStatus("виконується");
    } else if (now < taskEnd) {
      setStatus("заплановане");
    } else if (now > taskEnd) {
      setStatus("заплановане");
    }
  }, [dateToEndTask]);

  const toggleStatus = () => {
    if (!isEditable) return;
    setStatus((prev) => (prev === "виконано" ? "не виконано" : "виконано"));
  };

  return (
    <CardContainer>
      <StatusIcon>
        <IconButton onClick={toggleStatus} disabled={!isEditable}>
          {getStatusIcon}
        </IconButton>
      </StatusIcon>

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
        defaultValue={`${owner.name} ${owner.lastName}`}
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
        label="createDate"
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
        defaultValue={newCreateDate}
      />
      <TextField
        label="dateToEndTask"
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
        defaultValue={newdateToEndTask}
      />
    </CardContainer>
  );
};

export default TaskCard;

TaskCard.propTypes = {
  owner: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }),
  department: PropTypes.number,
  address: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.string).isRequired,
  dateToEndTask: PropTypes.string,
  createDate: PropTypes.string.isRequired,
};
