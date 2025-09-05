import { useTheme, useMediaQuery } from "@mui/material";
import { CheckCircle, Cancel, Schedule, Pause } from "@mui/icons-material";
import styled from "styled-components";
const StatusList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const StatusButton = styled.button`
  padding: 0.4rem 0.8rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ selected }) => (selected ? "#3f51b5" : "#ccc")};
  background: ${({ selected }) => (selected ? "#e0e7ff" : "#fff")};
  color: ${({ selected }) => (selected ? "#1a237e" : "#333")};
  cursor: pointer;
  transition: 0.2s;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  min-width: fit-content;

  &:hover {
    background: #e8eaf6;
  }

  .icon {
    font-size: 1.1rem;
  }

  .label {
    white-space: nowrap;
  }

  .count {
    font-weight: 500;
  }

  // На малих екранах приховуємо текст, залишаємо тільки іконку і число
  @media (max-width: 640px) {
    padding: 0.5rem;
    min-width: 3rem;
    justify-content: center;

    .label {
      display: none;
    }

    .count {
      margin-left: 0.2rem;
    }
  }
`;

const statuses = [
  {
    label: "Виконані",
    value: "done",
    icon: <CheckCircle color="success" />,
  },
  {
    label: "Не виконані",
    value: "incomplete",
    icon: <Cancel color="error" />,
  },
  {
    label: "Заплановані",
    value: "planned",
    icon: <Schedule color="primary" />,
  },
  {
    label: "Відкладенні",
    value: "postpone",
    icon: <Pause color="secondary" />,
  },
];

const ResponsiveStatusButtons = ({
  selectedStatuses,
  toggleStatus,
  stateCount,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <StatusList>
      {statuses.map(({ label, value, icon }) => (
        <StatusButton
          key={value}
          selected={selectedStatuses.includes(value)}
          onClick={() => toggleStatus(value)}
          title={isMobile ? label : undefined} // Підказка на мобільних
        >
          <span className="icon">{icon}</span>
          <span className="label">{label}:</span>
          <span className="count">
            {stateCount?.data?.statusCount[value] || 0}
          </span>
        </StatusButton>
      ))}
    </StatusList>
  );
};

export default ResponsiveStatusButtons;
