import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/uk";
import { dateConvector } from "../service/methods/dateConvector";
import { useNavigate } from "react-router-dom";
dayjs.locale("uk");

const PlanComponent = () => {
  const navigate = useNavigate();
  const onDateChange = (newDate) => {
    const date = dateConvector(newDate);
    console.log("Selected date:", date);
    navigate(`/plan/brigades`);
  };

  return (
    <Box sx={{ padding: 2, width: "100%" }}>
      <h2>Plan Component</h2>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
        <Box sx={{ width: "100%" }}>
          <StaticDatePicker
            onAccept={onDateChange}
            displayStaticWrapperAs="desktop"
            openTo="day"
            // value={dayjs()}
            sx={{
              width: "100%",
              "& .MuiPickersLayout-root": {
                width: "100%",
              },
            }}
          />
        </Box>
      </LocalizationProvider>
    </Box>
  );
};

export default PlanComponent;
