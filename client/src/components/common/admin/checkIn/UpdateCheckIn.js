import React, { useState, useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";

export const UpdateCheckIn = ({ users }) => {
  const [id, setId] = useState("");
  const [date, setDate] = useState(null);
  const handleChange = (event) => {
    setId(event.target.value);
  };
  return (
    <div>
      <Stack direction="row" spacing={3}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Mã nhân viên
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={id}
            onChange={handleChange}
            autoWidth
            label=" Mã nhân viên"
          >
            {users.map((data) => (
              <MenuItem key={data.id} value={data.id}>
                {data.id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker label="Chọn ngày - tháng" />
          </DemoContainer>
        </LocalizationProvider>
      </Stack>
    </div>
  );
};
