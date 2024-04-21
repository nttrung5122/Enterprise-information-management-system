import React from "react";
import { styled } from "@mui/system";

import PageDrawer from "../common/business-management/PageDrawer";
import PageContainer from "../common/business-management/PageContainer";
import RecipeContainer from "../common/business-management/recipe/RecipeContainer";

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
    </Container>
  );
};
export default BusinessPage;
