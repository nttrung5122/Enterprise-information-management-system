import React from "react";

import MiniDrawer from "../common/MiniDrawer";
import { styled } from "@mui/system";
import DashboardContent from "../common/DashboardContent";
import AccountContent from "../common/AccountContent";
import { SalaryContent } from "../common/SalaryContent";
import InventoryContent from "../common/InventoryContent";
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
      />

      {selectedSection === "accounts" && <AccountContent />}
      {selectedSection === "employees" && <DashboardContent />}
      {selectedSection === "salary" && <SalaryContent />}
      {selectedSection === "inventory" && <InventoryContent />}
    </Container>
  );
};
export default Dashboard;
