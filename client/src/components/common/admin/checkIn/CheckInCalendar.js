import React, { useState, useEffect, useMemo } from "react";
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

  // Initialize with current date
  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());

  const handleChange = (event) => {
    setId(event.target.value);
  };

  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
  };

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const fetchCheckInData = () => {
    if (!id) return; // Don't fetch if no employee selected

    setLoading(true);
    setError(null);
    checkDateCheckIn(month, year, id)
      .then((response) => {
        setCheckInData(response);
      })
      .catch((error) => {
        setError(error);
        console.error("Error fetching check-in data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCheckInData();
  }, [id, month, year]);

  // Generate months array
  const months = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      value: i,
      label: `${i + 1}`,
    }));
  }, []);

  // Generate years dynamically (10 years back, 5 years forward from current year)
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 10;
    const endYear = currentYear + 5;
    return Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => startYear + i
    );
  }, []);

  return (
    <div>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel id="employee-select-label">Mã nhân viên</InputLabel>
          <Select
            labelId="employee-select-label"
            id="employee-select"
            value={id}
            onChange={handleChange}
            autoWidth
            label="Mã nhân viên"
          >
            {users.map((data) => (
              <MenuItem key={data.id} value={data.id}>
                {data.id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="month-label">Tháng</InputLabel>
          <Select
            labelId="month-label"
            id="month-select"
            value={month}
            onChange={handleChangeMonth}
            label="Tháng"
          >
            {months.map((monthOption) => (
              <MenuItem key={monthOption.value} value={monthOption.value}>
                {monthOption.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="year-label">Năm</InputLabel>
          <Select
            labelId="year-label"
            id="year-select"
            value={year}
            onChange={handleChangeYear}
            label="Năm"
          >
            {years.map((yearOption) => (
              <MenuItem key={yearOption} value={yearOption}>
                {yearOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <UpdateCheckInModal users={users} onUpdate={fetchCheckInData} />
      </Stack>

      {loading && <div>Đang tải...</div>}
      {error && (
        <div style={{ color: "red" }}>
          Lỗi: {error.message || "Không thể tải dữ liệu"}
        </div>
      )}
      {!loading && !error && <WorkCalendar checkInData={checkInData} />}
    </div>
  );
};
