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

const DisplayInfoModals = ({ details }) => {
  const [open, setOpen] = useState(false);
  const rows = details.map((item) => ({
    id: item.id,
    nameIngredient: item.nameIngredient,
    quantity: item.recipe_detail.quantity,
    unitCal: item.unitCal,
  }));
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nameIngredient", headerName: "Tên nguyên liệu", width: 200 },
    { field: "quantity", headerName: "Số lượng", width: 150 },
    { field: "unitCal", headerName: "Đơn vị", width: 250 },
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
        <DialogTitle>Chi tiết mục:</DialogTitle>
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

export default DisplayInfoModals;
