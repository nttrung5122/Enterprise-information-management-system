import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
  Box,
  CircularProgress,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import PosMenu from "./menu/PosMenu";
import PosMenuSection from "./menu/PosMenuSection";
import { getMenu } from "../../../../services/BusinessService";

const PosContent = ({ food, handleAddOrder, employeeId }) => {
  const placeholderImageUrl =
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop";
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [selectedMenu, setSelectedMenu] = useState(1);
  const [section, setSection] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSectionFood, setSelectedSectionFood] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSelectedMenu = (id) => {
    setSelectedMenu(id);
    setCurrentPage(1);
  };

  const handleSelectedSection = (id, sectionFood) => {
    setSelectedSection(id);
    if (sectionFood && sectionFood.length > 0) {
      setSelectedSectionFood(sectionFood);
    } else {
      setSelectedSectionFood(food);
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchMenuSection = async () => {
      setLoading(true);
      try {
        const response = await getMenu(selectedMenu);
        setSection(response.section_menus || []);
      } catch (error) {
        console.log("error fetching menu section", error);
        setSection([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuSection();
  }, [selectedMenu]);

  useEffect(() => {
    if (food && food.length > 0 && selectedSectionFood.length === 0) {
      setSelectedSectionFood(food);
    }
  }, [food]);

  useEffect(() => {
    if (section.length > 0) {
      const firstSection = section[0];
      setSelectedSection(firstSection.id);
      if (firstSection.food && firstSection.food.length > 0) {
        setSelectedSectionFood(firstSection.food);
      } else {
        setSelectedSectionFood(food);
      }
    } else {
      setSelectedSectionFood(food);
    }
  }, [section, food]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={3}>
        {/* Menu Selection */}
        <Grid item xs={12}>
          <PosMenu
            handleSelectedMenu={handleSelectedMenu}
            selectedMenu={selectedMenu}
          />
        </Grid>

        {/* Section Menu and Food Grid */}
        <Grid container spacing={3} sx={{ mt: 0 }}>
          {/* Section Menu Sidebar */}
          {section.length > 0 && (
            <Grid item xs={12} sm={3} md={2}>
              <PosMenuSection
                section={section}
                handleSelectedSection={handleSelectedSection}
                selectedSection={selectedSection}
              />
            </Grid>
          )}

          {/* Food Items Grid */}
          <Grid
            item
            xs={12}
            sm={section.length > 0 ? 9 : 12}
            md={section.length > 0 ? 10 : 12}
          >
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "400px",
                }}
              >
                <CircularProgress />
              </Box>
            ) : selectedSectionFood.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "400px",
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  Không có món ăn nào để hiển thị
                </Typography>
              </Box>
            ) : (
              <>
                <Grid container spacing={3}>
                  {selectedSectionFood
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((item) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            transition: "transform 0.2s, box-shadow 0.2s",
                            "&:hover": {
                              transform: "translateY(-4px)",
                              boxShadow: 4,
                            },
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="200"
                            image={
                              item.imageUrl && item.imageUrl.trim() !== ""
                                ? item.imageUrl
                                : placeholderImageUrl
                            }
                            alt={item.nameFood}
                            sx={{
                              objectFit: "cover",
                            }}
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography
                              variant="h6"
                              component="h3"
                              gutterBottom
                              sx={{
                                fontWeight: 600,
                                fontSize: "1.1rem",
                                mb: 1,
                              }}
                            >
                              {item.nameFood}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                mb: 2,
                                minHeight: "40px",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {item.info || "Không có mô tả"}
                            </Typography>
                            <Typography
                              variant="h6"
                              color="primary"
                              sx={{ fontWeight: 700, mb: 1 }}
                            >
                              {formatPrice(item.price)}
                            </Typography>
                          </CardContent>
                          <CardActions sx={{ p: 2, pt: 0 }}>
                            <Button
                              fullWidth
                              variant="contained"
                              color="primary"
                              size="large"
                              onClick={() => handleAddOrder(item)}
                              sx={{
                                py: 1.5,
                                fontWeight: 600,
                                textTransform: "none",
                                fontSize: "1rem",
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
                {selectedSectionFood.length > itemsPerPage && (
                  <Stack
                    spacing={2}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mt: 4,
                      mb: 5,
                    }}
                  >
                    <Pagination
                      count={Math.ceil(
                        selectedSectionFood.length / itemsPerPage
                      )}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                      showFirstButton
                      showLastButton
                    />
                  </Stack>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PosContent;
