import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import ResponsiveAppBarLogin from "./common/ResponsiveAppBarLogin";
import Swal from "sweetalert2";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const loginData = {
      username,
      password,
    };

    const response = await axios.post(
      "http://localhost:5500/agri/users/login",
      loginData
    );

    console.log(response);
    const data = response.data;

    if (data.user) {
      localStorage.setItem("token", data.user);
      localStorage.setItem("username", data.username);
      localStorage.setItem("userID", data.id);

      if (data.role === "farmer") {
        navigate("/farmer/items");
      } else if (data.role === "customer") {
        navigate("/allItems");
      } else {
        console.log("Role Error");
      }
    } else if (data.status === "no_user") {
      Swal.fire({
        title: "Username does not exists!!",
        text: "Please create an account",
        icon: "error",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          setUsername("");
          setPassword("");
        }
      });
    } else {
      Swal.fire({
        title: "Incorrect Password!!",
        text: "Please enter your password again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      setPassword("");
    }
  };

  return (
    <div>
      <ResponsiveAppBarLogin />
      <Container>
        <center>
          <Card
            sx={{ minWidth: 400, m: 5, p: 2, maxWidth: 500, mt: 15 }}
            raised
          >
            <CardContent>
              <form onSubmit={loginUser}>
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1 }}>
                    <PersonIcon fontSize="large" />
                  </Avatar>
                  <Typography
                    component="h1"
                    variant="h5"
                    style={{ fontWeight: 700, color: "#686965" }}
                  >
                    User Login
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      value={username}
                      id="username"
                      label="Username"
                      name="username"
                      autoFocus
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      value={password}
                      name="password"
                      label="Password"
                      type="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      style={{
                        backgroundColor: "#22b14c",
                      }}
                    >
                      Sign In
                    </Button>
                    <Grid container>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-end"
                        spacing={15}
                        sx={{ mx: 2 }}
                      >
                        Do not have an account?
                        <Link
                          href="/register"
                          variant="body2"
                          style={{
                            color: "#22b14c",
                          }}
                        >
                          Register Here
                        </Link>
                      </Stack>
                    </Grid>
                  </Box>
                </Box>

                <br />
                <br />

                <div>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    {"Copyright © "}
                    {new Date().getFullYear()}
                    {"."}
                  </Typography>
                </div>
              </form>
            </CardContent>
          </Card>
        </center>
      </Container>
    </div>
  );
}

export default Login;
