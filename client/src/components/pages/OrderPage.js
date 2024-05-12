import React, { useEffect } from "react";
import { styled } from "@mui/system";
import OrderDrawer from "../common/order/OrderDrawer";
import PosContainer from "../common/order/pos/PosContainer";
import BillContainer from "../common/order/bill/BillContainer";
import { useNavigate } from "react-router-dom";
import NavigationPages from "../common/BottomNavigation";

const Container = styled("div")({
  display: "flex",
});
const OrderPage = () => {
  const [selectedSection, setSelectedSection] = React.useState("order");
  const [employeeId, setEmployeeId] = React.useState(null);
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
    if (permissionId !== "101" && permissionId !== "103")
      switch (permissionId) {
        case "102":
          navigate("/business");
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
      <OrderDrawer
        onMenuClick={handleMenuClick}
        setSelectedSection={setSelectedSection}
        selectedSection={selectedSection}
        employeeId={employeeId}
      />
      {selectedSection === "order" && <PosContainer employeeId={employeeId} />}
      {selectedSection === "bill" && <BillContainer employeeId={employeeId} />}
      <NavigationPages navigate={navigate} permissionId={permissionId} />
    </Container>
  );
};
export default OrderPage;
