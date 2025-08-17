import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  useAllTaskQuery,
  useGetCurrentUser,
} from "../service/reactQuery/reactQuery";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "../service/API/axios";
import CustomModal from "./Modal/Modal";
import TaskForm from "./TaskForm.jsx/TaskForm";
import TaskFilterPanel from "./smallComponent/TaskFilterPanel";
import TaskboardCarts from "./smallComponent/TaskboardCarts";
import TaskboardText from "./smallComponent/TaskboardText";
import sortByDate from "../service/methods/sort";

const user = {
  name: "John Doe",
  avatarUrl: "https://i.pravatar.cc/300",
};

const TaskComponent = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCard, setIsCard] = useState(false);
  const [filterTasks, setFilterTasks] = useState([]);
  const [filter, setFilter] = useState([]);
  const [dateSort, setdateSort] = useState("");
  const {
    data: tasks,
    isLoading,
    isError,
    isFetched,
    isSuccess,
  } = useAllTaskQuery();
  const { data: currentUser, isLoading: currentUserIsLoading } =
    useGetCurrentUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const onViewChange = (data) => {
    setIsCard(data);
  };

  const getFilterTasks = (filter) => {
    if (isSuccess) {
      const Tasks = tasks.data.tasks.filter((el) => filter.includes(el.status));

      setFilterTasks(sortByDate(Tasks, dateSort));
    }
  };

  useEffect(() => {
    getFilterTasks(filter);
  }, [filter, dateSort]);

  const onFilterChange = (filterArr) => {
    setFilter(filterArr);
  };

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

  if (isLoading && currentUserIsLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Error loading tasks.</div>;

  return (
    <Wrapper>
      <Header>
        <Title>My Application</Title>
        <UserInfo onClick={toggleMenu}>
          <span>
            {currentUser?.data?.name + " " + currentUser?.data?.lastName}
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
      <TaskFilterPanel
        onViewChange={onViewChange}
        onFilterChange={onFilterChange}
        onGetDateSort={setdateSort}
      >
        {isFetched && (
          <>
            {!isCard ? (
              <TaskboardCarts tasks={filterTasks} isFetched={isFetched} />
            ) : (
              <TaskboardText tasks={filterTasks} isFetched={isFetched} />
            )}
          </>
        )}
      </TaskFilterPanel>

      <CustomModal>
        <TaskForm />
      </CustomModal>
    </Wrapper>
  );
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

export default TaskComponent;
