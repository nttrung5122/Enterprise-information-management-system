import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme } from "@mui/material/styles";
import { addNewUser } from "../../../services/UserService";
import RoleSelect from "./RoleSelect";

export const AddEmployeeModal = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    // //Gather form data
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());

    addNewUser(userData);
    console.log("testing");
    console.log(userData);
  };
  const theme = createTheme();

  return (
    <React.Fragment>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        Thêm nhân viên
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Thêm nhân viên</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="fullname"
            name="fullname"
            label="Họ và tên"
            fullWidth
            variant="standard"
          />

          <TextField
            id="address"
            margin="dense"
            name="address"
            label="Địa chỉ"
            variant="standard"
            fullWidth
          />
          <TextField
            id="phone"
            margin="dense"
            name="phone"
            label="Số điện thoại"
            variant="standard"
            fullWidth
          />
          <TextField
            id="email"
            margin="dense"
            name="email"
            label="Email"
            variant="standard"
            fullWidth
          />
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            sx={{ align: "center" }}
          >
            <DatePicker
              id="hireDate"
              name="hireDate"
              label="Ngày tuyển"
              fullWidth
              variant="standard"
              sx={{ marginTop: 3 }}
            />
            <DatePicker
              id="endDate"
              name="endDate"
              label="Ngày hết hợp đồng"
              fullWidth
              variant="standard"
              sx={{ marginTop: 3, marginLeft: 2 }}
            />
          </LocalizationProvider>

          <RoleSelect
            margin="dense"
            id="roleId"
            name="roleId"
            label="Role ID"
            fullWidth
            variant="standard"
            sx={{ marginTop: 3 }}
          />

          <TextField
            margin="dense"
            id="salaryScale"
            name="salaryScale"
            label="Salary Scale"
            fullWidth
            variant="standard"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Thêm nhân viên</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
