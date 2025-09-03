import { useState } from "react";
import styled from "styled-components";

const ViewToggle = ({ onClick }) => {
  const [viewMode, setViewMode] = useState(false); // false = cards, true = list

  const toggleView = async () => {
    await setViewMode(!viewMode);
    onClick(viewMode);
  };

  return (
    <Container>
      <ToggleButton onClick={toggleView} $viewMode={viewMode}>
        <IconContainer>
          <CardIcon $isActive={!viewMode}>
            <div className="card-item"></div>
            <div className="card-item"></div>
            <div className="card-item"></div>
            <div className="card-item"></div>
          </CardIcon>

          <ListIcon $isActive={viewMode}>
            <div className="list-item"></div>
            <div className="list-item"></div>
            <div className="list-item"></div>
          </ListIcon>
        </IconContainer>

        <Tooltip $viewMode={viewMode}>
          {viewMode ? "Показати картками" : "Показати списком"}
        </Tooltip>
      </ToggleButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ToggleButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 40px;
  background: ${(props) => (props.$viewMode ? "#3b82f6" : "#1e293b")};
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  overflow: visible;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    & > div:last-child {
      opacity: 1;
      visibility: visible;
      transform: translateY(-100%) scale(1);
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.viewMode ? "rgba(59, 130, 246, 0.3)" : "rgba(30, 41, 59, 0.3)"};
  }
`;

const IconContainer = styled.div`
  position: relative;
  width: 56px;
  height: 32px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
`;

const CardIcon = styled.div`
  position: absolute;
  top: 50%;
  left: ${(props) => (props.$isActive ? "6px" : "32px")};
  transform: translateY(-50%);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  width: 16px;
  height: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${(props) => (props.$isActive ? 1 : 0.5)};
  z-index: ${(props) => (props.$isActive ? 2 : 1)};

  .card-item {
    width: 7px;
    height: 7px;
    background: ${(props) =>
      props.$isActive ? "white" : "rgba(255, 255, 255, 0.6)"};
    border-radius: 1px;
    transition: all 0.3s ease;
  }
`;

const ListIcon = styled.div`
  position: absolute;
  top: 50%;
  left: ${(props) => (props.$isActive ? "6px" : "32px")};
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 16px;
  height: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${(props) => (props.$isActive ? 1 : 0.5)};
  z-index: ${(props) => (props.$isActive ? 2 : 1)};

  .list-item {
    width: 100%;
    height: 2px;
    background: ${(props) =>
      props.$isActive ? "white" : "rgba(255, 255, 255, 0.6)"};
    border-radius: 1px;
    transition: all 0.3s ease;

    &:first-child {
      width: 12px;
    }

    &:last-child {
      width: 10px;
    }
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(-100%) scale(0.8);
  background: #1f2937;
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  pointer-events: none;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: #1f2937;
  }
`;

export default ViewToggle;
