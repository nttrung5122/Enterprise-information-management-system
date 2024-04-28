import React from "react";
import { styled } from "@mui/system";
import MiniDrawer from "../common/admin/MiniDrawer";

import DashboardContent from "../common/admin/DashboardContent";
import AccountContent from "../common/admin/AccountContent";
import SupplierContent from "../common/warehouse/supplier/SupplierContent";
import IngredientContent from "../common/warehouse/ingredient/IngredientContent";
import InventoryContent from "../common/warehouse/inventory/InventoryContent";
import ReceiptContent from "../common/warehouse/receipt/ReceiptContent";
import CancellationFormContent from "../common/warehouse/cancellation/CancellationFormContent";
import { SalaryContent } from "../common/admin/SalaryContent";
import TimeKeepingContent from "../common/admin/TimeKeepingContent";
import RoleContent from "../common/admin/RoleContent";

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
      {selectedSection === "role" && <RoleContent />}
      {selectedSection === "accounts" && <AccountContent />}
      {selectedSection === "employees" && <DashboardContent />}
      {selectedSection === "salary" && <SalaryContent />}

      {selectedSection === "attendance" && <TimeKeepingContent />}
    </Container>
  );
};
export default Dashboard;
