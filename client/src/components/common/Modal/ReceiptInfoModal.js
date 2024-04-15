import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%", // Adjust the width of the modal
  maxWidth: "90vw", // Set maximum width to 90% of viewport width
  maxHeight: "90vh", // Set maximum height to 90% of viewport height
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  overflowY: "auto", // Enable vertical scroll if content exceeds maxHeight
};

const buttonContainerStyle = {
  marginTop: "auto",
  display: "flex",
  justifyContent: "center", // Center the button horizontally
  mt: 2,
};

export default function ReceiptInfoModal({ data }) {
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => setModalOpen(false);

  const ingredients = data.ingredients;

  return (
    <div>
      <Button onClick={handleOpen}>
        <VisibilityIcon />
      </Button>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h5" component="h2">
            Nguyên liệu của hóa đơn {data.id}
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table" sx={{ mt: 3 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e8d6cb" }}>
                  <TableCell>Nguyên liệu</TableCell>
                  <TableCell>Đơn vị</TableCell>

                  <TableCell>Giá mỗi đơn vị</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Tổng tiền</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ingredients.map((ingredient) => (
                  <TableRow key={ingredient.id}>
                    <TableCell component="th" scope="row">
                      {ingredient.nameIngredient}
                    </TableCell>
                    <TableCell>{ingredient.unitCal}</TableCell>

                    <TableCell>
                      {ingredient.receipt_detail.pricePerUnit}
                    </TableCell>
                    <TableCell>{ingredient.receipt_detail.quantity}</TableCell>
                    <TableCell>{ingredient.receipt_detail.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={buttonContainerStyle}>
            <Button onClick={handleClose} color="primary">
              Đóng
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
