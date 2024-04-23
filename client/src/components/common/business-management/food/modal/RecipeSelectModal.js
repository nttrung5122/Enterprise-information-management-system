import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { fetchAllRecipe } from "../../../../../services/BusinessService";

const RecipeSelectModal = ({ handleRecipeChange }) => {
  const [selectedRecipeId, setSelectedRecipeId] = React.useState("");
  const [recipes, setRecipes] = React.useState([]);

  const getAllRecipe = () => {
    fetchAllRecipe()
      .then((response) => {
        setRecipes(response);
      })
      .catch((error) => {
        console.log("Check error: ", error);
      });
  };

  React.useEffect(() => {
    // Fetch ingredients data when the component mounts
    getAllRecipe();
  }, []);
  const handleChange = (event) => {
    setSelectedRecipeId(event.target.value);
    handleRecipeChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, marginTop: 3 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Công thức</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedRecipeId}
          label="Công thức"
          onChange={handleChange}
        >
          {recipes.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.nameRecipe}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default RecipeSelectModal;
