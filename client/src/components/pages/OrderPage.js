import React, { useEffect } from "react";
import { styled } from "@mui/system";
import OrderDrawer from "../common/order/OrderDrawer";
import PosContainer from "../common/order/pos/PosContainer";
import BillContainer from "../common/order/bill/BillContainer";

const Container = styled("div")({
  display: "flex",
});
const OrderPage = () => {
  const [selectedSection, setSelectedSection] = React.useState("order");
  const [employeeId, setEmployeeId] = React.useState(null);
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
  return (
    <Container>
      <OrderDrawer
        onMenuClick={handleMenuClick}
        setSelectedSection={setSelectedSection}
        selectedSection={selectedSection}
      />
      {selectedSection === "order" && <PosContainer employeeId={employeeId} />}
      {selectedSection === "bill" && <BillContainer employeeId={employeeId} />}
    </Container>
  );
};
export default OrderPage;
