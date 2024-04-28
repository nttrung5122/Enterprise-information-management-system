import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { UpdateInventoryModal } from "./../../modal/UpdateInventoryModal";

export default function InventoryTable({ items, fetchInventoryData }) {
  const rows = items.map((item) => ({
    id: item.ingredient.id,
    name: item.ingredient.nameIngredient,
    unit: item.ingredient.unitCal,
    quantity: item.quantity,
  }));
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Tên nguyên liệu", width: 130 },
    { field: "unit", headerName: "Đơn vị", width: 90 },
    { field: "quantity", headerName: "Số lượng", width: 90 },
    { field: "", headerName: "", flex: 1 },
    {
      field: "action",
      headerName: "Hành động",
      width: 130,
      renderCell: (params) => (
        <div>
          <UpdateInventoryModal
            ingredient={params.row}
            fetchInventoryData={fetchInventoryData}
          />
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
