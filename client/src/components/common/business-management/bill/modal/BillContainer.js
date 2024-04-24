import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";

import { getAllBill } from "../../../../../services/BusinessService";
import BillHeader from "./BilHeader";
import BillContent from "./BillContent";

export default function BillContainer() {
  const ContentContainer = styled("div")({
    flexGrow: 1,
    padding: "10px", // Add padding for better spacing
    marginLeft: "-60px", // Adjust the margin to offset the sidebar width
  });

  const FilterGroupContainer = styled("div")({
    display: "flex",
    alignItems: "center",
  });

  const [bill, setBill] = useState([]);
  const fetchAllBill = () => {
    getAllBill()
      .then((response) => {
        console.log("Check bill data", response);
        setBill(response);
      })
      .catch((error) => {
        console.log("Check error fetching food", error);
      });
  };
  useEffect(() => {
    fetchAllBill();
  }, []);

  return (
    <ContentContainer>
      <BillHeader />
      <BillContent fetchAllBill={fetchAllBill} items={bill} />
    </ContentContainer>
  );
}
