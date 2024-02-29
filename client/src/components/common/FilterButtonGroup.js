import { Button } from "@mui/material";
import React from "react";

export default function FilterButtonGroup() {
  // Array of filter button data
  const filterButtons = [
    { id: 1, label: "Tất cả" },
    { id: 2, label: "Đang hoạt động" },
    { id: 3, label: "Đã tắt" },
    { id: 4, label: "Đã xóa" },
  ];

  return (
    <>
      {filterButtons.map((button, index) => (
        <Button
          key={button.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: 0,
            borderTopLeftRadius: index === 0 ? "4px" : 0, // Apply border radius only to the first button
            borderBottomLeftRadius: index === 0 ? "4px" : 0, // Apply border radius only to the first button
            borderTopRightRadius:
              index === filterButtons.length - 1 ? "4px" : 0, // Apply border radius only to the last button
            borderBottomRightRadius:
              index === filterButtons.length - 1 ? "4px" : 0, // Apply border radius only to the last button
            backgroundColor: index === 0 ? "#f0f0f0" : "transparent", // Apply background color only to the first button
            color: index === 0 ? "#000" : "#000", // Adjust text color as needed
          }}
        >
          {button.label}
        </Button>
      ))}
    </>
  );
}
