import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";

import PosHeader from "./PosHeader";
import PosContent from "./PosContent";
import { fetchAllFood } from "../../../../services/BusinessService";

export default function PosContainer({ employeeId }) {
  const ContentContainer = styled("div")({
    flexGrow: 1,
    padding: "10px", // Add padding for better spacing
    marginLeft: "-60px", // Adjust the margin to offset the sidebar width
  });

  const FilterGroupContainer = styled("div")({
    display: "flex",
    alignItems: "center",
  });

  const [food, setFood] = useState([]);
  const [order, setOrder] = useState([]);
  const handleAddOrder = (item) => {
    const existingItemIndex = order.findIndex(
      (orderItem) => orderItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      // If the item already exists, update its quantity
      const updatedOrder = [...order];
      const existingItem = updatedOrder[existingItemIndex];

      // Check if the quantity property is a valid number
      if (!isNaN(existingItem.quantity)) {
        existingItem.quantity += 1; // Increment the quantity
      } else {
        // If the quantity is not a number, set it to 1
        existingItem.quantity = 1;
      }

      setOrder(updatedOrder);
    } else {
      // If the item does not exist, add it to the order with a quantity of 1
      const newOrder = [...order, { ...item, quantity: 1 }];
      setOrder(newOrder);
    }
  };

  const getAllFood = () => {
    fetchAllFood()
      .then((response) => {
        setFood(response);
      })
      .catch((error) => {
        console.log("Check error fetching food", error);
      });
  };
  useEffect(() => {
    getAllFood();
  }, []);

  return (
    <ContentContainer>
      <PosHeader order={order} setOrder={setOrder} employeeId={employeeId} />
      <PosContent
        food={food}
        getAllFood={getAllFood}
        setFood={setFood}
        handleAddOrder={handleAddOrder}
      />
    </ContentContainer>
  );
}
