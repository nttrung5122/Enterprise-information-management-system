import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import SearchInput from "./SearchInput";
import FilterButtonGroup from "./FilterButtonGroup";
import ReceiptHeader from "./ReceiptHeader";
import { fetchAllCancellationForms } from "../../services/UserService";
import ReceiptTable from "./ReceiptTable";
import CancellationFormHeader from "./CancellationFormHeader";
import CancellationFormTable from "./CancellationFormTable";

export default function CancellationFormContent() {
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
      <CancellationFormHeader />
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
      <CancellationFormTable cancellationForms={cancellationForms} />
    </ContentContainer>
  );
}
