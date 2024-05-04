import React from "react";
import { styled } from "@mui/system";

import PageDrawer from "../common/business-management/PageDrawer";
import RecipeContainer from "../common/business-management/recipe/RecipeContainer";
import FoodPageContainer from "../common/business-management/food/FoodPageContainer";
import MenuSectionContainer from "../common/business-management/menu-section/MenuSectionContainer";
import MenuContainer from "../common/business-management/menu/MenuContainer";
import BillContainer from "../common/business-management/bill/BillContainer";
import StatisticContainer from "../common/statistic/StatisticContainer";
import FoodSaleContainer from "../common/business-management/food-sale/FoodSaleContainer";
import IngredientConsumedContainer from "../common/business-management/ingredient-consumed/IngredientConsumedContainer";

const Container = styled("div")({
  display: "flex",
});
const BusinessPage = () => {
  const [selectedSection, setSelectedSection] = React.useState("food");
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
      {selectedSection === "menu" && <MenuContainer />}
      {selectedSection === "bill" && <BillContainer />}
      {selectedSection === "statistic" && <StatisticContainer />}
      {selectedSection === "sale" && <FoodSaleContainer />}
      {selectedSection === "ingredientConsumed" && (
        <IngredientConsumedContainer />
      )}
    </Container>
  );
};
export default BusinessPage;
