import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { fetchAllFood } from "../../../../../services/BusinessService";

const SelectFoodModal = ({ onFoodSelect }) => {
  const [food, setFood] = useState([]);

  useEffect(() => {
    const getAllFood = async () => {
      try {
        const response = await fetchAllFood();
        setFood(response);
      } catch (error) {
        console.error("Error fetching food:", error);
      }
    };

    getAllFood();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nameFood", headerName: "Tên món ăn", width: 200 },
    { field: "price", headerName: "Giá", width: 150 },
  ];

  const onRowsSelectionHandler = (ids) => {
    const selectedFoodIds = ids.map((id) => id);
    console.log("Selected Food IDs:", selectedFoodIds);
    onFoodSelect(selectedFoodIds);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={food}
        columns={columns}
        pageSize={5}
        checkboxSelection
        onRowSelectionModelChange={onRowsSelectionHandler}
      />
    </div>
  );
};

export default SelectFoodModal;
