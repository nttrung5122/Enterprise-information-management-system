import React, { useState, useEffect, useCallback } from "react";
import { styled } from "@mui/system";

import PosHeader from "./PosHeader";
import PosContent from "./PosContent";
import { fetchAllFood } from "../../../../services/BusinessService";

export default function PosContainer({ employeeId }) {
  const [food, setFood] = useState([]);
  const [order, setOrder] = useState([]);

  const handleAddOrder = useCallback((item) => {
    setOrder((prevOrder) => {
      const existingItemIndex = prevOrder.findIndex(
        (orderItem) => orderItem.id === item.id
      );
      if (existingItemIndex !== -1) {
        const updateOrder = [...prevOrder];
        const existingItem = updateOrder[existingItemIndex];

        if (!isNaN(existingItem.quantity)) {
          existingItem.quantity += 1;
        } else {
          existingItem.quantity = 1;
        }
        return updateOrder;
      }
      return [...prevOrder, { ...item, quantity: 1 }];
    });
  }, []);

  const setOrderMemoized = useCallback((newOrder) => {
    setOrder(newOrder);
  }, []);

  const getAllFood = useCallback(() => {
    fetchAllFood()
      .then((response) => {
        setFood(response);
      })
      .catch((error) => {
        console.log("Check error fetching food", error);
      });
  }, []);

  useEffect(() => {
    getAllFood();
  }, [getAllFood]);

  return (
    <div style={{ flexGrow: 1, padding: "10px", marginLeft: "-60px" }}>
      <PosHeader
        order={order}
        setOrder={setOrderMemoized}
        employeeId={employeeId}
      />
      <PosContent food={food} handleAddOrder={handleAddOrder} />
    </div>
  );
}
