import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteRoleModal from "../Modal/DeleteRoleModal";
import { EditRoleModal } from "../Modal/EditRoleModal";

export default function RoleTable({ role, fetchAllRole }) {
  const rows = role.map((item) => ({
    id: item.id,
    baseSalary: item.baseSalary,
    info: item.info,
  }));
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "baseSalary", headerName: "Lương cơ bản", width: 150 },
    { field: "info", headerName: "Chức vụ", width: 250 },

    { field: "", headerName: "", flex: 1 },
    {
      field: "action",
      headerName: "Hành động",
      width: 130,
      renderCell: (params) => (
        <div>
          <DeleteRoleModal fetchAllRole={fetchAllRole} id={params.row.id} />
          <EditRoleModal fetchAllRole={fetchAllRole} role={params.row} />
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
