import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function BillContent({ items, fetchAllBill }) {
  const rows = items.map((item) => ({
    id: item.id,
    date: item.date,
    employeeId: item.employeeId,
    isDone: item.isDone,
    totalPrice: item.totalPrice,
  }));
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "date", headerName: "Ngày", width: 200 },
    { field: "employeeId", headerName: "Mã nhân viên", width: 200 },
    { field: "totalPrice", headerName: "Tổng giá", width: 200 },
    { field: "isDone", headerName: "Trạng thái", width: 200 },
    { field: "", headerName: "", flex: 1 },
    {
      field: "action",
      headerName: "Hành động",
      width: 200,
      renderCell: (params) => <div></div>,
    },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
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
