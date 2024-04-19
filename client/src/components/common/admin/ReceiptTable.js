import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import ReceiptInfoModal from "../Modal/ReceiptInfoModal";

export default function ReceiptTable({ receipts }) {
  const rows = receipts.map((item) => ({
    id: item.id,
    date: item.date,
    employee: item.employee.fullname,
    supplier: item.supplier.name,
    priceTotal: item.priceTotal,
    ingredients: item.ingredients,
  }));
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "date", headerName: "Ngày", width: 130 },
    { field: "employee", headerName: "Nhân viên", width: 150 },
    { field: "supplier", headerName: "Nhà cung cấp", width: 150 },
    { field: "priceTotal", headerName: "Tổng giá tiền", width: 100 },
    { field: "", headerName: "", flex: 1 },
    {
      field: "action",
      headerName: "Hành động",
      width: 130,
      renderCell: (params) => (
        <div>
          <ReceiptInfoModal data={params.row} />
        </div>
      ),
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
