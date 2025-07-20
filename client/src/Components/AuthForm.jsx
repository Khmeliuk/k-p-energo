import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Avatar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SelectSmall from "./muicomponent/handleChange .jsx";
import { Copyright } from "./muicomponent/Typography.jsx";
import { login, registration } from "../service/API/asios.js";
import { useAuthMutation } from "../service/reactQuery/reactMutation.js";

import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);

  const loginMutation = useAuthMutation(login);
  const navigate = useNavigate();

  const registrationMutation = useAuthMutation(registration);

  const toggleForm = () => setIsLogin(!isLogin);

  function loginHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    loginMutation.mutate(formValues, {
      onSuccess: (data) => {
        navigate("/task"); // 🔄 редірект тут
      },
    });
  }

  function registrationHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    registrationMutation.mutate(formValues);
  }

  return (
    <Container>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main", margin: "auto" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h4" align="center" gutterBottom>
        {isLogin ? "Login" : "Register"}
      </Typography>
      <form
        onSubmit={isLogin ? loginHandler : registrationHandler}
        noValidate
        autoComplete="off"
      >
        {!isLogin && (
          <TextField
            name="name"
            label=" Name"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
        )}
        {!isLogin && (
          <TextField
            name="lastName"
            label="Last name"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
        )}
        {!isLogin && (
          <SelectSmall
            name={"role"}
            options={["user", "super user", "admin"]}
          />
        )}
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        {!isLogin && (
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
        )}
        <StyledButton
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          {isLogin ? "Login" : "Register"}
        </StyledButton>
        {(loginMutation.error || registrationMutation.error) && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {loginMutation.error?.response?.data?.message ||
              registrationMutation.error?.response?.data?.message ||
              "Невірний логін чи пароль"}
          </Alert>
        )}
        <Button onClick={toggleForm} fullWidth sx={{ marginTop: 2 }}>
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </Button>
      </form>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

const Container = styled(Box)`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  /* background-color: #f5f5f5; */
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled(Button)`
  && {
    margin-top: 20px;
    background-color: #1976d2;
    &:hover {
      background-color: #115293;
    }
  }
`;

export default AuthForm;
