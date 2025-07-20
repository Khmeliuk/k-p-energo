import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
// import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
export default function ResponsiveDateTimePickers() {
  function changeDate(dayPlus) {
    const today = new Date();
    return dayjs(
      dayjs(today.setDate(today.getDate() + dayPlus)).format("YYYY-MM-DD")
    );
  }

  const minDate = changeDate(1);
  const maxDate = changeDate(8);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          "DateTimePicker",
          "MobileDateTimePicker",
          "DesktopDateTimePicker",
          "StaticDateTimePicker",
        ]}
      >
        {/* <DemoItem label="Desktop variant">
          <DesktopDateTimePicker defaultValue={dayjs("2022-04-17T15:30")} />
        </DemoItem>
        <DemoItem label="Mobile variant">
          <MobileDateTimePicker defaultValue={dayjs("2022-04-17T15:30")} />
        </DemoItem> */}
        <DemoItem label="Дата та час">
          <MobileDateTimePicker
            ews={["year", "month", "day", "hours", "minutes"]}
            minDate={minDate}
            maxDate={maxDate}
            ampm={false}
            // defaultValue={dayjs("2022-04-17T15:30")}
          />
        </DemoItem>
        {/* <DemoItem label="Static variant">
          <StaticDateTimePicker defaultValue={dayjs("2022-04-17T15:30")} />
        </DemoItem> */}
      </DemoContainer>
    </LocalizationProvider>
  );
}
