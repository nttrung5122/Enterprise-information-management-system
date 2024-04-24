import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { EditSectionModal } from "./modal/EditSectionModal";
import DeleteSectionModal from "./modal/DeleteSectionModal";
import DisplayDetailsModal from "./modal/DisplayDetailsModal";

export default function MenuSectionContent({ items, getAllMenuSection }) {
  const rows = items.map((item) => ({
    id: item.id,
    name: item.nameSection,
    info: item.info,
  }));
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Tên phân loại", width: 300 },
    { field: "info", headerName: "Chi tiết", width: 300 },
    { field: "", headerName: "", flex: 1 },
    {
      field: "action",
      headerName: "Hành động",
      width: 200,
      renderCell: (params) => (
        <div>
          <EditSectionModal
            section={params.row}
            getAllMenuSection={getAllMenuSection}
          />
          <DisplayDetailsModal id={params.row.id} />
          <DeleteSectionModal
            id={params.row.id}
            getAllMenuSection={getAllMenuSection}
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
