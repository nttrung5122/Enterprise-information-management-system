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
  const [billDetail, setBillDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOpen = () => {
    if (!id) {
      setError("Không tìm thấy ID hóa đơn.");
      setOpen(true);
      return;
    }

    setLoading(true);
    setError(null);
    setBillDetail(null);
    setOpen(true);

    getBill(id)
      .then((response) => {
        console.log(
          "Full bill response for ID",
          id,
          ":",
          JSON.stringify(response, null, 2)
        );

        if (!response) {
          setError("Không có dữ liệu từ server.");
          return;
        }

        if (response.food && Array.isArray(response.food)) {
          if (response.food.length > 0) {
            setBillDetail(response);
          } else {
            setBillDetail(response);
            setError("Hóa đơn này không có món ăn nào.");
          }
        } else {
          setBillDetail(response);
          setError("Cấu trúc dữ liệu không đúng.");
        }
      })
      .catch((error) => {
        console.error("ERROR when getting bill detail:", error);
        const errorMessage =
          typeof error === "string"
            ? error
            : error?.message ||
              "Không thể tải chi tiết hóa đơn. Vui lòng thử lại.";
        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setError(null);
      setBillDetail(null);
    }, 300);
  };

  const getBillDetailData = (item) => {
    if (!item) return { quantity: 0, totalPrice: 0 };

    const billDetailData =
      item.bill_detail || item.BillDetail || item.billDetail || {};

    const quantity = billDetailData?.quantity || billDetailData?.quantiity || 0;
    const totalPrice = billDetailData?.totalPrice || 0;

    return {
      quantity,
      totalPrice,
      hasDetail: !!billDetailData?.quantity || !!billDetailData?.totalPrice,
    };
  };

  const formatPrice = (price) => {
    if (!price && price !== 0) return "N/A";
    return new Intl.NumberFormat("vi-VN").format(price) + "₫";
  };

  const hasMissingDetails = billDetail?.food?.some((item) => {
    const detail = item.bill_detail || item.BillDetail || item.billDetail;
    return !detail || (!detail.quantity && !detail.totalPrice);
  });

  return (
    <div>
      <Button variant="contained">
        <ReceiptIcon onClick={handleOpen} />
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        {loading ? (
          <>
            <DialogTitle>Đang tải...</DialogTitle>
            <DialogContent>
              <Typography>Vui lòng đợi...</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Đóng</Button>
            </DialogActions>
          </>
        ) : error && !billDetail ? (
          <>
            <DialogTitle>Lỗi</DialogTitle>
            <DialogContent>
              <Typography color="error">{error}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Đóng</Button>
            </DialogActions>
          </>
        ) : billDetail ? (
          <>
            <DialogTitle>Hóa đơn số : {billDetail.id || id}</DialogTitle>
            <DialogContent>
              {error && (
                <Typography color="warning" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}
              {hasMissingDetails && (
                <Typography
                  color="warning"
                  sx={{ mb: 2, fontStyle: "italic", fontSize: "0.875rem" }}
                >
                  ⚠️ Một số dữ liệu có thể không đầy đủ (dữ liệu cũ từ mock).
                </Typography>
              )}
              {billDetail.food &&
              Array.isArray(billDetail.food) &&
              billDetail.food.length > 0 ? (
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
                    {billDetail.food.map((item, index) => {
                      if (!item) return null;
                      const { quantity, totalPrice, hasDetail } =
                        getBillDetailData(item);
                      return (
                        <TableRow key={item.id || index}>
                          <TableCell>
                            <Typography>{item.nameFood || "N/A"}</Typography>
                          </TableCell>
                          <TableCell>{formatPrice(item.price)}</TableCell>
                          <TableCell>
                            <Typography
                              color={
                                hasDetail ? "text.primary" : "text.secondary"
                              }
                            >
                              {quantity || (hasDetail ? 0 : "-")}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {totalPrice
                              ? formatPrice(totalPrice)
                              : hasDetail
                              ? formatPrice(0)
                              : "N/A"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <Typography>Không có dữ liệu món ăn để hiển thị.</Typography>
              )}
            </DialogContent>
            <DialogActions style={{ padding: "16px" }}>
              <Button onClick={handleClose}>Đóng</Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle>Hóa đơn số : {id}</DialogTitle>
            <DialogContent>
              <Typography>Không có dữ liệu để hiển thị.</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Đóng</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default GetBillDetailModal;
