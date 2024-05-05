import React, { useState, useEffect } from "react";
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

export const AddEmployeeModal = ({ fetchUsersData }) => {
  const [open, setOpen] = useState(false);
  const [roleId, setRoleId] = useState("");
  const [permissionId, setPermissionId] = useState(null);

  useEffect(() => {
    // Update permissionId when roleId changes
    switch (roleId) {
      case 201:
        setPermissionId(101); //ceo
        break;
      case 202:
        setPermissionId(101); //hr
        break;
      case 203:
        setPermissionId(103); //staff
        break;
      case 204:
        setPermissionId(102); //manager
        break;
      case 205:
        setPermissionId(104); //warehouse
        break;
        {
          /* */
        }
      default:
        setPermissionId(103);
        break;
    }
  }, [roleId]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRoleChange = (event) => {
    setRoleId(event.target.value); // Update roleId state
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Gather form data
    const formData = new FormData(event.target);
    const employeeInfo = {
      fullname: formData.get("fullname"),
      email: formData.get("email"),
      idCode: formData.get("idCode"),
      phoneNumber: formData.get("phoneNumber"),
      address: formData.get("address"),
      hireDate: formData.get("hireDate"),
    };
    const endDate = formData.get("endDate") || null;

    const contractInfo = {
      endDate: endDate,
    };
    const employeeRole = {
      roleId: roleId,
      salaryScale: parseFloat(formData.get("salaryScale")),
    };

    const userData = {
      employeeInfo: employeeInfo,
      contractInfo: contractInfo,
      employeeRole: employeeRole,
      permissions: [permissionId],
    };

    addNewUser(userData)
      .then(() => {
        console.log("Employee added successfully!");
        console.log("Check employee data: ", userData);
        fetchUsersData(); // Fetch users data again after adding a new employee
      })
      .catch((error) => {
        console.error("Error adding employee:", error, userData);
      });

    setOpen(false);
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
              sx={{ ml: 2, mt: 3 }}
            />
            <DatePicker
              id="endDate"
              name="endDate"
              label="Ngày hết hợp đồng"
              fullWidth
              variant="standard"
              sx={{ mt: 3, ml: 2 }}
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
          <Button type="submit">Thêm nhân viên</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
