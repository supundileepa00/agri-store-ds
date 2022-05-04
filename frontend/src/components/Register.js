import { Button, Container, Grid, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./loader/Loader";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBarLogin from "./common/ResponsiveAppBarLogin";
import ResponsiveAppBarRegister from "./common/ResponsiveAppBarRegister";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Register() {
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");

  const [showText, setShowText] = useState(false);

  const navigate = useNavigate();

  //methods

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setShowText(false);
      setLoading(true);

      const newLogin = {
        username,
        password,
        role,
      };

      axios
        .post("http://localhost:5500/agri/users/add", newLogin)
        .then((res) => {
          console.log(res.data.status);

          setOpen(false);
          setLoading(false);

          setLoading(false);
          alert("Registration Succesfull");
          navigate("/");
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Passowrds Not Matched!!");
    }
  };

  return (
    <div>
      <ResponsiveAppBarRegister />
      <center>
        <Container sx={{ mt: 15 }}>
          <Paper elevation={7} sx={{ maxWidth: 450 }}>
            <Box sx={{ m: 4 }}>
              <br></br>
              <Typography
                variant="h5"
                component="h5"
                style={{ fontWeight: 700, color: "#686965" }}
              >
                User Registration
              </Typography>
              <br />
              <Typography variant="caption" display="block" gutterBottom>
                Fill the below form to register your account
              </Typography>
              <br />

              <Grid>
                <form
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                  id="form"
                >
                  <Grid item md={6}></Grid>
                  <TextField
                    sx={{ width: 300, minWidth: 180 }}
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    value={username}
                    required
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                  <br />
                  <br />

                  <FormControl sx={{ width: 300, minWidth: 180 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Select User Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={role}
                      label="Age"
                      onChange={handleChangeRole}
                      required
                    >
                      <MenuItem value={"farmer"}>Farmer</MenuItem>
                      <MenuItem value={"customer"}>Customer</MenuItem>
                    </Select>
                  </FormControl>

                  <br />
                  <br />
                  <TextField
                    sx={{ width: 300, minWidth: 180 }}
                    variant="outlined"
                    label="Password"
                    type="password"
                    value={password}
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />

                  <br />
                  <br />
                  <TextField
                    sx={{ width: 300, minWidth: 180 }}
                    variant="outlined"
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    required
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                  <br />
                  <br />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    style={{
                      backgroundColor: "#22b14c",
                      width: "200px",
                    }}
                  >
                    Register
                  </Button>
                  {showText ? (
                    <Typography variant="subtitle1" color="#00e676">
                      Registered
                    </Typography>
                  ) : null}
                  {loading ? <Loader /> : null}
                  <br />
                  <br />
                </form>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </center>
      {/* Dialog */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Alert</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Username exists please Select new One
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Register;
