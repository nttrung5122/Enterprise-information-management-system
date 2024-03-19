import React from "react";
import MiniDrawer from "../common/MiniDrawer";
import { styled } from "@mui/system";
import DashboardContent from "../common/DashboardContent";

const Container = styled("div")({
  display: "flex",
});

const Dashboard = () => {
  return (
    <Container>
      <MiniDrawer />
      <DashboardContent />
    </Container>
  );
};
export default Dashboard;
