import React, { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import StorefrontIcon from "@mui/icons-material/Storefront";
import StoreIcon from "@mui/icons-material/Store";
import LiquorIcon from "@mui/icons-material/Liquor";
import PeopleIcon from "@mui/icons-material/People";

const NavigationPages = ({ navigate, permissionId }) => {
  const [value, setValue] = useState(0);
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: "1px solid #ccc", // Add a border at the top of the container
        backgroundColor: "#fff", // Optional: Set background color
      }}
    >
      <BottomNavigation showLabels>
        {permissionId === "101" && (
          <BottomNavigationAction
            label="Quản lý nhân sự"
            value="/dashboard"
            icon={<PeopleIcon />}
            onClick={() => navigate("/dashboard")}
          />
        )}
        {permissionId === "101" && (
          <BottomNavigationAction
            label="Quản lý kho"
            value="/warehouse"
            icon={<StorefrontIcon />}
            onClick={() => navigate("/warehouse")}
          />
        )}
        {permissionId === "101" && (
          <BottomNavigationAction
            label="Hoạt động bán hàng"
            value="/business"
            icon={<LiquorIcon />}
            onClick={() => navigate("/business")}
          />
        )}
        <BottomNavigationAction
          label="Trang bán hàng"
          value="/order"
          icon={<StoreIcon />}
          onClick={() => navigate("/order")}
        />
      </BottomNavigation>
    </Box>
  );
};

export default NavigationPages;
