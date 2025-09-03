import { useEffect, useState } from "react";
import styled from "styled-components";

import {
  useAllTaskQuery,
  useGetCurrentUser,
} from "../service/reactQuery/reactQuery";

import CustomModal from "./Modal/Modal";
import TaskForm from "./TaskForm.jsx/TaskForm";
import TaskFilterPanel from "./smallComponent/TaskFilterPanel";
import TaskboardCarts from "./smallComponent/TaskboardCarts";
import TaskboardText from "./smallComponent/TaskboardText";
import sortByDate from "../service/methods/sort";

const TaskComponent = () => {
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
  const { isLoading: currentUserIsLoading } = useGetCurrentUser();

  const onViewChange = () => {
    setIsCard((prev) => !prev);
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

  useEffect(() => {
    if (isFetched) {
      console.log("====================================");
      console.log(isFetched, "isFetched");
      console.log("====================================");
    }
  });

  const onFilterChange = (filterArr) => {
    setFilter(filterArr);
  };

  if (isLoading && currentUserIsLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Error loading tasks.</div>;

  return (
    <Wrapper>
      <TaskFilterPanel
        onViewChange={onViewChange}
        onFilterChange={onFilterChange}
        onGetDateSort={setdateSort}
      >
        {isFetched && (
          <>
            {isCard ? (
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f0f4f8;
  width: 100%;
`;

export default TaskComponent;
