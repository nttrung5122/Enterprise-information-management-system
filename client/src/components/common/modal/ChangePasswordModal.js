import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme } from "@mui/material/styles";
import { changePasswordByAdmin } from "../../../services/UserService";
import SuccessModal from "./SuccessModal";

export const ChangePasswordModal = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = React.useState("");

  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordMatch, setPasswordMatch] = React.useState(true); // State to track if passwords match

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if passwords match
    if (password === confirmPassword) {
      const formData = new FormData(event.target);
      const accountData = {
        employeeId: id,
        password: formData.get("password"),
      };

      changePasswordByAdmin(accountData)
        .then(() => {
          console.log("update successfully");

          handleClose(); // Call handleClose as a function
          setShowSuccessModal(true);
        })
        .catch((error) => {
          console.log("Check updated error: ", error);
          console.log(accountData);
        });
    } else {
      // If passwords don't match, set passwordMatch state to false
      setPasswordMatch(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const theme = createTheme();

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>Đổi mật khẩu</Button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Thay đổi mật khẩu nhân viên</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Mật khẩu"
            type="password"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="confirmPassword"
            name="confirmPassword"
            label="Nhập lại mật khẩu"
            type="password"
            fullWidth
            variant="standard"
            error={!passwordMatch} // Show error if passwords don't match
            helperText={!passwordMatch ? "Mật khẩu không khớp" : ""} // Helper text to display error message
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Xác nhận</Button>
        </DialogActions>
      </Dialog>

      {showSuccessModal && <SuccessModal message="Cập nhật thành công." />}
    </React.Fragment>
  );
};
