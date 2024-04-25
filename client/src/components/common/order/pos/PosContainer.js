import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";

import PosHeader from "./PosHeader";
import PosContent from "./PosContent";
import { fetchAllFood } from "../../../../services/BusinessService";

export default function PosContainer() {
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
    const newOrder = [...order, item];
    setOrder(newOrder);
    console.log("check order:", newOrder);
  };
  const getAllFood = () => {
    fetchAllFood()
      .then((response) => {
        console.log("Check food data", response);
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
      <PosHeader order={order} />
      <PosContent
        food={food}
        getAllFood={getAllFood}
        setFood={setFood}
        handleAddOrder={handleAddOrder}
      />
    </ContentContainer>
  );
}
