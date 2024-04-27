import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";

import {
  getAllBill,
  getUndoneBill,
} from "../../../../services/BusinessService";

import BillHeader from "./BillHeader";
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
        setBill(response);
      })
      .catch((error) => {
        console.log("Check error fetching bill", error);
      });
  };

  useEffect(() => {
    fetchAllBill();
  }, []);

  //filter bill based on status done or not.
  const doneBill = bill.filter((item) => item.isDone);
  const undoneBill = bill.filter((item) => !item.isDone);
  return (
    <ContentContainer>
      <BillHeader />
      <BillContent
        doneBill={doneBill}
        undoneBill={undoneBill}
        fetchAllBill={fetchAllBill}
      />
    </ContentContainer>
  );
}
