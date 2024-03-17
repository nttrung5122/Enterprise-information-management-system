import React from "react";
import MiniDrawer from "../common/MiniDrawer";
import DashboardHeader from "../common/DashboardHeader";
import DashboardTable from "../common/DashboardTable";
import { styled } from "@mui/system";
import SearchInput from "../common/SearchInput";
import FilterButtonGroup from "../common/FilterButtonGroup";

const Container = styled("div")({
  display: "flex",
});

const ContentContainer = styled("div")({
  flexGrow: 1,
  padding: "10px", // Add padding for better spacing
  marginLeft: "-60px", // Adjust the margin to offset the sidebar width
});

const FilterGroupContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

const Dashboard = () => {
  return (
    <Container>
      <MiniDrawer />
      <ContentContainer>
        <DashboardHeader />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <SearchInput />
          <FilterGroupContainer>
            <FilterButtonGroup style={{ border: "1px groove grey" }} />
          </FilterGroupContainer>
        </div>
        <DashboardTable />
      </ContentContainer>
    </Container>
  );
};
export default Dashboard;
