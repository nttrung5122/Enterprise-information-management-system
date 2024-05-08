import React, { useEffect } from "react";
import { styled } from "@mui/system";
import MiniDrawer from "../common/admin/MiniDrawer";

import SupplierContent from "../common/warehouse/supplier/SupplierContent";
import IngredientContent from "../common/warehouse/ingredient/IngredientContent";
import InventoryContent from "../common/warehouse/inventory/InventoryContent";
import ReceiptContent from "../common/warehouse/receipt/ReceiptContent";
import CancellationFormContent from "../common/warehouse/cancellation/CancellationFormContent";
import TimeKeepingContent from "../common/admin/TimeKeepingContent";
import WarehouseDrawer from "../common/warehouse/WarehouseDrawer";

const Container = styled("div")({
  display: "flex",
});

const WarehousePage = () => {
  const [selectedSection, setSelectedSection] = React.useState("employees");
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
      <WarehouseDrawer
        onMenuClick={handleMenuClick}
        setSelectedSection={setSelectedSection}
        selectedSection={selectedSection}
        employeeId={employeeId}
      />

      {selectedSection === "ingredient" && <IngredientContent />}
      {selectedSection === "inventory" && <InventoryContent />}
      {selectedSection === "supplier" && <SupplierContent />}
      {selectedSection === "receipt" && <ReceiptContent />}
      {selectedSection === "cancellationForm" && (
        <CancellationFormContent employeeId={employeeId} />
      )}
      {selectedSection === "attendance" && <TimeKeepingContent />}
    </Container>
  );
};
export default WarehousePage;
