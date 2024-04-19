import React from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

const ProductList = () => {
  // Sample food items with placeholder image URLs
  const foodItems = [
    {
      id: 1,
      name: "Burger",
      description: "Delicious burger with cheese and veggies",
      price: 9.99,
      imageUrl: "https://picsum.photos/50/50",
    },
    {
      id: 2,
      name: "Pizza",
      description: "Classic pizza with pepperoni and cheese",
      price: 12.99,
      imageUrl: "https://picsum.photos/50/50",
    },
    {
      id: 3,
      name: "Salad",
      description: "Fresh salad with mixed greens and dressing",
      price: 7.99,
      imageUrl: "https://picsum.photos/50/50",
    },
  ];

  return (
    <Container>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
      ></Typography>
      <Grid container spacing={3}>
        {foodItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{ width: "100%" }}
              />
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.description}
                </Typography>
                <Typography variant="h6" component="p" gutterBottom>
                  ${item.price.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary">
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
