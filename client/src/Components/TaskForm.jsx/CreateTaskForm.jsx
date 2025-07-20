import { useQueryClient } from "@tanstack/react-query";
import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

import MultipleSelectChip from "../muicomponent/MultipleSelectChip";
import ResponsiveDateTimePickers from "../muicomponent/DateTimePicker";
import AddressForm from "../AddressForm";
import { useCreateTask } from "../../service/reactQuery/reactMutation";
import SelectSmall from "../smallCpmponent/SelectSmall";

const TaskForm = () => {
  const createSingleTask = useCreateTask();
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData(["user"]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataValue = Object.fromEntries(formData.entries());
    dataValue.owner = currentUser?.data?._id;
    createSingleTask.mutate(dataValue);
    e.currentTarget.reset();
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        maxWidth: "100%",
        margin: "0 auto",
        padding: isMobile ? "1rem" : "2rem",
        backgroundColor: "white",
        borderRadius: "1rem",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 2,
            mb: 2,
          }}
        >
          <SelectSmall options={["1", "2", "3", "4"]} name="department" />
          <MultipleSelectChip name="users" />
        </Box>

        <Box sx={{ mb: 2 }}>
          <ResponsiveDateTimePickers name="date" />
        </Box>

        <Box sx={{ mb: 2 }}>
          <AddressForm />
        </Box>

        <TextField
          name="personalized"
          label="Personalized"
          variant="outlined"
          fullWidth
          margin="dense"
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Save Task
        </Button>
      </form>
    </motion.div>
  );
};

export default TaskForm;
