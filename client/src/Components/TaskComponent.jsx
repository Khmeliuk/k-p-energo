import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAllTaskQuery } from "../service/reactQuery/reactQuery";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "../service/API/asios";
import TaskCard from "./TaskCard";
import CustomModal from "./Modal/Modal";
import TaskForm from "./TaskForm.jsx/TaskForm";

const user = {
  name: "John Doe",
  avatarUrl: "https://i.pravatar.cc/300",
};

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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f0f4f8;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #1e293b;
  color: white;
  animation: ${fadeIn} 0.3s ease-out;
`;

const Title = styled.h1`
  font-size: 1.25rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const Dropdown = styled.ul`
  position: absolute;
  right: 1rem;
  top: 4.5rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0.5rem 0;
  animation: ${fadeIn} 0.2s ease;

  li {
    padding: 0.5rem 1rem;
    cursor: pointer;
    &:hover {
      background-color: #f1f5f9;
    }
  }
`;
const MenuItem = styled.li`
  color: #020508;
`;

const TaskContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TaskComponent = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: tasks, isLoading, isError, isFetched } = useAllTaskQuery();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const currentUser = queryClient.getQueryData(["user"]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleMenuClick = async (option) => {
    setMenuOpen(false);
    if (option === "Logout") {
      try {
        await logout();
        queryClient.clear();
        navigate("/auth");
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
  };

  if (isLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Error loading tasks.</div>;

  return (
    <Wrapper>
      <Header>
        <Title>My Application</Title>
        <UserInfo onClick={toggleMenu}>
          <span>
            {currentUser?.data?.name} {currentUser?.data?.lastName}
          </span>
          <Avatar src={user.avatarUrl} />
        </UserInfo>
        {menuOpen && (
          <Dropdown>
            <MenuItem onClick={() => handleMenuClick("Profile")}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => handleMenuClick("My account")}>
              My account
            </MenuItem>
            <MenuItem onClick={() => handleMenuClick("Logout")}>
              Logout
            </MenuItem>
          </Dropdown>
        )}
      </Header>

      <TaskContainer>
        {isFetched &&
          tasks?.data?.map((task) => (
            <TaskCard
              key={task._id}
              department={task.department}
              address={task.address}
              date={task.date}
              tasks={task.task}
              comment={task?.comment}
            />
          ))}
      </TaskContainer>

      <CustomModal>
        <TaskForm />
      </CustomModal>
    </Wrapper>
  );
};

export default TaskComponent;
