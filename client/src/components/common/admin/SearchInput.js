// SearchInput.js
import React from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchInput() {
  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "white",
        borderRadius: "4px",
        width: "100%",
        maxWidth: "500px",
        marginTop: "20px",
        marginBottom: "20px",
        border: "1px groove grey",
      }}
    >
      <div
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "100%",
          pointerEvents: "none",

          borderRight: "1px groove grey",
        }}
      >
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search..."
        inputProps={{ "aria-label": "search" }}
        style={{
          paddingLeft: "50px",
          paddingRight: "8px",
          paddingTop: "8px",
          paddingBottom: "8px",
          width: "100%",
          height: "40px",
        }}
      />
    </div>
  );
}
