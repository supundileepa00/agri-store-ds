import { Button, Container, Grid, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import Input from "@mui/material/Input";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ResponsiveAppBar from "../common/ResponsiveAppBar";

function Payment() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [cardNo, setCardNo] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {};

  return (
    <div>
      <ResponsiveAppBar />
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
                Payment
              </Typography>
              <br />
              <Typography variant="caption" display="block" gutterBottom>
                Please enter your payment details
              </Typography>
              <br />
              <form onSubmit={handleSubmit}>
                <TextField
                  type="number"
                  variant="outlined"
                  label="Card Number"
                  required
                  sx={{ width: 400 }}
                  value={cardNo}
                  onChange={(e) => {
                    if (e.target.value < 0) {
                      setCardNo(0);
                    } else {
                      setCardNo(e.target.value);
                    }
                  }}
                />
              </form>

              <Grid></Grid>
            </Box>
          </Paper>
        </Container>
      </center>
    </div>
  );
}

export default Payment;
