import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getAllIngredients } from "../../../../../services/UserService";
import { toast } from "react-toastify";

const IngredientSelectModal = ({ handleIngredientChange, defaultValue }) => {
  const [selectedIngredientId, setSelectedIngredientId] = React.useState(
    defaultValue || ""
  );
  const [ingredients, setIngredients] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchAllIngredient = () => {
    setLoading(true);
    getAllIngredients()
      .then((response) => {
        setIngredients(response);
      })
      .catch((error) => {
        console.error("Error fetching ingredients:", error);
        toast.error("Không thể tải danh sách nguyên liệu.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    fetchAllIngredient();
  }, []);

  // Update selected value when defaultValue changes
  React.useEffect(() => {
    if (defaultValue !== undefined) {
      setSelectedIngredientId(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedIngredientId(value);
    handleIngredientChange(value);
  };

  return (
    <Box sx={{ minWidth: 120, marginTop: 2, marginBottom: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="ingredient-select-label">Mã nguyên liệu *</InputLabel>
        <Select
          labelId="ingredient-select-label"
          id="ingredient-select"
          value={selectedIngredientId}
          label="Mã nguyên liệu *"
          onChange={handleChange}
          disabled={loading}
          required
        >
          {ingredients.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.nameIngredient} ({item.unitCal})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default IngredientSelectModal;
