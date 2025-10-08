import { useEffect, useMemo, useState } from "react";
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
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const TaskComponent = () => {
  const [isCard, setIsCard] = useState(false);
  const [filter, setFilter] = useState([]);
  const [dateSort, setdateSort] = useState("");
  const [localTasks, setLocalTasks] = useState([]);
  const navigate = useNavigate();
  const {
    data: tasks,
    isLoading,
    isError,
    isFetched,
    isSuccess,
  } = useAllTaskQuery();

  const { isLoading: currentUserIsLoading, isFetched: currentUserIsFetched } =
    useGetCurrentUser();
  const queryClient = useQueryClient();

  const filteredAndSortedTasks = useMemo(() => {
    if (!isSuccess || !tasks?.data?.tasks) return [];

    // Отримуємо актуальні дані з кешу (включаючи оптимістичні оновлення)
    const cachedTasks = queryClient.getQueryData(["tasks"]) || tasks;
    const tasksToFilter = cachedTasks?.data?.tasks || [];

    // Фільтруємо по статусу
    const filtered =
      filter.length > 0
        ? tasksToFilter.filter((task) => filter.includes(task.status))
        : tasksToFilter;

    // Сортуємо по даті
    return sortByDate(filtered, dateSort);
  }, [tasks, filter, dateSort, queryClient, isSuccess]);

  const onViewChange = () => {
    setIsCard((prev) => !prev);
  };

  useEffect(() => {
    if (isSuccess && tasks?.data?.tasks) {
      setLocalTasks(tasks.data.tasks);
    }
  }, [isSuccess, tasks]);

  const onFilterChange = (filterArr) => {
    setFilter(filterArr);
  };

  useEffect(() => {
    if (isSuccess && tasks?.data?.tasks) {
      setLocalTasks(tasks.data.tasks);
    }
  }, [isSuccess, tasks]);

  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (event?.query?.queryKey?.[0] === "tasks" && event.type === "updated") {
        const updatedData = event.query.state.data;
        if (updatedData?.data?.tasks) {
          setLocalTasks(updatedData.data.tasks);
        }
      }
    });

    return unsubscribe;
  }, [queryClient]);

  if (isLoading && currentUserIsLoading) return <div>Loading tasks...</div>;
  if (!currentUserIsFetched) navigate("/auth");
  if (isError) navigate("/auth");

  return (
    <Wrapper>
      <TaskFilterPanel
        onViewChange={onViewChange}
        onFilterChange={onFilterChange}
        onGetDateSort={setdateSort}
      >
        {isFetched && (
          <TaskboardText
            tasks={filteredAndSortedTasks} // Використовуємо мемоізовані дані
            isFetched={isFetched}
          />
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
