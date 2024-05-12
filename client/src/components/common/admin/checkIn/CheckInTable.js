import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  checkInByManager,
  currentDateCheckIn,
} from "../../../../services/UserService";
import Button from "@mui/material/Button";
import SuccessModal from "../../modal/SuccessModal";

export default function CheckInTable({ users }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [statusData, setStatusData] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "fullname", headerName: "Tên nhân viên", width: 200 },
    { field: "status", headerName: "Có đi làm", width: 300 },
    // Add more columns if needed
  ];

  useEffect(() => {
    getCurrentDayCheckIn();
  }, []);

  const getCurrentDayCheckIn = () => {
    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth(); // Months are zero indexed
    const year = currentDate.getFullYear();

    currentDateCheckIn(date, month, year)
      .then((response) => {
        setStatusData(response);
      })
      .catch((error) => {
        console.log("Error fetching current day check-in:", error);
      });
  };

  const handleRowSelectionModelChange = (selectedRowIds) => {
    setSelectedRows(selectedRowIds);
  };

  const handleCheckIn = () => {
    if (selectedRows.length === 0) {
      console.log("No rows selected for check-in");
      return;
    }

    const checkInData = users.map((user) => ({
      employeeId: user.id,
      date: new Date().toISOString().split("T")[0],
      haveWorking: selectedRows.includes(user.id),
    }));

    checkInByManager({ data: checkInData })
      .then((response) => {
        setShowSuccessModal(true);
        getCurrentDayCheckIn(); // Refresh status data after check-in
      })
      .catch((error) => {
        console.log("Error checking in by manager:", error);
      });
  };

  // Update status for each user based on the response data
  const updatedUsers = users.map((user) => {
    const statusItem = statusData.find((item) => item.employeeId === user.id);
    if (statusItem) {
      return {
        ...user,
        status: statusItem.haveWorking ? "Có" : "Không",
      };
    } else {
      return user;
    }
  });

  return (
    <div>
      <div>
        <DataGrid
          rows={updatedUsers}
          columns={columns}
          autoHeight
          pageSize={5}
          checkboxSelection
          onRowSelectionModelChange={(itm) =>
            handleRowSelectionModelChange(itm)
          }
        />
      </div>
      <Button
        variant="contained"
        onClick={handleCheckIn}
        sx={{ mt: 2 }}
        disabled={statusData.length > 0}
      >
        Chấm công
      </Button>
      {showSuccessModal && <SuccessModal message="Thao tác thành công." />}
    </div>
  );
}
