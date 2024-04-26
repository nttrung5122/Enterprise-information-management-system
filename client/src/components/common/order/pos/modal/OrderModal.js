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
import { createBill } from "../../../../../services/BusinessService";
import SuccessModal from "./../../../modal/SuccessModal";

const OrderModal = ({ order }) => {
  const [open, setOpen] = useState(false);
  const [itemQuantities, setItemQuantities] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
    // Initialize an empty bill object
    const bill = {
      employeeId: 103, // You can set the employeeId here
      totalPrice: 0,
      detail: [],
    };

    // Iterate through order items to populate the bill detail
    order.forEach((item) => {
      const quantity = itemQuantities[item.id] || 0;
      if (quantity > 0) {
        const totalPrice = quantity * item.price;
        bill.totalPrice += totalPrice; // Increment total price
        // Add item detail to the bill
        bill.detail.push({
          totalPrice,
          quantiity: quantity,
          foodId: item.id,
        });
      }
    });

    // Log or handle the bill object as needed
    console.log(bill);
    setSelectedItems(bill.detail); // Set selected items for display if needed
    createBill(bill)
      .then((response) => {
        console.log("Create bill success", response);
        setShowSuccessModal(true);
      })
      .catch((error) => {
        console.log("error when creating bill", error);
      });
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
      {showSuccessModal && <SuccessModal message="Tạo thành công." />}
    </div>
  );
};

export default OrderModal;
