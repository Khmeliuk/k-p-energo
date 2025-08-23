import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiUser,
  FiBriefcase,
  FiMapPin,
  FiFileText,
  FiPause,
} from "react-icons/fi";

const getStatusIcon = (status) => {
  switch (status) {
    case "done":
      return <FiCheckCircle />;
    case "overdue":
      return <FiAlertTriangle />;
    case "in-progress":
      return <FiClock />;
    case "planned":
      return <FiCalendar />;
    case "postpone":
      return <FiPause />;
    default:
      return <FiClock />;
  }
};

const getStatusText = (status) => {
  switch (status) {
    case "done":
      return "Completed";
    case "overdue":
      return "Overdue";
    case "in-progress":
      return "In Progress";
    case "planned":
      return "Planned";
    case "postpone":
      return "Postponed";
    default:
      return "Unknown";
  }
};

export default function TaskboardText({ tasks, isFetched, onStatusChange }) {
  const [expandedTasks, setExpandedTasks] = useState(new Set());
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleExpand = (index, e) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedTasks(newExpanded);
  };

  const toggleDropdown = (index, e) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleStatusChange = (taskIndex, newStatus, e) => {
    e.stopPropagation();
    console.log(newStatus);

    if (onStatusChange) {
      onStatusChange(taskIndex, newStatus);
    }
    setOpenDropdown(null);
  };

  const handleTaskClick = (index, e) => {
    // Закриваємо dropdown якщо клікнули поза ним
    if (openDropdown !== null && !e.target.closest("[data-dropdown]")) {
      setOpenDropdown(null);
    }
  };

  // Закриваємо dropdown при кліку поза компонентом
  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    isFetched && (
      <TaskList>
        {tasks?.map((task, index) => (
          <TaskItem
            key={index}
            status={task.status}
            onClick={(e) => handleTaskClick(index, e)}
          >
            <TaskHeader>
              <TaskTitle>
                <StatusDropdownWrapper data-dropdown>
                  <StatusBadge
                    status={task.status}
                    onClick={(e) => toggleDropdown(index, e)}
                  >
                    <StatusIcon>{getStatusIcon(task.status)}</StatusIcon>
                    {getStatusText(task.status)}
                  </StatusBadge>
                  {openDropdown === index && (
                    <StatusDropdown>
                      <StatusOption
                        status="done"
                        $isSelected={task.status === "done"}
                        onClick={(e) => handleStatusChange(index, "done", e)}
                      >
                        <FiCheckCircle />
                        Completed
                      </StatusOption>
                      <StatusOption
                        status="postpone"
                        $isSelected={task.status === "postpone"}
                        onClick={(e) =>
                          handleStatusChange(index, "postpone", e)
                        }
                      >
                        <FiPause />
                        Postponed
                      </StatusOption>
                    </StatusDropdown>
                  )}
                </StatusDropdownWrapper>
              </TaskTitle>
              <ExpandButton onClick={(e) => toggleExpand(index, e)}>
                {expandedTasks.has(index) ? "Less" : "More"}
                {expandedTasks.has(index) ? <FiChevronUp /> : <FiChevronDown />}
              </ExpandButton>
            </TaskHeader>

            <BasicInfo>
              <InfoItem>
                <FiUser size={14} style={{ color: "#6c757d" }} />
                <InfoLabel>Owner:</InfoLabel>
                <InfoValue>{task?.owner?.name}</InfoValue>
              </InfoItem>
              <InfoItem>
                <FiBriefcase size={14} style={{ color: "#6c757d" }} />
                <InfoLabel>Department:</InfoLabel>
                <InfoValue>{task?.department}</InfoValue>
              </InfoItem>
              <InfoItem>
                <FiCalendar size={14} style={{ color: "#6c757d" }} />
                <InfoLabel>Created:</InfoLabel>
                <InfoValue>{task.createDate}</InfoValue>
              </InfoItem>
            </BasicInfo>

            {expandedTasks.has(index) && (
              <ExpandedContent>
                {task?.task && (
                  <TaskDescription status={task.status}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginBottom: "8px",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      <FiFileText size={14} />
                      Task Description:
                    </div>
                    {task.task}
                  </TaskDescription>
                )}

                {task?.address && (
                  <InfoItem style={{ marginBottom: "12px" }}>
                    <FiMapPin size={14} style={{ color: "#6c757d" }} />
                    <InfoLabel>Address:</InfoLabel>
                    <InfoValue>{task.address}</InfoValue>
                  </InfoItem>
                )}

                <DateInfo>
                  <DateItem>
                    <FiCalendar size={12} />
                    <strong>Created:</strong> {task.createDate}
                  </DateItem>
                  <DateItem>
                    <FiClock size={12} />
                    <strong>Deadline:</strong> {task.dateToEndTask}
                  </DateItem>
                </DateInfo>
              </ExpandedContent>
            )}
          </TaskItem>
        ))}
      </TaskList>
    )
  );
}

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

