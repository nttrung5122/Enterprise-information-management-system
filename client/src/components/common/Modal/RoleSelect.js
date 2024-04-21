import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getAllRole } from "../../../services/UserService";

const RoleSelect = ({ handleRoleChange }) => {
  const [selectedRoleId, setSelectedRoleId] = React.useState("");
  const [role, setAllRole] = React.useState([]);

  React.useEffect(() => {
    // Fetch role data when the component mounts
    fetchAllRole();
  }, []);

  const fetchAllRole = () => {
    getAllRole()
      .then((response) => {
        console.log("Check data: ", response);
        setAllRole(response);
      })
      .catch((error) => {
        console.log("Check error: ", error);
      });
  };

  const handleChange = (event) => {
    setSelectedRoleId(event.target.value);
    handleRoleChange(event); // Call handleRoleChange from props
  };

  return (
    <Box sx={{ minWidth: 120, marginTop: 3 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Chức vụ</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedRoleId}
          label="role"
          onChange={handleChange}
        >
          {role.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.info}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default RoleSelect;
