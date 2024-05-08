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
import { getBill } from "../../../../../services/BusinessService";

const GetBillDetailModal = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [billDetail, setBillDetail] = useState(null); // Initialize billDetail as null

  const handleOpen = () => {
    // Fetch bill details only when the modal is opened
    getBill(id)
      .then((response) => {
        setBillDetail(response);
        console.log("check bill", response);
        setOpen(true); // Open the modal after fetching the details
      })
      .catch((error) => {
        console.log("ERROR when getting bill detail: ", error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained">
        {" "}
        <ReceiptIcon onClick={handleOpen} />
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        {billDetail && ( // Render the dialog content only when billDetail is available
          <>
            <DialogTitle>Hóa đơn số : {billDetail.id}</DialogTitle>
            <DialogContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Món ăn</TableCell>
                    <TableCell>Giá</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Tổng</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {billDetail.food.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Typography>{item.nameFood}</Typography>
                      </TableCell>
                      <TableCell>{item.price}$</TableCell>
                      <TableCell>
                        <Typography>
                          {item.bill_detail.quantity ||
                            item.bill_detail.quantiity}
                        </Typography>
                      </TableCell>
                      <TableCell>{item.bill_detail.totalPrice}$</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DialogContent>
            <DialogActions
              style={{ justifyContent: "justify-content", padding: "16px" }}
            >
              <Button onClick={handleClose}>Đóng</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default GetBillDetailModal;
