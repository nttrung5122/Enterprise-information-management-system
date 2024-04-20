import React from "react";
import { styled } from "@mui/system";
import MiniDrawer from "../common/admin/MiniDrawer";

import DashboardContent from "../common/admin/DashboardContent";
import AccountContent from "../common/admin/AccountContent";
import SupplierContent from "../common/admin/SupplierContent";
import IngredientContent from "./../common/admin/IngredientContent";
import InventoryContent from "../common/admin/InventoryContent";
import ReceiptContent from "../common/admin/ReceiptContent";
import CancellationFormContent from "../common/admin/CancellationFormContent";
import { SalaryContent } from "../common/admin/SalaryContent";
import TimeKeepingContent from "../common/admin/TimeKeepingContent";

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
      {selectedSection === "cancellationForm" && <CancellationFormContent />}
      {selectedSection === "attendance" && <TimeKeepingContent />}
    </Container>
  );
};
export default Dashboard;
