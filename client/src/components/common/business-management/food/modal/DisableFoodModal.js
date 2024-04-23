import React from "react";
import Switch from "@mui/material/Switch";
import { disableFood } from "../../../../../services/BusinessService";

const DisableFoodModal = ({ food, getAllFood }) => {
  const label = { inputProps: { "aria-label": "Switch disable food" } };
  const handleToggle = () => {
    disableFood(food.id) // Call API to update the disable status
      .then(() => {
        console.log("Food item disable status updated successfully.");
        setTimeout(() => {
          getAllFood();
        }, 1000);
      })
      .catch((error) => {
        console.log("Error updating food item:", error);
      });
  };

  return (
    <div>
      <Switch
        {...label}
        checked={!food.disable} // Set checked based on the disable status
        onChange={handleToggle}
      />
    </div>
  );
};

export default DisableFoodModal;
