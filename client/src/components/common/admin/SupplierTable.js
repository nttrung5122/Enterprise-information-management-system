import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteSupplierModal from "../modal/DeleteSupplierModal";
import { EditSupplierModal } from "../modal/EditSupplierModal";

export default function SupplierTable({ suppliers, fetchSuppliersData }) {
  const rows = suppliers.map((supplier) => ({
    id: supplier.id,
    name: supplier.name,
    email: supplier.email,
    phoneNumber: supplier.phoneNumber,
  }));
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nhà cung cấp", width: 130 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "phoneNumber", headerName: "Số điện thoại", witdth: 200 },
    { field: "", headerName: "", flex: 1 },
    {
      field: "action",
      headerName: "Hành động",
      width: 130,
      renderCell: (params) => (
        <div>
          <DeleteSupplierModal
            id={params.id}
            fetchSuppliersData={fetchSuppliersData}
          />
          <EditSupplierModal
            supplier={params.row}
            fetchSuppliersData={fetchSuppliersData}
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
