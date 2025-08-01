import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";

const statuses = [
  { label: "Виконані", value: "completed" },
  { label: "Не виконані", value: "incomplete" },
  { label: "Прострочені", value: "overdue" },
  { label: "Виконуються", value: "in_progress" },
  { label: "Заплановані", value: "planned" },
];

const TaskFilterPanel = ({
  onFilterChange,
  currentPage,
  totalPages,
  onPageChange,
  children,
}) => {
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [dateFilter, setDateFilter] = useState("all");

  const toggleStatus = (value) => {
    setSelectedStatuses((prev) =>
      prev.includes(value)
        ? prev.filter((status) => status !== value)
        : [...prev, value]
    );
  };

  const handleDateFilter = (e) => {
    setDateFilter(e.target.value);
  };

  const applyFilters = () => {
    onFilterChange({ statuses: selectedStatuses, dateFilter });
  };

  return (
    <Wrapper>
      <Section>
        <Label>Статуси задач:</Label>
        <StatusList>
          {statuses.map(({ label, value }) => (
            <StatusButton
              key={value}
              selected={selectedStatuses.includes(value)}
              onClick={() => toggleStatus(value)}
            >
              {label}
            </StatusButton>
          ))}
        </StatusList>
      </Section>

      <Section>
        <Label>Сортування по даті:</Label>
        <Select value={dateFilter} onChange={handleDateFilter}>
          <option value="all">Всі дати</option>
          <option value="last_5_days">Останні 5 днів</option>
        </Select>
      </Section>

      <ApplyButton onClick={applyFilters}>Застосувати</ApplyButton>
      {children}
      <Pagination>
        <PageButton
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          ← Назад
        </PageButton>
        <PageNumber>
          Сторінка {currentPage} з {totalPages}
        </PageNumber>
        <PageButton
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Вперед →
        </PageButton>
      </Pagination>
    </Wrapper>
  );
};

export default TaskFilterPanel;

const Wrapper = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  background: #f9f9ff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
`;

const Section = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

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

  &:hover {
    background: #e8eaf6;
  }
`;

const Select = styled.select`
  padding: 0.4rem 0.6rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const ApplyButton = styled.button`
  background: #3f51b5;
  color: white;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 0.6rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #303f9f;
  }
`;

const Pagination = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PageButton = styled.button`
  padding: 0.4rem 0.8rem;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageNumber = styled.div`
  font-size: 0.95rem;
  font-weight: bold;
`;

TaskFilterPanel.propTypes = {
  onFilterChange: PropTypes.func,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
  children: PropTypes.node,
};
