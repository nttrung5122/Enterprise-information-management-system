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
  addCancellationForm,
  fetchAllUsers,
  getAllIngredients,
} from "../../../services/UserService";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";

export const AddCancellationModal = ({
  fetchCancellationForms,
  employeeId,
}) => {
  const [open, setOpen] = React.useState(false);
  const [ingredients, setIngredients] = React.useState([
    { ingredientId: "", quantity: "" },
  ]);
  const [employees, setEmployees] = React.useState([]);
  const [ingredientsList, setIngredientsList] = React.useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = React.useState(
    employeeId || ""
  );

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

  // Update selectedEmployeeId when employeeId prop changes
  React.useEffect(() => {
    if (employeeId) {
      setSelectedEmployeeId(employeeId);
    }
  }, [employeeId]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset form when closing
    setIngredients([{ ingredientId: "", quantity: "" }]);
    setSelectedEmployeeId(employeeId || "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const note = formData.get("note");

    // Validate employee
    if (!selectedEmployeeId) {
      toast.error("Vui lòng chọn nhân viên.");
      return;
    }

    // Validate note
    if (!note || note.trim() === "") {
      toast.error("Vui lòng nhập nguyên nhân.");
      return;
    }

    // Validate ingredients
    const validIngredients = ingredients.filter(
      (ing) => ing.ingredientId && ing.quantity && ing.quantity.trim() !== ""
    );

    if (validIngredients.length === 0) {
      toast.error("Vui lòng thêm ít nhất một nguyên liệu.");
      return;
    }

    const cancelFormData = {
      employeeId: parseInt(selectedEmployeeId),
      note: note,
      details: validIngredients.map((ing) => ({
        ingredientId: parseInt(ing.ingredientId),
        quantity: parseFloat(ing.quantity),
      })),
    };

    addCancellationForm(cancelFormData)
      .then(() => {
        toast.success("Tạo mẫu hủy thành công.");
        handleClose();
        fetchCancellationForms();
      })
      .catch((error) => {
        console.error("Error adding cancellation form:", error);
        const errorMessage =
          typeof error === "string"
            ? error
            : error.message || "Có lỗi xảy ra khi tạo mẫu hủy.";
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

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { ingredientId: "", quantity: "" }]);
  };

  const handleDeleteIngredient = (index) => {
    if (ingredients.length > 1) {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients(newIngredients);
    } else {
      toast.error("Mẫu hủy phải có ít nhất một nguyên liệu.");
    }
  };

  const theme = createTheme();

  return (
    <React.Fragment>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        Tạo mẫu hủy
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
        <DialogTitle>Tạo mẫu hủy mới</DialogTitle>
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

            <TextField
              required
              margin="dense"
              id="note"
              name="note"
              label="Nguyên nhân *"
              fullWidth
              variant="standard"
              multiline
              rows={2}
            />

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
          <Button type="submit">Thêm mẫu hủy</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
