import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIngredientModal from "../modal/DeleteIngredientModal";
import { EditIngredientModal } from "../modal/EditIngredientModal";

export default function IngredientTable({
  ingredients,
  setIngredients,
  fetchIngredientsData,
}) {
  const rows = ingredients.map((ingredient) => ({
    id: ingredient.id,
    name: ingredient.nameIngredient,
    unit: ingredient.unitCal,
  }));
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Tên nguyên liệu", width: 130 },
    { field: "unit", headerName: "Đơn vị", width: 90 },
    { field: "", headerName: "", flex: 1 },
    {
      field: "action",
      headerName: "Hành động",
      width: 130,
      renderCell: (params) => (
        <div>
          <DeleteIngredientModal id={params.row.id} />
          <EditIngredientModal
            ingredient={params.row}
            setIngredients={setIngredients}
            fetchIngredientsData={fetchIngredientsData}
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
