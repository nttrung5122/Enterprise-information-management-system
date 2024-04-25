import React from "react";
import { styled } from "@mui/system";
import OrderDrawer from "../common/order/OrderDrawer";
import PosContainer from "../common/order/pos/PosContainer";

const Container = styled("div")({
  display: "flex",
});
const OrderPage = () => {
  const [selectedSection, setSelectedSection] = React.useState("order");
  const handleMenuClick = (section) => {
    setSelectedSection(section);
  };
  return (
    <Container>
      <OrderDrawer
        onMenuClick={handleMenuClick}
        setSelectedSection={setSelectedSection}
        selectedSection={selectedSection}
      />
      {selectedSection === "order" && <PosContainer />}
    </Container>
  );
};
export default OrderPage;
