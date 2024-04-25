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
import PosMenu from "./menu/PosMenu";
import PosMenuSection from "./menu/PosMenuSection";
import { getMenu } from "../../../../services/BusinessService";

const PosContent = ({ food, handleAddOrder }) => {
  const placeholderImageUrl = "https://via.placeholder.com/300";
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items to display per page
  const [selectedMenu, setSelectedMenu] = useState(1);
  const [section, setSection] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSectionFood, setSelectedSectionFood] = useState([]);

  const handleSelectedMenu = (id) => {
    setSelectedMenu(id);
  };

  const handleSelectedSection = (id, food) => {
    setSelectedSection(id);
    setSelectedSectionFood(food);
  };

  const fetchMenuSection = async () => {
    try {
      const response = await getMenu(selectedMenu);
      setSection(response.section_menus);
    } catch (error) {
      console.log("error fetching menu section", error);
    }
  };

  useEffect(() => {
    fetchMenuSection();
  }, [selectedMenu]);

  useEffect(() => {
    if (section.length > 0) {
      setSelectedSection(section[0]); // Update the selectedSection state instead of setSection
      setSelectedSectionFood(food); // Initialize selectedSectionFood with all food items
    }
  }, [section]);

  // Change page
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PosMenu handleSelectedMenu={handleSelectedMenu} />
      </Grid>
      <Grid item xs={2}>
        <PosMenuSection
          section={section}
          handleSelectedSection={handleSelectedSection}
        />
      </Grid>
      <Grid item xs={10}>
        <Container>
          <Grid container spacing={3}>
            {selectedSectionFood
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card sx={{ width: 300, height: 325 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.imageUrl || placeholderImageUrl}
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
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                          handleAddOrder(item);
                        }}
                      >
                        Đặt món
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>

          {/* Pagination */}
          <Stack display="flex" spacing={2} justifyContent="center" mt={3}>
            <Pagination
              count={Math.ceil(selectedSectionFood.length / itemsPerPage)} // Adjust count based on total food items
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              color="primary"
            />
          </Stack>
        </Container>
      </Grid>
    </Grid>
  );
};

export default PosContent;
