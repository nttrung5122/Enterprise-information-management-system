import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const RoleSelect = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, marginTop: 3 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Chức vụ</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="role"
          onChange={handleChange}
        >
          <MenuItem value={203}>Quản lý</MenuItem>
          <MenuItem value={203}>Nhân viên</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default RoleSelect;
