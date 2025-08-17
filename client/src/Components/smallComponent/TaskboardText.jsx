import styled, { keyframes } from "styled-components";
import {
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
  FiCalendar,
} from "react-icons/fi";

// Анімація появи знизу
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
`;

const TaskItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ddd;
  animation: ${fadeInUp} 0.3s ease forwards;
  background-color: ${({ status }) =>
    status === "done"
      ? "rgba(0, 200, 0, 0.08)"
      : status === "overdue"
      ? "rgba(255, 0, 0, 0.08)"
      : status === "in-progress"
      ? "rgba(255, 165, 0, 0.08)"
      : status === "planned"
      ? "rgba(0, 0, 255, 0.08)"
      : "#fff"};
  transition: background-color 0.4s ease, transform 0.2s ease,
    box-shadow 0.2s ease;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    align-items: center;
    gap: 16px;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
`;

const TaskHeader = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const TaskDetails = styled.div`
  font-size: 14px;
  color: #555;
`;

const TaskDate = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 4px;
`;

const StatusIcon = styled.span`
  font-size: 18px;
`;

const getStatusIcon = (status) => {
  switch (status) {
    case "done":
      return <FiCheckCircle color="green" />;
    case "overdue":
      return <FiAlertTriangle color="red" />;
    case "in-progress":
      return <FiClock color="orange" />;
    case "planned":
      return <FiCalendar color="blue" />;
    default:
      return <FiClock color="gray" />;
  }
};

export default function TaskboardText({ tasks, isFetched }) {
  return (
    isFetched && (
      <TaskList>
        {tasks?.map((task, index) => (
          <TaskItem key={index} status={task.status}>
            <div>
              <TaskHeader>
                <StatusIcon>{getStatusIcon(task.status)}</StatusIcon>
                Owner: {task?.owner.name} | Department {task?.department}
              </TaskHeader>
              <TaskDetails>{task?.task}</TaskDetails>
              <TaskDetails>{task?.address}</TaskDetails>
            </div>
            <div>
              <TaskDate>Created: {task.createDate}</TaskDate>
              <TaskDate>End: {task.dateToEndTask}</TaskDate>
            </div>
          </TaskItem>
        ))}
      </TaskList>
    )
  );
}
