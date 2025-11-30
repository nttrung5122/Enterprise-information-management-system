import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { loginApi } from "../../services/UserService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [error, setError] = useState("");
  const navigate = useNavigate(); // useNavigate should be called at the top level

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const res = await loginApi({
        user: data.get("userId"),
        password: data.get("password"),
      });

      console.log("Full login response:", res);
      console.log("Permissions:", res.permissions);

      if (res && res.id) {
        // Extract permissionId - handle different possible structures
        let permissionId = null;

        // Try to get permission from permissions array
        if (res.permissions && res.permissions.length > 0) {
          permissionId =
            res.permissions[0]?.account_permission?.permissionId ||
            res.permissions[0]?.id ||
            res.permissions[0]?.permissionId;
        }

        // If no permissions found, assign default based on account or use a default
        if (!permissionId) {
          console.warn("No permissions found for account, assigning default");
          // Default to order management (103) if no permission found
          // You can change this to 101 (admin) if needed for testing
          permissionId = 103; // Default to order management
        }

        // Get employeeId - handle both lowercase and uppercase
        const employeeId =
          res.employee?.id || res.Employee?.id || res.employeeId;

        if (!employeeId) {
          setError("Không tìm thấy thông tin nhân viên");
          return;
        }

        // Ensure permissionId is a valid number/string before storing
        const permissionIdStr = String(permissionId);

        console.log("Setting permissionId:", permissionIdStr);
        console.log("Setting employeeId:", employeeId);

        sessionStorage.setItem("permissionId", permissionIdStr);
        sessionStorage.setItem("employeeId", String(employeeId));

        // Navigate based on permission
        switch (Number(permissionId)) {
          case 101:
            navigate("/dashboard");
            break;
          case 102:
            navigate("/business");
            break;
          case 103:
            navigate("/order");
            break;
          case 104:
          case 105:
            navigate("/warehouse");
            break;
          default:
            navigate("/order");
            break;
        }
      } else {
        setError("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Mật khẩu không đúng hoặc tài khoản không tồn tại");
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="userId"
              label="UserID"
              name="userId"
              autoComplete="userId"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {error && ( // Display error if it exists
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2.5, mb: 2 }}
            >
              Đăng nhập
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
