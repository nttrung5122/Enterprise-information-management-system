import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

const OrderModal = () => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(2); // Initial quantity
  const [notes, setNotes] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  return (
    <div>
      <MenuBookIcon onClick={handleOpen} />
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Hóa đơn:</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Món ăn</TableCell>
                <TableCell>Gía</TableCell>
                <TableCell align="center">Số lượng</TableCell>
                <TableCell>Tổng</TableCell>
                <TableCell align="center">Ghi chú</TableCell>
                <TableCell></TableCell> {/* Delete button cell */}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <img
                    src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/vans.png"
                    alt="Sheep"
                    style={{ width: "100px" }}
                  />
                  <Typography>Vans Sk8-Hi MTE Shoes</Typography>
                </TableCell>
                <TableCell>89$</TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Button size="small" onClick={handleDecreaseQuantity}>
                      -
                    </Button>
                    <Typography>{quantity}</Typography>
                    <Button size="small" onClick={handleIncreaseQuantity}>
                      +
                    </Button>
                  </Stack>
                </TableCell>
                <TableCell>{quantity * 89}$</TableCell>
                <TableCell>
                  <TextField
                    id="notes"
                    label="Ghi chú"
                    multiline
                    rows={3}
                    value={notes}
                    onChange={handleNotesChange}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained">Xóa</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography variant="h5">
              Tổng: <span className="price text-success">{quantity * 89}$</span>
            </Typography>
          </div>
        </DialogContent>
        <DialogActions
          style={{ justifyContent: "justify-content", padding: "16px" }}
        >
          <Button onClick={handleClose} color="secondary">
            Đóng
          </Button>
          <Button variant="contained" color="success">
            Tạo hóa đơn
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrderModal;
