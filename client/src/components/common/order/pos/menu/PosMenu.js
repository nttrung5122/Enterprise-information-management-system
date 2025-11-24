import React, { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { fetchAllMenu } from "../../../../../services/BusinessService";

export default function PosMenu({ handleSelectedMenu, selectedMenu }) {
  const [menu, setMenu] = useState([]);

  const getAllMenu = () => {
    fetchAllMenu()
      .then((response) => {
        setMenu(response);
      })
      .catch((error) => {
        console.log("error fetching menu", error);
      });
  };

  useEffect(() => {
    getAllMenu();
  }, []);

  return (
    <Box sx={{ mb: 2 }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={1}
        sx={{
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {menu.map((item) => (
          <Button
            key={item.id}
            variant={selectedMenu === item.id ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleSelectedMenu(item.id)}
            sx={{
              textTransform: "none",
              fontWeight: selectedMenu === item.id ? 600 : 400,
              px: 3,
              py: 1,
            }}
          >
            {item.nameMenu}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
