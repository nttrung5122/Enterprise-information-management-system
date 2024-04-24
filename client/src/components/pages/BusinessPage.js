import React from "react";
import { styled } from "@mui/system";

import PageDrawer from "../common/business-management/PageDrawer";
import RecipeContainer from "../common/business-management/recipe/RecipeContainer";
import FoodPageContainer from "../common/business-management/food/FoodPageContainer";
import MenuSectionContainer from "../common/business-management/menu-section/MenuSectionContainer";

const Container = styled("div")({
  display: "flex",
});
const BusinessPage = () => {
  const [selectedSection, setSelectedSection] = React.useState("employees");
  const handleMenuClick = (section) => {
    setSelectedSection(section);
  };
  return (
    <Container>
      <PageDrawer
        onMenuClick={handleMenuClick}
        setSelectedSection={setSelectedSection}
        selectedSection={selectedSection}
      />
      {selectedSection === "recipe" && <RecipeContainer />}
      {selectedSection === "food" && <FoodPageContainer />}
      {selectedSection === "sectionMenu" && <MenuSectionContainer />}
    </Container>
  );
};
export default BusinessPage;
