import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme } from "@mui/material/styles";

const EditEmployeeInfoModal = ({ selectedUser }) => {
  const [open, setOpen] = useState(false);
  const [roleId, setRoleId] = useState(
    selectedUser?.employeeRole?.roleId || ""
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
      address: formData.get("address"),
      hireDate: formData.get("hireDate"),
    };

    const updatedUserData = {
      employeeInfo: updatedEmployeeInfo,
    };

    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
    console.log("selected user: ", selectedUser);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = createTheme();

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Chỉnh sửa</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle sx={{ textAlign: "center" }}>
          Thông tin nhân viên: {selectedUser.fullname}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="email"
            name="email"
            label="Email"
            fullWidth
            variant="standard"
            defaultValue={selectedUser.email}
            sx={{ marginTop: 3 }}
          />
          <TextField
            margin="dense"
            id="idCode"
            name="idCode"
            label="CCCD"
            fullWidth
            variant="standard"
            defaultValue={selectedUser.idCode}
            sx={{ marginTop: 3 }}
          />
          <TextField
            margin="dense"
            id="address"
            name="address"
            label="Địa chỉ"
            fullWidth
            variant="standard"
            defaultValue={selectedUser.address}
            sx={{ marginTop: 3 }}
          />
          <TextField
            margin="dense"
            id="phoneNumber"
            name="phoneNumber"
            label="Số điện thoại"
            fullWidth
            variant="standard"
            defaultValue={selectedUser.phoneNumber}
            sx={{ marginTop: 3 }}
          />
        </DialogContent>
        {/* Modal actions */}
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Lưu</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default EditEmployeeInfoModal;
