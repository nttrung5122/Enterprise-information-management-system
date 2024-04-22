import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getAllIngredients } from "../../../../../services/UserService";

const IngredientSelectModal = ({ handleIngredientChange }) => {
  const [selectedIngredientId, setSelectedIngredientId] = React.useState("");
  const [ingredients, setIngredients] = React.useState([]);

  const fetchAllIngredient = () => {
    getAllIngredients()
      .then((response) => {
        setIngredients(response);
      })
      .catch((error) => {
        console.log("Check error: ", error);
      });
  };

  React.useEffect(() => {
    // Fetch ingredients data when the component mounts
    fetchAllIngredient();
  }, []);
  const handleChange = (event) => {
    setSelectedIngredientId(event.target.value);
    handleIngredientChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, marginTop: 3 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Nguyên liệu</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedIngredientId}
          label="Nguyên liệu"
          onChange={handleChange}
        >
          {ingredients.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.nameIngredient}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default IngredientSelectModal;
