import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import SupplierHeader from "./SupplierHeader";
import SupplierTable from "./SupplierTable";
import { fetchAllSuppliers } from "../../../services/UserService";
import SearchInput from "./SearchInput";

export default function SupplierContent() {
  const ContentContainer = styled("div")({
    flexGrow: 1,
    padding: "10px", // Add padding for better spacing
    marginLeft: "-60px", // Adjust the margin to offset the sidebar width
  });

  const FilterGroupContainer = styled("div")({
    display: "flex",
    alignItems: "center",
  });

  const [suppliers, setSuppliers] = useState([]);

  const fetchSuppliersData = () => {
    fetchAllSuppliers()
      .then((response) => {
        console.log("fetch suppliers data: ", response);
        setSuppliers(response);
      })
      .catch((error) => {
        console.log("Check error: ", error);
      });
  };

  useEffect(() => {
    fetchSuppliersData();
  }, []);
  return (
    <ContentContainer>
      <SupplierHeader fetchSuppliersData={fetchSuppliersData} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <SearchInput />
      </div>
      <SupplierTable
        suppliers={suppliers}
        fetchSuppliersData={fetchSuppliersData}
      />
    </ContentContainer>
  );
}
