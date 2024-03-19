import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const RoleSelect = ({ handleRoleChange }) => {
  const [selectedRoleId, setSelectedRoleId] = React.useState("");

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
          <MenuItem value={201}>Quản lý</MenuItem>
          <MenuItem value={203}>Nhân viên</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default RoleSelect;
