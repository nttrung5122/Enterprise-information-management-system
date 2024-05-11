import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  checkInByManager,
  fetchAllUsers,
} from "../../../../services/UserService";
import Button from "@mui/material/Button";
import SuccessModal from "../../modal/SuccessModal";

export default function CheckInTable({ users }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);

  const handleRowSelectionModelChange = (selectedRowIds) => {
    setSelectedRows(selectedRowIds);

    console.log(selectedRowIds);
  };
  const handleCheckIn = () => {
    if (selectedRows.length === 0) {
      console.log("No rows selected for check-in");
      return; // Exit the function if no rows are selected
    }
    const checkInData = selectedRows.map((id) => ({
      employeeId: id,
      date: new Date().toISOString().split("T")[0], //mm-dd formate
      haveWorking: true,
    }));

    checkInByManager({ data: checkInData })
      .then((response) => {
        console.log("Check in succesffully", response);
        setShowSuccessModal(true);
      })
      .catch((error) => {
        console.log(
          "check error when check in by manager: ",
          error,
          checkInData
        );
      });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "fullname", headerName: "Tên nhân viên", width: 200 },
    // Add more columns if needed
  ];

  return (
    <div>
      <div>
        <DataGrid
          rows={users}
          columns={columns}
          autoHeight
          pageSize={5}
          checkboxSelection
          onRowSelectionModelChange={(itm) =>
            handleRowSelectionModelChange(itm)
          }
        />
      </div>
      <Button variant="contained" onClick={handleCheckIn} sx={{ mt: 2 }}>
        Chấm công
      </Button>
      {showSuccessModal && <SuccessModal message="Thao tác thành công." />}
    </div>
  );
}
