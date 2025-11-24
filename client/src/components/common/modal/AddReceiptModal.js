import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import {
  addReceipt,
  fetchAllUsers,
  fetchAllSuppliers,
  getAllIngredients,
} from "../../../services/UserService";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";

export const AddReceiptModal = ({ fetchReceiptsData }) => {
  const [open, setOpen] = React.useState(false);
  const [ingredients, setIngredients] = React.useState([
    { ingredientId: "", quantity: "", pricePerUnit: "" },
  ]);
  const [employees, setEmployees] = React.useState([]);
  const [suppliers, setSuppliers] = React.useState([]);
  const [ingredientsList, setIngredientsList] = React.useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = React.useState("");
  const [selectedSupplierId, setSelectedSupplierId] = React.useState("");

  React.useEffect(() => {
    if (open) {
      // Fetch employees
      fetchAllUsers()
        .then((response) => {
          setEmployees(response);
        })
        .catch((error) => {
          console.error("Error fetching employees:", error);
        });

      // Fetch suppliers
      fetchAllSuppliers()
        .then((response) => {
          setSuppliers(response);
        })
        .catch((error) => {
          console.error("Error fetching suppliers:", error);
        });

      // Fetch ingredients
      getAllIngredients()
        .then((response) => {
          setIngredientsList(response);
        })
        .catch((error) => {
          console.error("Error fetching ingredients:", error);
        });
    }
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset form when closing
    setIngredients([{ ingredientId: "", quantity: "", pricePerUnit: "" }]);
    setSelectedEmployeeId("");
    setSelectedSupplierId("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate employee and supplier
    if (!selectedEmployeeId) {
      toast.error("Vui lòng chọn nhân viên.");
      return;
    }
    if (!selectedSupplierId) {
      toast.error("Vui lòng chọn nhà cung cấp.");
      return;
    }

    // Validate ingredients
    const validIngredients = ingredients.filter(
      (ing) => ing.ingredientId && ing.quantity && ing.pricePerUnit
    );

    if (validIngredients.length === 0) {
      toast.error("Vui lòng thêm ít nhất một nguyên liệu.");
      return;
    }

    const receiptData = {
      employeeId: parseInt(selectedEmployeeId),
      supplierId: parseInt(selectedSupplierId),
      details: validIngredients.map((ing) => ({
        ingredientId: parseInt(ing.ingredientId),
        quantity: parseFloat(ing.quantity),
        pricePerUnit: parseFloat(ing.pricePerUnit),
      })),
    };

    addReceipt(receiptData)
      .then(() => {
        toast.success("Tạo hóa đơn thành công.");
        handleClose();
        fetchReceiptsData();
      })
      .catch((error) => {
        console.error("Error adding receipt:", error);
        const errorMessage =
          typeof error === "string"
            ? error
            : error.message || "Có lỗi xảy ra khi tạo hóa đơn.";
        toast.error(errorMessage);
      });
  };

  const handleIngredientIdChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index].ingredientId = value;
    setIngredients(newIngredients);
  };

  const handleQuantityChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index].quantity = event.target.value;
    setIngredients(newIngredients);
  };

  const handlePricePerUnitChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index].pricePerUnit = event.target.value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      { ingredientId: "", quantity: "", pricePerUnit: "" },
    ]);
  };

  const handleDeleteIngredient = (index) => {
    if (ingredients.length > 1) {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients(newIngredients);
    } else {
      toast.error("Hóa đơn phải có ít nhất một nguyên liệu.");
    }
  };

  const theme = createTheme();

  return (
    <React.Fragment>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        Tạo hóa đơn
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Tạo hóa đơn mới</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <FormControl fullWidth required>
              <InputLabel id="employee-select-label">Mã nhân viên *</InputLabel>
              <Select
                labelId="employee-select-label"
                id="employee-select"
                value={selectedEmployeeId}
                onChange={(e) => setSelectedEmployeeId(e.target.value)}
                label="Mã nhân viên *"
              >
                {employees.map((employee) => (
                  <MenuItem key={employee.id} value={employee.id}>
                    {employee.id} - {employee.fullname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel id="supplier-select-label">
                Mã nhà cung cấp *
              </InputLabel>
              <Select
                labelId="supplier-select-label"
                id="supplier-select"
                value={selectedSupplierId}
                onChange={(e) => setSelectedSupplierId(e.target.value)}
                label="Mã nhà cung cấp *"
              >
                {suppliers.map((supplier) => (
                  <MenuItem key={supplier.id} value={supplier.id}>
                    {supplier.id} - {supplier.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {ingredients.map((ingredient, index) => (
              <Box
                key={index}
                sx={{
                  mt: 2,
                  p: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                }}
              >
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Nguyên liệu {index + 1}
                </Typography>

                <FormControl fullWidth required sx={{ mb: 1 }}>
                  <InputLabel id={`ingredient-select-label-${index}`}>
                    Mã nguyên liệu *
                  </InputLabel>
                  <Select
                    labelId={`ingredient-select-label-${index}`}
                    id={`ingredient-select-${index}`}
                    value={ingredient.ingredientId}
                    onChange={(e) =>
                      handleIngredientIdChange(index, e.target.value)
                    }
                    label="Mã nguyên liệu *"
                  >
                    {ingredientsList.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.nameIngredient} ({item.unitCal})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  required
                  margin="dense"
                  id={`quantity-${index}`}
                  name={`quantity-${index}`}
                  label="Số lượng *"
                  type="number"
                  inputProps={{ min: 0, step: 0.01 }}
                  fullWidth
                  variant="standard"
                  value={ingredient.quantity}
                  onChange={(event) => handleQuantityChange(index, event)}
                />

                <TextField
                  required
                  margin="dense"
                  id={`pricePerUnit-${index}`}
                  name={`pricePerUnit-${index}`}
                  label="Giá mỗi đơn vị *"
                  type="number"
                  inputProps={{ min: 0, step: 0.01 }}
                  fullWidth
                  variant="standard"
                  value={ingredient.pricePerUnit}
                  onChange={(event) => handlePricePerUnitChange(index, event)}
                />

                <Button
                  onClick={() => handleDeleteIngredient(index)}
                  color="error"
                  size="small"
                  sx={{ mt: 1 }}
                >
                  Xóa nguyên liệu
                </Button>
              </Box>
            ))}

            <Button
              onClick={handleAddIngredient}
              variant="outlined"
              sx={{ mt: 1 }}
            >
              Thêm nguyên liệu
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Thêm hóa đơn</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
