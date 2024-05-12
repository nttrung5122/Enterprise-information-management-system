import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import SearchInput from "../../admin/SearchInput";
import FilterButtonGroup from "../../admin/FilterButtonGroup";
import ReceiptHeader from "../receipt/ReceiptHeader";
import { fetchAllCancellationForms } from "../../../../services/UserService";
import ReceiptTable from "../receipt/ReceiptTable";
import CancellationFormHeader from "./CancellationFormHeader";
import CancellationFormTable from "./CancellationFormTable";

export default function CancellationFormContent({ employeeId }) {
  const ContentContainer = styled("div")({
    flexGrow: 1,
    padding: "10px",
    marginLeft: "-60px",
  });

  const FilterGroupContainer = styled("div")({
    display: "flex",
    alignItems: "center",
  });

  const [cancellationForms, setCancellationForms] = useState([]);
  const fetchCancellationForms = () => {
    fetchAllCancellationForms()
      .then((response) => {
        console.log("Check data: ", response);
        setCancellationForms(response);
      })
      .catch((error) => {
        console.log("Check error: ", error);
      });
  };
  useEffect(() => {
    fetchCancellationForms();
  }, []);
  return (
    <ContentContainer>
      <CancellationFormHeader
        fetchCancellationForms={fetchCancellationForms}
        employeeId={employeeId}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      ></div>
      <CancellationFormTable cancellationForms={cancellationForms} />
    </ContentContainer>
  );
}
