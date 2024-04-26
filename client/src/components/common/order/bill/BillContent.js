import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
  Divider,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { setBillDone } from "../../../../services/BusinessService";
import SuccessModal from "../../modal/SuccessModal";
import Chip from "@mui/material/Chip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GetBillDetailModal from "./modal/GetBillDetailModal";

const BillContent = ({ doneBill, undoneBill, fetchAllBill }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items to display per page
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("undone");
  // Change page
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const handleStatusButtonClick = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1); // Reset current page when changing status
  };
  const filteredBills = selectedStatus === "undone" ? undoneBill : doneBill;
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Stack direction="row" spacing={2} justifyContent="center" mt={2} ml={5}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleStatusButtonClick("undone")}
        >
          Chưa thanh toán
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleStatusButtonClick("done")}
        >
          Đã thanh toán
        </Button>
      </Stack>
      <Grid item xs={12}>
        <Container>
          <Grid container spacing={2}>
            {(selectedStatus === "undone" ? undoneBill : doneBill)
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card sx={{ width: 280, height: 200 }}>
                    <CardContent>
                      <Typography gutterBottom>Hóa đơn số {item.id}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        Ngày và giờ: {item.date}
                      </Typography>

                      <div>
                        <Typography variant="caption" color="textSecondary">
                          Tạo bởi: {item.employeeId}
                        </Typography>
                      </div>
                      <Divider />
                      <Typography sx={{ mt: 1 }}>
                        Tổng: {item.totalPrice}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {!item.isDone ? (
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => {
                            setBillDone(item.id)
                              .then(() => {
                                console.log("Complete the bill", item.id);
                                setShowSuccessModal(true);
                                setTimeout(() => {
                                  fetchAllBill();
                                }, 3000);
                              })
                              .catch((error) => {
                                console.log(
                                  "ERROR when changing the bill status: ",
                                  error
                                );
                              });
                          }}
                        >
                          Thanh toán
                        </Button>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Chip
                            label="Đã thanh toán"
                            color="success"
                            icon={<CheckCircleIcon />}
                          />
                        </div>
                      )}
                      <GetBillDetailModal id={item.id} />
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
      </Grid>
      <Grid item xs={12}>
        {/* Pagination */}
        <Stack display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={Math.ceil(
              (selectedStatus === "undone"
                ? undoneBill.length
                : doneBill.length) / itemsPerPage
            )} // Adjust count based on total items
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
          />
        </Stack>
      </Grid>
      {showSuccessModal && <SuccessModal message="Thao tác thành công." />}
    </Grid>
  );
};

export default BillContent;
