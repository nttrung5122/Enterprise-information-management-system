import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteMenuModal from "./modal/DeleteMenuModal";
import DisplaySectionModal from "./modal/DisplaySectionModal";
import { EditMenuModal } from "./modal/EditMenuModal";

export default function MenuContent({ items, getAllMenu }) {
  const rows = items.map((item) => ({
    id: item.id,
    name: item.nameMenu,
    info: item.info,
  }));
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Tên menu", width: 200 },
    { field: "info", headerName: "Chi tiết", width: 200 },
    { field: "", headerName: "", flex: 1 },
    {
      field: "action",
      headerName: "Hành động",
      width: 200,
      renderCell: (params) => (
        <div>
          <EditMenuModal menu={params.row} getAllMenu={getAllMenu} />
          <DisplaySectionModal id={params.row.id} />
          <DeleteMenuModal id={params.row.id} getAllMenu={getAllMenu} />
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
