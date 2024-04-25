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
import ReceiptIcon from "@mui/icons-material/Receipt";
import Stack from "@mui/material/Stack";

const OrderModal = ({ order }) => {
  const [open, setOpen] = useState(false);
  const [itemQuantities, setItemQuantities] = useState({});
  const [info, setInfo] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const handleOpen = () => {
    setOpen(true);
    initializeItemQuantities();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleIncreaseQuantity = (itemId) => {
    setItemQuantities({
      ...itemQuantities,
      [itemId]: (itemQuantities[itemId] || 0) + 1,
    });
  };

  const handleDecreaseQuantity = (itemId) => {
    if (itemQuantities[itemId] > 1) {
      setItemQuantities({
        ...itemQuantities,
        [itemId]: itemQuantities[itemId] - 1,
      });
    }
  };

  const handleCreateBill = () => {
    const billItems = order.filter((item) => itemQuantities[item.id] > 0);
    setSelectedItems(billItems);
    console.log(billItems);
    setInfo(""); // Clear the info field
  };

  const initializeItemQuantities = () => {
    const initialQuantities = {};
    order.forEach((item) => {
      initialQuantities[item.id] = 1;
    });
    setItemQuantities(initialQuantities);
  };

  return (
    <div>
      <ReceiptIcon onClick={handleOpen} />
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Hóa đơn:</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Món ăn</TableCell>
                <TableCell>Giá</TableCell>
                <TableCell align="center">Số lượng</TableCell>
                <TableCell>Tổng</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Typography>{item.nameFood}</Typography>
                  </TableCell>
                  <TableCell>{item.price}$</TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Button
                        size="small"
                        onClick={() => handleDecreaseQuantity(item.id)}
                      >
                        -
                      </Button>
                      <Typography>{itemQuantities[item.id] || 1}</Typography>
                      <Button
                        size="small"
                        onClick={() => handleIncreaseQuantity(item.id)}
                      >
                        +
                      </Button>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {(itemQuantities[item.id] || 1) * item.price}$
                  </TableCell>
                  <TableCell>
                    <Button variant="contained">Xóa</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography variant="h5" sx={{ mt: 2 }}>
              Tổng:{" "}
              <span className="price text-success">
                {order.reduce(
                  (total, item) =>
                    total + (itemQuantities[item.id] || 1) * item.price,
                  0
                )}
                $
              </span>
            </Typography>
          </div>
        </DialogContent>
        <DialogActions
          style={{ justifyContent: "justify-content", padding: "16px" }}
        >
          <Button onClick={handleClose}>Đóng</Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              handleClose();
              handleCreateBill();
            }}
          >
            Tạo hóa đơn
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrderModal;
