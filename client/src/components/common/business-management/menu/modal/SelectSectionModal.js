import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { fetchAllMenuSection } from "../../../../../services/BusinessService";

const SelectSectionModal = ({ onSectionSelect }) => {
  const [section, setSection] = useState([]);

  useEffect(() => {
    const getAllSection = async () => {
      try {
        const response = await fetchAllMenuSection();
        setSection(response);
      } catch (error) {
        console.error("Error fetching food:", error);
      }
    };

    getAllSection();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nameSection", headerName: "Tên mục", width: 200 },
    { field: "info", headerName: "Chi tiết", width: 150 },
  ];

  const onRowsSelectionHandler = (ids) => {
    const selectedSectionIds = ids.map((id) => id);
    console.log("Selected Section IDs:", selectedSectionIds);
    onSectionSelect(selectedSectionIds);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={section}
        columns={columns}
        pageSize={5}
        checkboxSelection
        onRowSelectionModelChange={onRowsSelectionHandler}
      />
    </div>
  );
};

export default SelectSectionModal;
