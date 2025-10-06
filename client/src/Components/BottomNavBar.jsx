import { useState } from "react";
import styled from "styled-components";
import { Menu, FileText, Lightbulb, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #1b5e63;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 70px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.15);
  z-index: 1000;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 12px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${(props) =>
    props.$isActive ? "#ffffff" : "rgba(255, 255, 255, 0.7)"};
  transition: all 0.3s ease;
  min-width: 70px;

  &:hover {
    color: #ffffff;
  }
`;

const NavLabel = styled.span`
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const BottomNavBar = () => {
  const [activeTab, setActiveTab] = useState(0);

  const navItems = [
    { icon: Menu, label: "ПЛАН", to: "/plan" },
    { icon: FileText, label: "ФАКТ", to: "/fact" },
    { icon: Lightbulb, label: "План-Факт", to: "/plan-fact" },
    { icon: CheckCircle, label: "ПЛАНСП", to: "/plansp" },
  ];

  return (
    <NavContainer>
      {navItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <StyledLink
            to={item.to}
            key={index}
            $isActive={activeTab === index}
            onClick={() => setActiveTab(index)}
          >
            <Icon size={28} strokeWidth={2} />
            <NavLabel>{item.label}</NavLabel>
          </StyledLink>
        );
      })}
    </NavContainer>
  );
};

export default BottomNavBar;
