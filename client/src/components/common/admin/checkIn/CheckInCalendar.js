import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { checkDateCheckIn } from "../../../../services/UserService";
import { WorkCalendar } from "./WorkCalendar";
import UpdateCheckInModal from "./modal/UpdateCheckInModal";

export const CheckInCalendar = ({ users }) => {
  const [id, setId] = useState("");
  const [checkInData, setCheckInData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setId(event.target.value);
  };
  const [month, setMonth] = useState(5);
  const [year, setYear] = useState(2023);

  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
  };

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const fetchCheckInData = () => {
    setLoading(true);
    setError(null);
    checkDateCheckIn(month, year, id)
      .then((response) => {
        setCheckInData(response);
        console.log("Check in data: ", response);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCheckInData();
  }, [id, month, year]);

  const months = [
    { value: 0, label: "1" },
    { value: 1, label: "2" },
    { value: 2, label: "3" },
    { value: 3, label: "4" },
    { value: 4, label: "5" },
    { value: 5, label: "6" },
    { value: 6, label: "7" },
    { value: 7, label: "8" },
    { value: 8, label: "9" },
    { value: 9, label: "10" },
    { value: 10, label: "11" },
    { value: 11, label: "12" },
  ];

  const years = [2023, 2024];

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
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
        </FormControl>{" "}
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="month-label">Tháng</InputLabel>
          <Select
            labelId="month-label"
            id="month-select"
            value={month}
            onChange={handleChangeMonth}
          >
            {months.map((month) => (
              <MenuItem key={month.value} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>{" "}
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="year-label">Năm</InputLabel>
          <Select
            labelId="year-label"
            id="year-select"
            value={year}
            onChange={handleChangeYear}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <UpdateCheckInModal users={users} />
      </Stack>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <WorkCalendar checkInData={checkInData} />
    </div>
  );
};
