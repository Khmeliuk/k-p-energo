import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext, useState } from "react";
import { MyContext } from "../context/reactContext";
import CustomModal from "./Modal/Modal";
import TaskForm from "./TaskForm.jsx/TaskForm";
import { useAllTaskQuery } from "../service/reactQuery/reactQuery";

import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../service/API/asios";
import TaskCard from "./TaskCard";

const user = {
  name: "John Doe",
  avatarUrl: "https://i.pravatar.cc/300", // Зображення користувача
};

const TaskComponent = () => {
  const { store, setStore } = useContext(MyContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const { data: tasks, isLoading, isError, isFetched } = useAllTaskQuery();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const queryQuery = useQueryClient();
  const currentUser = queryQuery.getQueryData(["user"]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = async (e) => {
    if (e.target.textContent === "Logout") {
      console.log("logout");

      try {
        await logout();
        queryClient.clear();
        navigate("/auth");
      } catch (error) {
        console.error("Logout error:", error);
      }
    }

    setAnchorEl(null);
  };
  if (isLoading) return <div>Loading tasks...</div>;

  if (isError) return <div>Error loading tasks.</div>;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Application
          </Typography>
          <Typography variant="h6" sx={{ marginRight: 2 }}>
            {currentUser?.data?.name + " " + currentUser?.data?.lastName}
          </Typography>
          <Avatar src={user.avatarUrl} />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 3 }}>
        <Grid container spacing={3}>
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
        </Grid>
      </Box>
      <CustomModal>
        <TaskForm />
      </CustomModal>
    </Box>
  );
};
export default TaskComponent;