// Анімація розкриття контенту
const expandContent = keyframes`
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 300px;
    opacity: 1;
  }
`;

// Анімація пульсації для активних завдань
const pulse = keyframes`
  0% {
    box-shadow: 0 2px 8px rgba(255, 165, 0, 0.3);
  }
  50% {
    box-shadow: 0 4px 16px rgba(255, 165, 0, 0.5);
  }
  100% {
    box-shadow: 0 2px 8px rgba(255, 165, 0, 0.3);
  }
`;

// Анімація для dropdown
const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px;

  @media (min-width: 768px) {
    gap: 16px;
    padding: 16px;
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const TaskItem = styled.div`
  position: relative;
  padding: 12px;
  border-radius: 8px;
  animation: ${fadeInUp} 0.3s ease forwards;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 20px;
    border-radius: 12px;
    transition: all 0.3s ease;
  }

  ${({ status }) => {
    switch (status) {
      case "done":
        return `
          background: linear-gradient(135deg, #d4edda 0%, #f8fff9 100%);
          border: 1px solid #28a745;
          box-shadow: 0 2px 8px rgba(40, 167, 69, 0.1);
          
          @media (min-width: 768px) {
            border: 2px solid #28a745;
            box-shadow: 0 4px 15px rgba(40, 167, 69, 0.15);
          }
        `;
      case "overdue":
        return `
          background: linear-gradient(135deg, #f8d7da 0%, #fff5f5 100%);
          border: 1px solid #dc3545;
          box-shadow: 0 2px 8px rgba(220, 53, 69, 0.1);
          
          @media (min-width: 768px) {
            border: 2px solid #dc3545;
            box-shadow: 0 4px 15px rgba(220, 53, 69, 0.15);
          }
        `;
      case "in-progress":
        return `
          background: linear-gradient(135deg, #fff3cd 0%, #fffbf0 100%);
          border: 1px solid #ffc107;
          box-shadow: 0 2px 8px rgba(255, 193, 7, 0.1);
          animation: ${pulse} 2s infinite;
          
          @media (min-width: 768px) {
            border: 2px solid #ffc107;
            box-shadow: 0 4px 15px rgba(255, 193, 7, 0.15);
          }
        `;
      case "planned":
        return `
          background: linear-gradient(135deg, #cce7ff 0%, #f0f8ff 100%);
          border: 1px solid #007bff;
          box-shadow: 0 2px 8px rgba(0, 123, 255, 0.1);
          
          @media (min-width: 768px) {
            border: 2px solid #007bff;
            box-shadow: 0 4px 15px rgba(0, 123, 255, 0.15);
          }
        `;
      case "postpone":
        return `
          background: linear-gradient(135deg, #f3e5f5 0%, #faf6fb 100%);
          border: 1px solid #9c27b0;
          box-shadow: 0 2px 8px rgba(156, 39, 176, 0.1);
          
          @media (min-width: 768px) {
            border: 2px solid #9c27b0;
            box-shadow: 0 4px 15px rgba(156, 39, 176, 0.15);
          }
        `;
      default:
        return `
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          border: 1px solid #e9ecef;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          
          @media (min-width: 768px) {
            border: 2px solid #e9ecef;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          }
        `;
    }
  }}

  &:hover {
    transform: translateY(-1px);

    @media (min-width: 768px) {
      transform: translateY(-4px) scale(1.01);
    }

    ${({ status }) => {
      switch (status) {
        case "done":
          return `box-shadow: 0 4px 16px rgba(40, 167, 69, 0.2);`;
        case "overdue":
          return `box-shadow: 0 4px 16px rgba(220, 53, 69, 0.2);`;
        case "in-progress":
          return `box-shadow: 0 4px 16px rgba(255, 193, 7, 0.2);`;
        case "planned":
          return `box-shadow: 0 4px 16px rgba(0, 123, 255, 0.2);`;
        case "postpone":
          return `box-shadow: 0 4px 16px rgba(156, 39, 176, 0.2);`;
        default:
          return `box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);`;
      }
    }}
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;

    @media (min-width: 768px) {
      width: 4px;
    }

    ${({ status }) => {
      switch (status) {
        case "done":
          return `background: #28a745;`;
        case "overdue":
          return `background: #dc3545;`;
        case "in-progress":
          return `background: #ffc107;`;
        case "planned":
          return `background: #007bff;`;
        case "postpone":
          return `background: #9c27b0;`;
        default:
          return `background: #6c757d;`;
      }
    }}
  }
`;

const TaskHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  flex-wrap: wrap;
  gap: 8px;

  @media (min-width: 768px) {
    margin-bottom: 12px;
    flex-wrap: nowrap;
  }
`;

const TaskTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 14px;
  color: #2c3e50;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const ExpandButton = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #6c757d;
  font-weight: 500;
  transition: all 0.2s ease;
  padding: 4px 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.7);

  @media (min-width: 768px) {
    font-size: 12px;
    padding: 6px 12px;
  }

  &:hover {
    color: #495057;
    background: rgba(255, 255, 255, 0.9);
    transform: scale(1.05);
  }
`;

const StatusDropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  @media (min-width: 768px) {
    gap: 6px;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    letter-spacing: 0.5px;
  }

  &:hover {
    transform: scale(1.05);
  }

  ${({ status }) => {
    switch (status) {
      case "done":
        return `
          background: rgba(40, 167, 69, 0.2);
          color: #155724;
          border: 1px solid rgba(40, 167, 69, 0.3);
        `;
      case "overdue":
        return `
          background: rgba(220, 53, 69, 0.2);
          color: #721c24;
          border: 1px solid rgba(220, 53, 69, 0.3);
        `;
      case "in-progress":
        return `
          background: rgba(255, 193, 7, 0.2);
          color: #856404;
          border: 1px solid rgba(255, 193, 7, 0.3);
        `;
      case "planned":
        return `
          background: rgba(0, 123, 255, 0.2);
          color: #004085;
          border: 1px solid rgba(0, 123, 255, 0.3);
        `;
      case "postpone":
        return `
          background: rgba(156, 39, 176, 0.2);
          color: #4a148c;
          border: 1px solid rgba(156, 39, 176, 0.3);
        `;
      default:
        return `
          background: rgba(108, 117, 125, 0.2);
          color: #495057;
          border: 1px solid rgba(108, 117, 125, 0.3);
        `;
    }
  }}
`;

const StatusDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  animation: ${slideDown} 0.2s ease forwards;
  min-width: 140px;
  overflow: hidden;

  @media (min-width: 768px) {
    min-width: 160px;
  }
`;

const StatusOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  @media (min-width: 768px) {
    padding: 10px 16px;
    font-size: 13px;
  }

  &:hover {
    background: #f8f9fa;
  }

  ${({ status, $isSelected }) => {
    if ($isSelected) {
      switch (status) {
        case "done":
          return `background: rgba(40, 167, 69, 0.1); color: #155724;`;
        case "postpone":
          return `background: rgba(156, 39, 176, 0.1); color: #4a148c;`;
        default:
          return `background: #f8f9fa;`;
      }
    }
  }}
