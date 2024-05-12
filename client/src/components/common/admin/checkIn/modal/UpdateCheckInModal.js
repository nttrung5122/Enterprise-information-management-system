import React, { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
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
import {
  updateCheckIn,
  currentDateCheckIn,
} from "../../../../../services/UserService";
import SuccessModal from "../../../modal/SuccessModal";

export default function UpdateCheckInModal({ users }) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [workingStatus, setWorkingStatus] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (event) => {
    setId(event.target.value);
    // Reset workingStatus when employee is changed
    setWorkingStatus(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (newValue) => {
    const formattedDate = dayjs(newValue).format("YYYY/MM/DD");
    setSelectedDate(formattedDate);
    // Reset workingStatus when date is changed
    setWorkingStatus(false);
  };

  const getCurrentDateStatus = () => {
    const currentDate = dayjs(selectedDate);
    const day = currentDate.format("DD");
    const month = currentDate.month();
    const year = currentDate.format("YYYY");

    currentDateCheckIn(day, month, year)
      .then((response) => {
        setUserData(response);
        // Find the haveWorking status for selected employee and date
        const userDataItem = response.find((item) => item.employeeId === id);
        if (userDataItem) {
          setWorkingStatus(userDataItem.haveWorking);
        } else {
          // If not found, set default value
          setWorkingStatus(false);
        }
      })
      .catch((error) => {
        console.log("error when getting status data: ", error);
      });
  };

  const handleSave = () => {
    const checkInData = {
      employeeId: id,
      date: selectedDate,
      haveWorking: workingStatus,
    };
    updateCheckIn(checkInData)
      .then(() => {
        setShowSuccessModal(true);
        setTimeout(() => {
          handleClose();
        }, 2000);
      })
      .catch((error) => {
        console.log("error when updating status: ", error);
      });
  };

  useEffect(() => {
    getCurrentDateStatus();
  }, [selectedDate, id]);

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Cập nhật
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="error">
          {"Cập nhật chấm công"}
        </DialogTitle>
        <DialogContent>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Mã nhân viên
            </InputLabel>
            <Select
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
              <DatePicker
                label="Chọn ngày"
                selectedDate={selectedDate}
                onChange={handleDateChange}
              />
            </DemoContainer>
          </LocalizationProvider>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel>Có đi làm</InputLabel>
            <Select
              value={workingStatus}
              label="Có đi làm"
              onChange={(event) => setWorkingStatus(event.target.value)}
            >
              <MenuItem value={true}>Có</MenuItem>
              <MenuItem value={false}>Không</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Không</Button>
          <Button onClick={handleSave} autoFocus>
            Có
          </Button>
        </DialogActions>
      </Dialog>
      {showSuccessModal && <SuccessModal message="Cập nhật thành công." />}
    </React.Fragment>
  );
}
