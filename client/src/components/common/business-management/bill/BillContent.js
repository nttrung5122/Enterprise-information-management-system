import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DisplayBillDetailModal from "./modal/DisplayBillDetailModal";
import UpdateBillModal from "./modal/UpdateBillModal";

export default function BillContent({ items, fetchAllBill }) {
  const [filter, setFilter] = React.useState("All"); // State to store the filter value

  // Filter function to filter bills based on status
  const filterBills = (status) => {
    if (status === "All") {
      return items;
    } else {
      return items.filter((item) => item.isDone === (status === "Done"));
    }
  };

  // Update rows based on the selected filter
  const updateRows = (status) => {
    const filteredItems = filterBills(status);
    return filteredItems.map((item) => ({
      id: item.id,
      date: formatDate(item.date),
      employeeId: item.employeeId,
      isDone: item.isDone,
      totalPrice: item.totalPrice,
    }));
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust the format as needed
  };

  const rows = updateRows(filter);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "date", headerName: "Ngày", width: 200 },
    { field: "employeeId", headerName: "Mã nhân viên", width: 200 },
    { field: "totalPrice", headerName: "Tổng giá", width: 200 },
    {
      field: "isDone",
      headerName: "Trạng thái",
      width: 150,
      renderCell: (params) => (
        <div>{params.row.isDone ? "Hoàn tất" : "Chưa hoàn tất"}</div>
      ),
    },
    { field: "", headerName: "", flex: 1 },
    {
      field: "action",
      headerName: "Hành động",
      width: 300,
      renderCell: (params) => (
        <div>
          <DisplayBillDetailModal id={params.row.id} />
          {params.row.isDone ? null : (
            <UpdateBillModal id={params.row.id} fetchAllBill={fetchAllBill} />
          )}
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%", textAlign: "right" }}>
      <Stack spacing={1} direction="row" sx={{ mt: 2, mb: 2 }}>
        <Button variant="contained" onClick={() => setFilter("All")}>
          Toàn bộ
        </Button>
        <Button variant="contained" onClick={() => setFilter("Done")}>
          Hoàn tất
        </Button>
        <Button variant="contained" onClick={() => setFilter("UnDone")}>
          Chưa hoàn tất
        </Button>
      </Stack>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5} // Set the default page size
        checkboxSelection
        pagination
      />
    </div>
  );
}
