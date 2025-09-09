import styled from "styled-components";
import TaskCard from "./TaskCard";

const TaskboardCarts = ({ tasks = [], isFetched }) => {
  return (
    <TaskContainer>
      {isFetched &&
        tasks?.map((task) => (
          <TaskCard
            key={task?._id}
            // owner={task?.owner}
            department={task?.department}
            address={task?.address}
            date={task?.date}
            tasks={task?.task}
            comment={task?.comment}
            createDate={task?.createDate}
            dateToEndTask={task?.dateToEndTask}
          />
        ))}
    </TaskContainer>
  );
};

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

export default TaskboardCarts;
