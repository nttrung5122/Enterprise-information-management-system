import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import {
  updateCheckIn,
  currentDateCheckIn,
} from "../../../../../services/UserService";
import { toast } from "react-toastify";

export default function UpdateCheckInModal({ users, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [workingStatus, setWorkingStatus] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleChange = (event) => {
    setId(event.target.value);
    setWorkingStatus(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
    // Reset to current date when opening
    setSelectedDate(dayjs());
    setId("");
    setWorkingStatus(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (newValue) => {
    if (newValue && newValue.isValid()) {
      setSelectedDate(newValue);
      setWorkingStatus(false);
    }
  };

  const getCurrentDateStatus = () => {
    if (!selectedDate || !selectedDate.isValid() || !id) return;

    const day = selectedDate.date();
    const month = selectedDate.month();
    const year = selectedDate.year();

    setLoading(true);
    currentDateCheckIn(day, month, year)
      .then((response) => {
        setUserData(response);
        const userDataItem = response.find((item) => item.employeeId === id);
        if (userDataItem) {
          setWorkingStatus(userDataItem.haveWorking);
        } else {
          setWorkingStatus(false);
        }
      })
      .catch((error) => {
        console.error("Error when getting status data:", error);
        toast.error("Không thể tải dữ liệu chấm công.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSave = () => {
    if (!id) {
      toast.error("Vui lòng chọn nhân viên.");
      return;
    }
    if (!selectedDate || !selectedDate.isValid()) {
      toast.error("Vui lòng chọn ngày hợp lệ.");
      return;
    }

    const checkInData = {
      employeeId: id,
      date: selectedDate.format("YYYY/MM/DD"),
      haveWorking: workingStatus,
    };

    updateCheckIn(checkInData)
      .then(() => {
        toast.success("Cập nhật chấm công thành công.");
        handleClose();
        onUpdate();
      })
      .catch((error) => {
        console.error("Error when updating status:", error);
        const errorMessage =
          typeof error === "string"
            ? error
            : error.message || "Cập nhật chấm công thất bại.";
        toast.error(errorMessage);
      });
  };

  useEffect(() => {
    if (open && id && selectedDate && selectedDate.isValid()) {
      getCurrentDateStatus();
    }
  }, [selectedDate, id, open]);

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Cập nhật
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Cập nhật chấm công</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel id="employee-select-label">Mã nhân viên</InputLabel>
              <Select
                labelId="employee-select-label"
                id="employee-select"
                value={id}
                onChange={handleChange}
                label="Mã nhân viên"
              >
                {users.map((data) => (
                  <MenuItem key={data.id} value={data.id}>
                    {data.id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Chọn ngày"
                value={selectedDate}
                onChange={handleDateChange}
                format="DD/MM/YYYY"
                minDate={dayjs("2020-01-01")}
                maxDate={dayjs().add(1, "year")}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>

            <FormControl fullWidth>
              <InputLabel>Có đi làm</InputLabel>
              <Select
                value={workingStatus}
                label="Có đi làm"
                onChange={(event) => setWorkingStatus(event.target.value)}
                disabled={loading}
              >
                <MenuItem value={true}>Có</MenuItem>
                <MenuItem value={false}>Không</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSave} autoFocus disabled={loading}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
