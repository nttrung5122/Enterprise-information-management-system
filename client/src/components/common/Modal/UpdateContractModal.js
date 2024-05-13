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
import { updateUserContract } from "../../../services/UserService";

const UpdateContractModal = ({ selectedUser, fetchUsersData }) => {
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

    const updatedContractInfo = {
      roleId: roleId,
      salaryScale: parseFloat(formData.get("salaryScale")),
      date: formData.get("startDate"),
    };

    updateUserContract(
      selectedUser.id,
      updatedContractInfo.roleId,
      updatedContractInfo.salaryScale,
      updatedContractInfo.date
    )
      .then((response) => {
        console.log("Contract updated successfully:", response);

        // Close the modal or do any further actions upon successful update
        handleClose();
        fetchUsersData();
      })
      .catch((error) => {
        console.log("Contract updated successfully:", updatedContractInfo);
        console.error("Error updating contract:", error);
        // Handle error
      });

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
        <DialogTitle sx={{ textAlign: "center" }}>
          Cập nhật chức vụ nhân viên
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="fullname"
            name="fullname"
            label="Họ và tên"
            fullWidth
            variant="standard"
            defaultValue={selectedUser.fullname}
            sx={{ marginTop: 3 }}
            disabled
          />
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
            defaultValue={selectedUser.employee_statuses[0].role.roleInfo}
          />
          {/* Date pickers */}
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            sx={{ align: "center" }}
          >
            <DatePicker
              id="startDate"
              name="startDate"
              label="Ngày thay đổi"
              fullWidth
              variant="standard"
              sx={{ mt: 3, ml: 2 }}
            />
            {/* <DatePicker
              id="endDate"
              name="endDate"
              label="Ngày hết hợp đồng"
              fullWidth
              variant="standard"
              sx={{ mt: 3, ml: 2 }}
            />*/}
          </LocalizationProvider>
          {/* Role select */}

          {/* Salary scale */}
          <TextField
            margin="dense"
            id="salaryScale"
            name="salaryScale"
            label="Salary Scale"
            fullWidth
            variant="standard"
            defaultValue={selectedUser.employee_statuses[0].salaryScale}
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

export default UpdateContractModal;
