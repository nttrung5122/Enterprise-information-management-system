import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { getBill } from "../../../../../services/BusinessService";

const DisplayBillDetailModal = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState([]);

  const fetchBillData = () => {
    getBill(id)
      .then((response) => {
        setDetails(response);
        console.log("check data: ", response);
      })
      .catch((error) => {
        console.log("check error fetching bills", error);
      });
  };
  useEffect(() => {
    fetchBillData();
  }, []);
  const rows =
    details.food?.map((item) => ({
      id: item.id,
      nameFood: item.nameFood,
      price: item.price,
      quantity: item.bill_detail?.quantity,
      totalPrice: item.bill_detail?.totalPrice,
    })) || [];

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nameFood", headerName: "Tên món ăn", width: 200 },
    { field: "price", headerName: "Giá", width: 250 },
    { field: "quantity", headerName: "Số lượng", width: 250 },
    { field: "totalPrice", headerName: "Tổng", width: 250 },
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>
        <VisibilityIcon />
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Chi tiết hóa đơn:</DialogTitle>
        <DialogContent dividers>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DisplayBillDetailModal;
