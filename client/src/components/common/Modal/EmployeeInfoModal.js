import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditEmployeeInfoModal from "./EditEmployeeInfoModal";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600, // Adjusted width
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  textAlign: "center", // Center the text
  display: "flex",
  flexDirection: "column",
};

const buttonContainerStyle = {
  marginTop: "auto",
  display: "flex",
  justifyContent: "flex-end",
  mt: 2,
};

const lineStyle = {
  borderBottom: "1px solid #ccc", // Add border line at the bottom
  padding: "8px 0", // Add padding to the line
  width: "100%", // Set width to 100%
  textAlign: "left", // Align text to the left within the line
};

export default function EmployeeInfoModal({ user }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>
        <VisibilityIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h4" component="h2">
            Thông tin nhân viên:
          </Typography>
          <Box sx={{ mt: 2 }}>
            <div sx={lineStyle}>
              <Typography variant="h6">CCCD: {user.idCode}</Typography>
            </div>
            <div sx={lineStyle}>
              <Typography variant="h6">Họ và tên: {user.fullname}</Typography>
            </div>
            <div sx={lineStyle}>
              <Typography variant="h6">Email: {user.email}</Typography>
            </div>
            <div sx={lineStyle}>
              <Typography variant="h6">
                Số điện thoại: {user.phoneNumber}
              </Typography>
            </div>
          </Box>
          <Box sx={buttonContainerStyle}>
            <Button onClick={handleClose} color="primary">
              Đóng
            </Button>
            <EditEmployeeInfoModal
              selectedUser={user}
              handleClose={handleClose}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
