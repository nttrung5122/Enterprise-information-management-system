import React from "react";
import Switch from "@mui/material/Switch";
import { toast } from "react-toastify";
import { disableFood } from "../../../../../services/BusinessService";

const DisableFoodModal = ({ food, getAllFood }) => {
  const label = { inputProps: { "aria-label": "Switch disable food" } };

  const handleToggle = () => {
    disableFood(food.id)
      .then(() => {
        toast.success("Cập nhật món ăn thành công.");
        getAllFood();
      })
      .catch((error) => {
        console.log("Error updating food item:", error);
        const errorMessage =
          typeof error === "string"
            ? error
            : error.message || "An error occurred";
        toast.error(errorMessage);
      });
  };

  return (
    <div>
      <Switch {...label} checked={!food.disable} onChange={handleToggle} />
    </div>
  );
};

export default DisableFoodModal;
