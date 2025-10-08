import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { Box, Badge } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/uk";
import { dateConvector } from "../service/methods/dateConvector";
import { useNavigate } from "react-router-dom";

dayjs.locale("uk");

// Приклад даних з завданнями (замініть на свої)
const tasksData = {
  "15.10.2025": 3,
  "20.10.2025": 19,
  "25.10.2025": 2,
};

const PlanComponent = () => {
  const navigate = useNavigate();

  const onDateChange = (newDate) => {
    const date = dateConvector(newDate);
    console.log("Selected date:", date);
    navigate(`/plan/brigades`);
  };

  const ServerDay = (props) => {
    const { day, outsideCurrentMonth, ...other } = props;
    const dateStr = day.format("DD.MM.YYYY");
    const taskCount = tasksData[dateStr] || 0;

    return (
      <Box
        sx={{ position: "relative", display: "flex", flexDirection: "column" }}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
        />
        {taskCount > 0 && (
          <Box
            sx={{
              position: "absolute",
              bottom: 2,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "2px",
            }}
          >
            {Array.from({ length: Math.min(taskCount, 5) }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  backgroundColor: "#1976d2",
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ padding: 2, width: "100%" }}>
      <h2>Plan Component</h2>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
        <Box sx={{ width: "100%" }}>
          <StaticDatePicker
            views={["month", "day"]}
            onAccept={onDateChange}
            displayStaticWrapperAs="desktop"
            openTo="day"
            slots={{
              day: ServerDay,
            }}
            sx={{
              width: "100%",
              "& .MuiPickersLayout-root": {
                width: "100%",
              },
              "& .MuiPickersDay-root": {
                borderRadius: "8px",
                aspectRatio: "1 / 1",
                margin: "2px",
              },
            }}
          />
        </Box>
      </LocalizationProvider>
    </Box>
  );
};

export default PlanComponent;
