import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import MiniDrawer from "../common/admin/MiniDrawer";

import DashboardContent from "../common/admin/DashboardContent";
import AccountContent from "../common/admin/AccountContent";

import { SalaryContent } from "../common/admin/SalaryContent";
import TimeKeepingContent from "../common/admin/TimeKeepingContent";
import RoleContent from "../common/admin/RoleContent";
import { useNavigate } from "react-router-dom";

import NavigationPages from "../common/BottomNavigation";

const Container = styled("div")({
  display: "flex",
});

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState("employees");
  const [employeeId, setEmployeeId] = useState(null);
  const navigate = useNavigate(); // useNavigate should be called at the top level
  useEffect(() => {
    // Retrieve employeeId from sessionStorage when the component mounts
    const storedEmployeeId = sessionStorage.getItem("employeeId");
    if (storedEmployeeId) {
      setEmployeeId(storedEmployeeId);
    }
  }, []);
  const handleMenuClick = (section) => {
    setSelectedSection(section);
  };
  const permissionId = sessionStorage.getItem("permissionId");
  useEffect(() => {
    console.log("permissionId: ", permissionId);
    if (permissionId !== "101")
      switch (permissionId) {
        case "102":
          navigate("/business");
          break;
        case "103":
          navigate("/order");
          break;
        case "104" || "105":
          navigate("/warehouse");
          break;
        default:
          navigate("/"); // Default order page
          break;
      }
  }, []);
  return (
    <Container>
      <MiniDrawer
        onMenuClick={handleMenuClick}
        setSelectedSection={setSelectedSection}
        selectedSection={selectedSection}
        employeeId={employeeId}
      />
      {selectedSection === "role" && <RoleContent />}
      {selectedSection === "accounts" && <AccountContent />}
      {selectedSection === "employees" && <DashboardContent />}
      {selectedSection === "salary" && <SalaryContent />}
      {selectedSection === "attendance" && <TimeKeepingContent />}

      <NavigationPages navigate={navigate} permissionId={permissionId} />
    </Container>
  );
};
export default Dashboard;
