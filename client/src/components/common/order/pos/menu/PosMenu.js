import React, { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { fetchAllMenu } from "../../../../../services/BusinessService";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function PosMenu({ handleSelectedMenu }) {
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
    <div>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        sx={{ mt: 2 }}
      >
        {menu.map((item) => (
          <Button
            key={item.id}
            variant="contained"
            onClick={() => handleSelectedMenu(item.id)}
          >
            {item.nameMenu}
          </Button>
        ))}
      </Stack>
    </div>
  );
}
