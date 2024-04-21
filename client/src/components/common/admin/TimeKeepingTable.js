import React from "react";
import { styled } from "@mui/system";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ThreeColumnDiv = styled("div")({
  display: "flex",
  width: "80%",
  margin: "0 auto",
});

const Column = styled("div")({
  flex: 1,
  padding: 15,
  border: "1px solid #ccc",
  borderRadius: "15px",
  marginLeft: 30,
  marginRight: 30,
  height: "auto",
  maxWidth: "auto",
});

const CalendarContainer = styled("div")({
  display: "flex",
  width: "80%",
  margin: "0 auto",
});

const StyledCalendar = styled(Calendar)({
  width: "100%", // Adjust the width as needed
  height: "auto", // Adjust the height as needed
});

export default function TimeKeepingTable() {
  return (
    <div>
      <ThreeColumnDiv sx={{ mt: 3, mb: 3 }}>
        <Column>
          <h2>Số ngày làm việc: </h2>
          {/* Your content for "Ngày làm việc" column goes here */}
        </Column>
        <Column>
          <h2>Số ngày nghỉ: </h2>
          {/* Your content for "Ngày nghỉ" column goes here */}
        </Column>
        <Column>
          <h2>Số ngày nghỉ có phép: </h2>
          {/* Your content for "Ngày nghỉ có phép" column goes here */}
        </Column>
      </ThreeColumnDiv>
      <CalendarContainer>
        <StyledCalendar />
      </CalendarContainer>
    </div>
  );
}
