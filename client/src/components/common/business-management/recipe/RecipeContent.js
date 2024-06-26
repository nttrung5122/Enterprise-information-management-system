import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteRecipeModal from "./modal/DeleteRecipeModal";
import { EditRecipeModal } from "./modal/EditRecipeModal";
import DisplayInfoModals from "./modal/DisplayInfoModal";

export default function RecipeContent({ items, fetchRecipeData }) {
  const rows = items.map((item) => ({
    id: item.id,
    name: item.nameRecipe,
    ingredients: item.ingredients,
  }));
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Tên công thức", width: 130 },

    { field: "", headerName: "", flex: 1 },
    {
      field: "action",
      headerName: "Hành động",
      width: 200,
      renderCell: (params) => (
        <div>
          <EditRecipeModal
            recipe={params.row}
            fetchRecipeData={fetchRecipeData}
          />
          <DisplayInfoModals details={params.row.ingredients} />
          <DeleteRecipeModal id={params.row.id} />
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
