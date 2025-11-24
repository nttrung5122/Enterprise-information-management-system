import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme } from "@mui/material/styles";
import { updateUserInfo } from "../../../services/UserService";
import { toast } from "react-toastify";

const EditEmployeeInfoModal = ({
  selectedUser,
  handleInfoUpdate,
  setUserData,
  fetchUsersData,
}) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Gather form data
    const formData = new FormData(event.target);
    const updatedEmployeeInfo = {
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
      address: formData.get("address"),
    };
    setUserData({ ...updatedEmployeeInfo });

    updateUserInfo(
      selectedUser.id,
      updatedEmployeeInfo.email,
      updatedEmployeeInfo.phoneNumber,
      updatedEmployeeInfo.address
    )
      .then((response) => {
        console.log("Employee info updated successfully:", response);
        // Close the modal or do any further actions upon successful update
        toast.success("Cập nhật thông tin nhân viên thành công.");
        fetchUsersData();
        handleClose();
      })
      .catch((error) => {
        console.error("Error updating employee info:", error);
        console.log("Check the employee info: ", updatedEmployeeInfo);
        toast.error("Cập nhật thông tin nhân viên thất bại.");
        // Handle error
      });
  };

  const handleOpen = () => {
    setOpen(true);
    console.log("selected user: ", selectedUser);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            id="phoneNumber"
            name="phoneNumber"
            label="Số điện thoại"
            fullWidth
            variant="standard"
            defaultValue={selectedUser.phoneNumber}
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
