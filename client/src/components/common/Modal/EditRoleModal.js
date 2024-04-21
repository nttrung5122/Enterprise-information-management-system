import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { createTheme } from "@mui/material/styles";
import { updateRole } from "../../../services/UserService";
import SuccessModal from "./SuccessModal";

export const EditRoleModal = ({ fetchAllRole, role }) => {
  const [open, setOpen] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const roleData = {
      roleId: role.id,
      info: formData.get("info"),
      baseSalary: formData.get("baseSalary"),
    };

    updateRole(roleData)
      .then(() => {
        console.log("update successfully");
        handleClose();
        setShowSuccessModal(true);
        setTimeout(() => {
          fetchAllRole();
        }, 2000);
      })
      .catch((error) => {
        console.log("Check updated error: ", error);
        console.log("Check data: ", roleData);
      });
  };

  const theme = createTheme();

  return (
    <React.Fragment>
      <Button>
        <ModeEditIcon onClick={handleClickOpen} />
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Sửa thông tin chức vụ</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="id"
            name="id"
            label="ID"
            fullWidth
            disabled
            defaultValue={role.id}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="info"
            name="info"
            label="Tên chức vụ"
            fullWidth
            variant="standard"
            defaultValue={role.info}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="baseSalary"
            name="baseSalary"
            label="Lương cơ bản"
            fullWidth
            variant="standard"
            defaultValue={role.baseSalary}
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