`;

const BasicInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
    margin-bottom: 8px;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #495057;
  padding: 6px 8px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 6px;
  transition: all 0.2s ease;

  @media (min-width: 768px) {
    font-size: 14px;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 8px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: translateX(1px);

    @media (min-width: 768px) {
      transform: translateX(2px);
    }
  }
`;

const InfoLabel = styled.span`
  font-weight: 500;
  color: #6c757d;
`;

const InfoValue = styled.span`
  font-weight: 600;
`;

const ExpandedContent = styled.div`
  animation: ${expandContent} 0.3s ease forwards;
  overflow: hidden;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    margin-top: 16px;
    padding-top: 16px;
  }
`;

const TaskDescription = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 12px;
  font-size: 13px;
  line-height: 1.5;
  color: #495057;

  @media (min-width: 768px) {
    padding: 16px;
    border-radius: 8px;
    font-size: 14px;
    line-height: 1.6;
  }

  border-left: 3px solid
    ${({ status }) => {
      switch (status) {
        case "done":
          return "#28a745";
        case "overdue":
          return "#dc3545";
        case "in-progress":
          return "#ffc107";
        case "planned":
          return "#007bff";
        case "postpone":
          return "#9c27b0";
        default:
          return "#6c757d";
      }
    }};
`;

const DateInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 12px;
  }
`;

const DateItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  font-size: 11px;
  color: #6c757d;

  @media (min-width: 768px) {
    gap: 8px;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 13px;
  }
`;

const StatusIcon = styled.span`
  font-size: 16px;
  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

// PropTypes для TaskboardText компонента
TaskboardText.propTypes = {
  // Масив завдань
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      // Статус завдання
      status: PropTypes.oneOf([
        "done",
        "overdue",
        "in-progress",
        "planned",
        "postpone",
      ]).isRequired,

      // Інформація про власника завдання
      owner: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }).isRequired,

      // Департамент
      department: PropTypes.string.isRequired,

      // Опис завдання
      task: PropTypes.string,

      // Адреса (опціонально)
      address: PropTypes.string,

      // Дата створення
      createDate: PropTypes.string.isRequired,

      // Дата завершення
      dateToEndTask: PropTypes.string.isRequired,

      // Додаткові поля (опціонально)
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      priority: PropTypes.oneOf(["low", "medium", "high"]),
      tags: PropTypes.arrayOf(PropTypes.string),
    })
  ),

  // Чи завантажені дані
  isFetched: PropTypes.bool.isRequired,

  // Колбек для зміни статусу
  onStatusChange: PropTypes.func,
};

// Дефолтні значення
TaskboardText.defaultProps = {
  tasks: [],
  onStatusChange: null,
};
