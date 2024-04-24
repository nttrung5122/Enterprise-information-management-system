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
import { getMenu } from "../../../../../services/BusinessService";

const DisplaySectionModal = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState([]);

  const fetchDetails = () => {
    getMenu(id)
      .then((response) => {
        setDetails(response);
        console.log("check data: ", response);
      })
      .catch((error) => {
        console.log("check error fetching section", error);
      });
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nameSection", headerName: "Tên mục", width: 200 },
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
        <DialogTitle>Chi tiết Menu:</DialogTitle>
        <DialogContent dividers>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={details.section_menus}
              columns={columns}
              pageSize={5}
            />
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

export default DisplaySectionModal;
