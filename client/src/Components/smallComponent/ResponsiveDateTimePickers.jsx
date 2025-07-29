//

import PropTypes from "prop-types";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import styled from "styled-components";

export default function ResponsiveDateTimePickers({ value, onChange }) {
  const changeDate = (dayPlus) => {
    const today = new Date();
    return dayjs(
      dayjs(today.setDate(today.getDate() + dayPlus)).format("YYYY-MM-DD")
    );
  };

  const minDate = changeDate(1);
  const maxDate = changeDate(8);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["MobileDateTimePicker"]}>
        <DemoItem label="Дата та час">
          <MobileDateTimePicker
            value={value}
            onChange={onChange}
            minDate={minDate}
            maxDate={maxDate}
            ampm={false}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}

ResponsiveDateTimePickers.propTypes = {
  value: PropTypes.object, // dayjs object
  onChange: PropTypes.func.isRequired,
};
