// import { Box, Button, TextField } from "@mui/material";
// import styled from "styled-components";
// import SelectSmall from "../muicomponent/handleChange ";
// import ResponsiveDateTimePickers from "../muicomponent/DateTimePicker";
// import { useCreateTask } from "../../service/reactQuery/reactMutation";
// import MultipleSelectChip from "../muicomponent/MultipleSelect";
// import AddressForm from "../AddressForm";
// import { useQueryClient } from "@tanstack/react-query";

// const StyledBox = styled.div`
//   transform: translate(-50%, -50%);
//   width: 400px;
//   background-color: white;
//   border: none;
//   box-shadow: 24px;
//   padding: 16px;
//   display: contents;
//   gap: 16px;
// `;

// import { useState } from "react";
// import { Box, Button, TextField } from "@mui/material";
// import SelectSmall from "./SelectSmall";
// import MultipleSelectChip from "./MultipleSelectChip";
// import ResponsiveDateTimePickers from "./ResponsiveDateTimePickers";
// import AddressForm from "./AddressForm";
// import { StyledBox } from "./StyledBox";
// import { useCreateTask } from "../hooks/useCreateTask";

// const TaskForm = () => {
//   const createSingleTask = useCreateTask();

//   const [formData, setFormData] = useState({
//     department: "",
//     task: [],
//     dateToEndTask: null,
//     address: "",
//     description: "",
//   });

//   const handleChange = (field) => (value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     createSingleTask.mutate(formData);
//     // Очистити форму
//     setFormData({
//       department: "",
//       task: [],
//       dateToEndTask: null,
//       address: "",
//       description: "",
//     });
//   };

//   return (
//     <StyledBox>
//       <form onSubmit={handleSubmit}>
//         <Box sx={{ display: "flex", gap: 2 }}>
//           <SelectSmall
//             options={["1", "2", "3", "4"]}
//             name="department"
//             value={formData.department}
//             onChange={(e) => handleChange("department")(e.target.value)}
//           />
//           <MultipleSelectChip
//             value={formData.task}
//             onChange={(value) => handleChange("task")(value)}
//           />
//         </Box>

//         <ResponsiveDateTimePickers
//           value={formData.dateToEndTask}
//           onChange={(date) => handleChange("dateToEndTask")(date)}
//         />

//         <AddressForm
//           value={formData.address}
//           onChange={(value) => handleChange("address")(value)}
//         />

//         <TextField
//           name="description"
//           label="Description"
//           variant="outlined"
//           fullWidth
//           margin="dense"
//           value={formData.description}
//           onChange={(e) => handleChange("description")(e.target.value)}
//           required
//         />

//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{ mt: 2 }}
//         >
//           Save Task
//         </Button>
//       </form>
//     </StyledBox>
//   );
// };

// export default TaskForm;

import { useState } from "react";
import SelectSmall from "../smallComponent/SelectSmall";
import { useCreateTask } from "../../service/reactQuery/reactMutation";
import MultipleSelectChip from "../smallComponent/MultipleSelectChip";
import ResponsiveDateTimePickers from "../smallComponent/ResponsiveDateTimePickers";
import AddressForm from "../smallComponent/AddressForm";
import styled from "styled-components";
import { motion } from "framer-motion";

const TaskForm = () => {
  const createSingleTask = useCreateTask();

  const [formData, setFormData] = useState({
    department: "",
    task: [],
    dateToEndTask: null,
    address: "",
    addition_info: "",
  });

  const handleChange = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createSingleTask.mutate(formData);
    setFormData({
      department: "",
      task: [],
      dateToEndTask: null,
      address: "",
      addition_info: "",
    });
    e.target.reset();
  };

  const takeDepartment = (value) => {
    console.log("====================================");
    console.log(value);
    console.log("====================================");
    handleChange("department")(value);
  };

  const takeAddress = (value) => {
    setFormData((prev) => ({ ...prev, address: value }));
    console.log("====================================");
    console.log(value);
    console.log("====================================");
  };

  return (
    <div
      className="w-full min-w-1/2
 max-w-md mx-auto p-4 bg-white rounded shadow-md "
    >
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div className="flex gap-4">
          <SelectSmall
            options={["1", "2", "3", "4"]}
            name="department"
            value={formData.department}
            onChange={takeDepartment}
          />
          <MultipleSelectChip
            value={formData.task}
            onChange={(value) => handleChange("task")(value)}
          />
        </div>
        <ResponsiveDateTimePickers
          value={formData.dateToEndTask}
          onChange={(date) => handleChange("dateToEndTask")(date)}
        />
        <AddressForm value={formData.address} onChange={takeAddress} />

        <TextAreaWrapper
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <Label htmlFor="addition_info">Додаткова інформація</Label>
          <StyledTextArea
            id="addition_info"
            name="addition_info"
            value={formData.addition_info}
            onChange={(e) => handleChange("addition_info")(e.target.value)}
          />
        </TextAreaWrapper>

        <AnimatedButton
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Save Task
        </AnimatedButton>

        {/* </button> */}
      </form>
    </div>
  );
};

const TextAreaWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 1rem;
  color: #333;
`;

const StyledTextArea = styled.textarea`
  width: 90%;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.75rem;
  font-size: 1rem;
  resize: vertical;
  min-height: 40px;
  transition: all 0.2s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #3f51b5;
    box-shadow: 0 4px 8px rgba(63, 81, 181, 0.2);
  }

  &:hover {
    border-color: #888;
  }
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
`;

export default TaskForm;
