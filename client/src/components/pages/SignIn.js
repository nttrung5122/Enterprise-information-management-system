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

      if (res && res.id) {
        const permissionId =
          res.permissions[0]?.account_permission.permissionId;
        console.log("Login success, the permission Id:", permissionId);
        console.log("Login success, check the res:", res);
        sessionStorage.setItem("permissionId", permissionId);
        sessionStorage.setItem("employeeId", res.employee.id);

        switch (permissionId) {
          case 101:
            navigate("/dashboard");
            break;
          case 102:
            navigate("/business");
            break;
          case 103:
            navigate("/order");
            break;
          case 104 || 105:
            navigate("/warehouse");
            break;
          default:
            navigate("/order"); // Default order page
            break;
        }
      }
    } catch (error) {
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
          <Link href="#" underline="hover">
            Quên mật khẩu?
          </Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
