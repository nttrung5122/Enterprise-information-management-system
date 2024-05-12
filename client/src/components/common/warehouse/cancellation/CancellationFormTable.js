import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import IngredientsInfoModal from "../../modal/IngredientsInfoModal";

export default function CancellationFormTable({ cancellationForms }) {
  const rows = cancellationForms.map((item) => ({
    id: item.id,
    date: item.date,
    employee: item.employeeId,
    ingredients: item.ingredients,
    note: item.note,
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "date", headerName: "Ngày", width: 130 },
    { field: "employee", headerName: "Mã nhân viên", width: 150 },
    {
      field: "ingredients",
      headerName: "Nguyên liệu",
      width: 150,
      renderCell: (params) => <IngredientsInfoModal data={params.row} />,
    },
    { field: "note", headerName: "Lý do", width: 250 },
    { field: "", headerName: "", flex: 1 },
    {
      field: "action",
      headerName: "Hành động",
      width: 130,
      renderCell: (params) => <div></div>,
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        pagination
        sx={{ mt: 2 }}
      />
    </div>
  );
}
