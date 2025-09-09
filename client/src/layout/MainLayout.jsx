import { useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useGetCurrentUser } from "../service/reactQuery/reactQuery";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "../service/API/axios";
import { useSyncAuthAcrossTabs } from "../hooks/useSyncAuthAcrossTabs";
import { useClickOutside } from "../hooks/useClickOutside ";

const user = {
  avatarUrl: "https://i.pravatar.cc/300",
  name: "John Doe",
};

const MainLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { notifyAuthUpdate } = useSyncAuthAcrossTabs();
  const menuRef = useRef(null);

  const navigate = useNavigate();

  const { data: currentUser } = useGetCurrentUser();

  useClickOutside(menuRef, () => setMenuOpen(false), menuOpen);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const queryClient = useQueryClient();

  const syncLogout = async () => {
    await logout(); // твій API-запит
    queryClient.invalidateQueries(["user"]);
    notifyAuthUpdate(); // повідомляємо інші вкладки
  };

  const handleMenuClick = async (option) => {
    setMenuOpen(false);
    if (option === "Logout") {
      try {
        await syncLogout();
        queryClient.clear();
        navigate("/auth");
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
  };

  const handleSidebarItemClick = (item) => {
    console.log(`Navigating to: ${item}`);
    navigate(item);
    toggleSidebar();
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    navigate("Profile");
    toggleMenu();
  };

  return (
    <Wrapper>
      {/* Header */}
      <Header>
        <HeaderLeft>
          <MenuButton onClick={toggleSidebar}>
            <MenuIcon />
          </MenuButton>
          <Title onClick={() => navigate("/")}>K-P Energo</Title>
        </HeaderLeft>

        <UserInfo onClick={toggleMenu}>
          <UserName>
            {currentUser.data.name} &emsp; {currentUser.data.lastName}
          </UserName>
          <Avatar src={user.avatarUrl} alt="User Avatar" />
        </UserInfo>

        {menuOpen && (
          <Dropdown ref={menuRef}>
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
            <MenuItem onClick={() => handleMenuClick("Settings")}>
              Settings
            </MenuItem>
            <MenuItem onClick={() => handleMenuClick("Logout")}>
              Logout
            </MenuItem>
          </Dropdown>
        )}
      </Header>

      <MainContainer>
        {/* Sidebar */}
        <Sidebar $isOpen={sidebarOpen}>
          <SidebarHeader>
            <SidebarTitle>Navigation</SidebarTitle>
            <CloseButton onClick={toggleSidebar}>×</CloseButton>
          </SidebarHeader>

          <SidebarNav>
            <SidebarItem onClick={() => handleSidebarItemClick("Dashboard")}>
              <SidebarIcon>📊</SidebarIcon>
              Dashboard
            </SidebarItem>
            <SidebarItem onClick={() => handleSidebarItemClick("Projects")}>
              <SidebarIcon>📁</SidebarIcon>
              Projects
            </SidebarItem>
            <SidebarItem onClick={() => handleSidebarItemClick("Tasks")}>
              <SidebarIcon>✅</SidebarIcon>
              Tasks
            </SidebarItem>
            <SidebarItem onClick={() => handleSidebarItemClick("Team")}>
              <SidebarIcon>👥</SidebarIcon>
              Team
            </SidebarItem>
            <SidebarItem onClick={() => handleSidebarItemClick("Reports")}>
              <SidebarIcon>📈</SidebarIcon>
              Reports
            </SidebarItem>
          </SidebarNav>
        </Sidebar>

        {/* Overlay for mobile */}
        {sidebarOpen && <Overlay onClick={toggleSidebar} />}

        {/* Main Content */}
        <Outlet />
      </MainContainer>

      {/* Footer */}
      <Footer>
        <FooterContent>
          <FooterSection>
            <FooterTitle>K-P Energo</FooterTitle>
            <FooterText>Building amazing experiences together</FooterText>
          </FooterSection>

          {/* <FooterSection>
            <FooterTitle>Quick Links</FooterTitle>
            <FooterLink>About</FooterLink>
            <FooterLink>Support</FooterLink>
            <FooterLink>Privacy</FooterLink>
          </FooterSection> */}

          <FooterSection>
            <FooterTitle>Contact</FooterTitle>
            <FooterText>hello@myapp.com</FooterText>
            <FooterText>+1 (555) 123-4567</FooterText>
          </FooterSection>
        </FooterContent>

        <FooterBottom>
          <FooterText>© 2025 K-P Energo. All rights reserved.</FooterText>
        </FooterBottom>
      </Footer>
    </Wrapper>
  );
};

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

// Styled Components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8fafc;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #1e293b;
  color: white;
  position: relative;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;

  @media (min-width: 768px) {
    padding: 1rem 2rem;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

const MenuIcon = styled.div`
  width: 20px;
  height: 2px;
  background-color: white;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 2px;
    background-color: white;
  }

  &::before {
    top: -6px;
    left: 0;
  }

  &::after {
    top: 6px;
    left: 0;
  }
`;

const Title = styled.h1`
  font-size: 1.25rem;
  margin: 0;
  cursor: pointer;
  user-select: none;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const UserName = styled.span`
  display: none;

  @media (min-width: 640px) {
    display: block;
  }
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;

  @media (min-width: 640px) {
    width: 40px;
    height: 40px;
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  right: 1rem;
  top: 4.5rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  list-style: none;
  padding: 0.5rem 0;
  min-width: 150px;
  animation: ${fadeIn} 0.2s ease;
  z-index: 1001;

  @media (min-width: 768px) {
    right: 2rem;
  }
`;

const MenuItem = styled.li`
  padding: 0.75rem 1rem;
  cursor: pointer;
  color: #334155;
  font-size: 0.875rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f1f5f9;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`;

const Sidebar = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 280px;
  background-color: white;
  border-right: 1px solid #e2e8f0;
  z-index: 999;
  transform: translateX(${(props) => (props.$isOpen ? "0" : "-100%")});
  transition: transform 0.3s ease;
  padding-top: 80px;
  overflow-y: auto;

  @media (min-width: 1024px) {
    position: static;
    transform: translateX(0);
    padding-top: 0;
    width: 280px;
    animation: ${slideIn} 0.3s ease-out;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;

  @media (min-width: 1024px) {
    padding: 1.5rem 1rem 1rem;
  }
`;

const SidebarTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  font-size: 24px;
  color: #64748b;
  cursor: pointer;
  border-radius: 0.25rem;

  &:hover {
    background-color: #f1f5f9;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

const SidebarNav = styled.nav`
  padding: 1rem;
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  color: #64748b;
  font-size: 0.875rem;
  transition: all 0.2s;

  &:hover {
    background-color: #f1f5f9;
    color: #1e293b;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const SidebarIcon = styled.span`
  font-size: 1.125rem;
  width: 20px;
  text-align: center;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const Footer = styled.footer`
  background-color: #1e293b;
  color: white;
  margin-top: auto;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 2rem 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    padding: 2rem;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FooterTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
`;

const FooterText = styled.p`
  color: #cbd5e1;
  font-size: 0.875rem;
  margin: 0;
`;

const FooterLink = styled.a`
  color: #cbd5e1;
  font-size: 0.875rem;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: white;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #334155;
  padding: 1rem;
  text-align: center;

  @media (min-width: 768px) {
    padding: 1rem 2rem;
  }
`;

export default MainLayout;
