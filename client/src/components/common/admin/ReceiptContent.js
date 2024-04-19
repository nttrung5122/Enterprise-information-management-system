import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import SearchInput from "./SearchInput";
import FilterButtonGroup from "./FilterButtonGroup";
import ReceiptHeader from "./ReceiptHeader";
import { fetchAllReceipts } from "../../../services/UserService";
import ReceiptTable from "./ReceiptTable";

export default function ReceiptContent() {
  const ContentContainer = styled("div")({
    flexGrow: 1,
    padding: "10px", // Add padding for better spacing
    marginLeft: "-60px", // Adjust the margin to offset the sidebar width
  });

  const FilterGroupContainer = styled("div")({
    display: "flex",
    alignItems: "center",
  });

  const [receipts, setReceipts] = useState([]);
  const fetchReceiptsData = () => {
    fetchAllReceipts()
      .then((response) => {
        console.log("Check data: ", response);
        setReceipts(response);
      })
      .catch((error) => {
        console.log("Check error: ", error);
      });
  };
  useEffect(() => {
    fetchReceiptsData();
  }, []);
  return (
    <ContentContainer>
      <ReceiptHeader fetchReceiptsData={fetchReceiptsData} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <SearchInput />
        <FilterGroupContainer>
          <FilterButtonGroup style={{ border: "1px groove grey" }} />
        </FilterGroupContainer>
      </div>
      <ReceiptTable
        receipts={receipts}
        setReceipts={setReceipts}
        fetchReceiptsData={fetchReceiptsData}
      />
    </ContentContainer>
  );
}
