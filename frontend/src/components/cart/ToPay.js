import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PaidIcon from "@mui/icons-material/Paid";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Button } from "@mui/material";
import { teal } from "@mui/material/colors";
import { bgcolor } from "@mui/system";

export default function ToPay() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [userID, setUserID] = useState("");

  let navigate = useNavigate();

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
  return (
    <List sx={{ width: "100%", minWidth: 700, bgcolor: "#e4eaeb", mt: 3 }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: teal[500], width: 80, height: 80 }}>
            <LocalMallIcon sx={{ width: 50, height: 50 }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          sx={{ ml: 3 }}
          primaryTypographyProps={{ fontSize: 36, fontWeight: "bold" }}
          primary="Total"
          secondaryTypographyProps={{ fontSize: 36, fontWeight: "bold" }}
          secondary={"Rs. " + total.toLocaleString("en-US")}
        />

        <Button
          color="success"
          variant="contained"
          startIcon={<PaidIcon />}
          onClick={() => {
            navigate("/payment");
          }}
        >
          Buy Now
        </Button>
      </ListItem>
    </List>
  );
}
