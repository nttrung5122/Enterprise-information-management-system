import React, { useState } from "react";
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
import RoleSelect from "./RoleSelect";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const EditEmployeeModal = ({ employeeData, updateUserData }) => {
  const [open, setOpen] = useState(false);
  const [roleId, setRoleId] = useState(
    employeeData?.employeeRole?.roleId || ""
  );

  const handleRoleChange = (event) => {
    setRoleId(event.target.value); // Update roleId state
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Gather form data
    const formData = new FormData(event.target);
    const updatedEmployeeInfo = {
      fullname: formData.get("fullname"),
      email: formData.get("email"),
      idCode: formData.get("idCode"),
      phoneNumber: formData.get("phoneNumber"),
      address: formData.get("address"),
      hireDate: formData.get("hireDate"),
    };
    const updatedContractInfo = {
      endDate: formData.get("endDate"),
    };
    const updatedEmployeeRole = {
      roleId: roleId,
      salaryScale: parseFloat(formData.get("salaryScale")),
    };

    const updatedUserData = {
      employeeInfo: updatedEmployeeInfo,
      contractInfo: updatedContractInfo,
      employeeRole: updatedEmployeeRole,
    };

    updateUserData(updatedUserData);

    handleClose(); // Close the modal after submission
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = createTheme();

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>
        <BorderColorIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Chỉnh sửa thông tin nhân viên</DialogTitle>
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
            id="idCode"
            margin="dense"
            name="idCode"
            label="CCCD"
            variant="standard"
            fullWidth
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
            id="phoneNumber"
            margin="dense"
            name="phoneNumber"
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
            roleId={roleId} // Pass roleId state
            handleRoleChange={handleRoleChange} // Pass handleRoleChange function
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
          <Button type="submit">Lưu</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default EditEmployeeModal;
