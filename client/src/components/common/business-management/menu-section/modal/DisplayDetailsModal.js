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
import { getDetailsSection } from "../../../../../services/BusinessService";

const DisplayDetailsModal = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState([]);

  const fetchDetails = () => {
    getDetailsSection(id)
      .then((response) => {
        setDetails(response);
        console.log("check data: ", response);
      })
      .catch((error) => {
        console.log("check error fetching details", error);
      });
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nameFood", headerName: "Tên món ăn", width: 200 },
    { field: "price", headerName: "Giá", width: 150 },
    { field: "info", headerName: "Chi tiết", width: 250 },
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
            <DataGrid rows={details.food} columns={columns} pageSize={5} />
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

export default DisplayDetailsModal;
