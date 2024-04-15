import React from "react";

import MiniDrawer from "../common/MiniDrawer";
import { styled } from "@mui/system";
import DashboardContent from "../common/DashboardContent";
import AccountContent from "../common/AccountContent";
import { SalaryContent } from "../common/SalaryContent";
import SupplierContent from "../common/SupplierContent";
import IngredientContent from "./../common/IngredientContent";
import InventoryContent from "../common/InventoryContent";
import ReceiptContent from "../common/ReceiptContent";

const Container = styled("div")({
  display: "flex",
});

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = React.useState("employees");

  const handleMenuClick = (section) => {
    setSelectedSection(section);
  };
  return (
    <Container>
      <MiniDrawer
        onMenuClick={handleMenuClick}
        setSelectedSection={setSelectedSection}
        selectedSection={selectedSection}
      />

      {selectedSection === "accounts" && <AccountContent />}
      {selectedSection === "employees" && <DashboardContent />}
      {selectedSection === "salary" && <SalaryContent />}
      {selectedSection === "ingredient" && <IngredientContent />}
      {selectedSection === "inventory" && <InventoryContent />}
      {selectedSection === "supplier" && <SupplierContent />}
      {selectedSection === "receipt" && <ReceiptContent />}
    </Container>
  );
};
export default Dashboard;
