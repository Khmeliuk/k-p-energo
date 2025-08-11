import { useCallback, useState } from "react";
import { useCreateTask } from "../../service/reactQuery/reactMutation";
import { useGetCurrentUser } from "../../service/reactQuery/reactQuery";
import SelectSmall from "../smallComponent/SelectSmall";
import MultipleSelectChip from "../smallComponent/MultipleSelectChip";
import ResponsiveDateTimePickers from "../smallComponent/ResponsiveDateTimePickers";
import AddressForm from "../smallComponent/AddressForm";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";

/* === Motion Variants === */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Затримка між елементами
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const TaskForm = () => {
  const createSingleTask = useCreateTask();
  const { data: currentUser } = useGetCurrentUser();

  const [formData, setFormData] = useState({
    department: "",
    task: [],
    dateToEndTask: null,
    address: "",
    addition_info: "",
  });

  const takeAddress = useCallback((value) => {
    setFormData((prev) => ({ ...prev, address: value }));
  }, []);

  const handleChange = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createSingleTask.mutate(formData);
    setFormData({
      owner: currentUser._id,
      department: "",
      task: [],
      dateToEndTask: null,
      address: "",
      addition_info: "",
    });
    e.target.reset();
  };

  return (
    <FormContainer variants={containerVariants} initial="hidden" animate="show">
      <StyledMotionForm onSubmit={handleSubmit}>
        <FlexRow variants={itemVariants}>
          <StyledSelectWrapper>
            <SelectSmall
              options={["1", "2", "3", "4"]}
              name="department"
              value={formData.department}
              onChange={(value) => handleChange("department")(value)}
            />
          </StyledSelectWrapper>

          <StyledSelectWrapper>
            <MultipleSelectChip
              name={"task"}
              options={["Задача 1", "Задача 2", "Задача 3", "Задача 4"]}
              value={formData.task}
              onChange={(value) => handleChange("task")(value)}
            />
          </StyledSelectWrapper>
        </FlexRow>

        <StyledSelectWrapper variants={itemVariants}>
          <ResponsiveDateTimePickers
            value={formData.dateToEndTask}
            onChange={(date) => handleChange("dateToEndTask")(date)}
          />
        </StyledSelectWrapper>

        <StyledSelectWrapper variants={itemVariants}>
          <AddressForm value={formData.address} onChange={takeAddress} />
        </StyledSelectWrapper>

        <TextAreaWrapper variants={itemVariants}>
          <StyledTextArea
            id="addition_info"
            name="addition_info"
            value={formData.addition_info}
            onChange={(e) => handleChange("addition_info")(e.target.value)}
            placeholder="Введіть додаткові деталі..."
          />
        </TextAreaWrapper>

        <AnimatedButton
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          variants={itemVariants}
          disabled={
            !formData.department ||
            formData.task.length === 0 ||
            !formData.dateToEndTask ||
            !formData.address ||
            createSingleTask.isLoading
          }
        >
          Save Task
        </AnimatedButton>
      </StyledMotionForm>
    </FormContainer>
  );
};

/* ===== Styled Components ===== */

const FormContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  max-width: 500px;
  margin: auto;
  /* padding: 1.2rem; */
  /* background: #ffffff; */
  border-radius: 1rem;
  /* box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1); */
`;

const StyledMotionForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
`;

const FlexRow = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const inputBaseStyles = css`
  width: 100%;
  padding: 0.65rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.75rem;
  font-size: 1rem;
  background: white;
  transition: all 0.25s ease;
  &:focus {
    outline: none;
    border-color: #3f51b5;
    box-shadow: 0 0 6px rgba(63, 81, 181, 0.3);
  }
`;

const StyledSelectWrapper = styled(motion.div)`
  flex: 1;
  min-width: 45%;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5;

  select,
  input {
    ${inputBaseStyles}
  }
`;

const TextAreaWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledTextArea = styled.textarea`
  ${inputBaseStyles}
  resize: vertical;
  min-height: 80px;
`;

const AnimatedButton = styled(motion.button)`
  width: 50%;
  padding: 0.75rem 1.25rem;
  background: linear-gradient(135deg, #3f51b5, #5c6bc0);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(63, 81, 181, 0.3);
  transition: all 0.3s ease;
  margin: auto;

  &:hover {
    background: linear-gradient(135deg, #3949ab, #5c6bc0);
    box-shadow: 0 6px 12px rgba(63, 81, 181, 0.4);
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export default TaskForm;
