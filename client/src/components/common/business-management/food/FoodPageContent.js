import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import DisableFoodModal from "./modal/DisableFoodModal";
import { EditFoodModal } from "./modal/EditFoodModal";

const FoodPageContent = ({ food, getAllFood }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items to display per page
  const [filter, setFilter] = useState("all"); // Filter state: "all", "active", or "disabled"
  const [filteredItems, setFilteredItems] = useState([]);

  // Function to filter food items based on the filter state
  useEffect(() => {
    const filtered = food.filter((item) => {
      if (filter === "active") return !item.disable;
      if (filter === "disabled") return item.disable;
      return true; // for "all" filter
    });
    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to first page when changing filter
  }, [food, filter]);

  // Change page
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container>
      {/* Filter buttons */}
      <Stack direction="row" spacing={0.8} justifyContent="flex-end" mt={3}>
        <Button
          variant={filter === "all" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setFilter("active")}
        >
          Active
        </Button>
        <Button
          variant={filter === "disabled" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setFilter("disabled")}
        >
          Disabled
        </Button>
      </Stack>

      {/* Display food items */}
      <Grid container spacing={3} mt={3}>
        {filteredItems
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ width: 325, height: 325 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image="alt"
                  alt={item.id}
                />
                <CardContent>
                  <Typography gutterBottom>{item.nameFood}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {item.info}
                  </Typography>
                  <Typography component="p" gutterBottom>
                    ${item.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <EditFoodModal food={item} getAllFood={getAllFood} />

                  <DisableFoodModal food={item} getAllFood={getAllFood} />
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>

      {/* Pagination */}
      <Stack display="flex" spacing={2} justifyContent="center" mt={2} mb={6}>
        <Pagination
          count={Math.ceil(filteredItems.length / itemsPerPage)} // Adjust count based on filtered items
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </Stack>
    </Container>
  );
};

export default FoodPageContent;
