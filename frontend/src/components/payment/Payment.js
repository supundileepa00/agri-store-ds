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
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import PaidIcon from "@mui/icons-material/Paid";

const MobileSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default function Payment() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [cardNo, setCardNo] = useState("");
  const [mobile, setMobile] = useState(false);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [userID, setUserID] = useState("");
  const [label, setLabel] = useState("Pay by Card");

  const navigate = useNavigate();

  const handleSubmit = (e) => {};

  useEffect(() => {
    function getCart() {
      axios
        .get(
          "http://localhost:5500/agri/carts/get/" +
            localStorage.getItem("userID")
        )
        .then((res) => {
          setCart(res.data);
          setTotal(res.data.reduce((total, item) => total + item.price, 0)); //total price}
          setUserID(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getCart(); //getCart();
  }, []);

  const payCard = () => {
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          variant="outlined"
          label="Card Holders Name"
          required
          sx={{ width: 400, mb: 2 }}
        />
        <TextField
          type="number"
          variant="outlined"
          label="Card Number"
          required
          sx={{ width: 400, mb: 2 }}
          value={cardNo}
          onChange={(e) => {
            if (e.target.value < 0) {
              setCardNo(0);
            } else {
              setCardNo(e.target.value);
            }
          }}
        />
        <TextField
          type="text"
          variant="outlined"
          label="Amount"
          disabled
          InputLabelProps={{
            shrink: true,
          }}
          required
          sx={{ width: 400, mb: 2 }}
          value={total.toLocaleString("en-US")}
        />
        <TextField
          type="date"
          variant="outlined"
          required
          sx={{ width: 400, mb: 2 }}
        />
        <TextField
          type="number"
          variant="outlined"
          label="CVC"
          required
          sx={{ width: 400, mb: 2 }}
        />
        <Button
          sx={{ p: 1.5, m: 3 }}
          color="success"
          variant="contained"
          startIcon={<PaidIcon />}
          onClick={() => {
            navigate("/allItems");
          }}
        >
          Pay Now
        </Button>
      </form>
    );
  };

  const payMobile = () => {
    return (
      <form onSubmit={handleSubmit}>
                <TextField
                  type="number"
                  variant="outlined"
                  label="Mobile Number"
                  required
                  sx={{ width: 400, mb: 2 }}
                  value={cardNo}
                  onChange={(e) => {
                    if (e.target.value < 0) {
                      setCardNo(0);
                    } else {
                      setCardNo(e.target.value);
                    }
                  }}
                />
                <TextField
                  type="text"
                  variant="outlined"
                  label="Amount"
                  disabled
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  sx={{ width: 400, mb: 2 }}
                  value={total.toLocaleString("en-US")}
                />

                <TextField
                  type="number"
                  variant="outlined"
                  label="Pin"
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 6);
                  }}
                  required
                  sx={{ width: 400, mb: 2 }}
                />
                <Button
                  sx={{ p: 1.5, m: 3 }}
                  color="success"
                  variant="contained"
                  startIcon={<PaidIcon />}
                  onClick={() => {
                    navigate("/allItems");
                  }}
                >
                  Pay Now
                </Button>
              </form>
    )
  };

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
              <FormGroup>
                <FormControlLabel
                  id="phone"
                  control={
                    <MobileSwitch
                      sx={{ m: 1 }}
                      defaultUnchecked
                      onChange={(e) => {
                        setMobile(e.target.checked);
                        if(e.target.checked){
                          setLabel("Pay by Mobile");
                        }else{
                          setLabel("Pay by Card");
                        }
                        console.log(mobile);
                      }}
                    />
                  }
                  label={label}
                />
                {/* <FormControlLabel
                  id="card"
                  control={<MobileSwitch sx={{ m: 1 }} defaultChecked />}
                  label="Pay by Card"
                /> */}
              </FormGroup>
              <br />
              {mobile ? payMobile() : payCard()}

              <Grid></Grid>
            </Box>
          </Paper>
        </Container>
      </center>
    </div>
  );
}
