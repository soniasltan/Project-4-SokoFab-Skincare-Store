import * as React from "react";
import { axiosInstance, CommonHeaderProperties } from "../axiosCtrl";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Login = () => {
  let navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<any>("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value.trim(),
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(login);

    axiosInstance
      .post("token/", {
        email: login.email,
        password: login.password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        (
          axiosInstance.defaults.headers as unknown as Record<
            string,
            CommonHeaderProperties
          >
        ).common["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        navigate("/");
        console.log(res);
        console.log(res.data)
      })
      .catch((error) => {
        setError(error.response.data)
        console.log(error.response.data)
      })
    };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" align="center" sx={{ mt: "1em" }}>
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            {error ? (
              <>
                <Typography
                  variant="subtitle1"
                  align="left"
                  sx={{ color: "red", mt: "-1em" }}
                >
                  Error - please correct the following:
                </Typography>
                <Typography
                  variant="body2"
                  align="left"
                  sx={{ color: "red", mt: "0.3em" }}
                >
                  {error?.detail}
                </Typography>
                <br />
              </>
            ) : (
              " "
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            {!login.email || !login.password ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled
              >
                Login
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            )}
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
