import { Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ResponsiveAppBar from "../common/ResponsiveAppBar";
import ResponsiveAppBarNew from "../common/ResponsiveAppBarNew";

import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ViewAllItems() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  let navigate = useNavigate();

  const [badge, setBadge] = useState(0);

  //user id -- taken from localStorage
  //use this for adding items to cart
  const [userID, setUserID] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      function getItems() {
        setUserID(localStorage.getItem("userID"));
        axios
          .get("http://localhost:5500/agri/items")
          .then((res) => {
            setItems(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      getItems();
    } else {
      navigate("/notFound");
    }
  }, []);

  useEffect(() => {
    function getCart() {
      axios
        .get(
          "http://localhost:5500/agri/carts/get/" +
            localStorage.getItem("userID")
        )
        .then((res) => {
          setBadge(res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getCart();
  }, []);

  const filterItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const addItemToCart = (item) => {
    let userID = localStorage.getItem("userID");
    let name = item.name;
    let description = item.description;
    let price = Number(item.price);
    let itemID = item._id;
    let image = item.image;

    const cartItem = {
      userID,
      name,
      description,
      price,
      itemID,
      image,
    };

    console.log(cartItem);

    axios
      .post("http://localhost:5500/agri/carts/add", cartItem)
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "Success",
          text: "Item Added to Cart!!",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .get(
                "http://localhost:5500/agri/carts/get/" +
                  localStorage.getItem("userID")
              )
              .then((res) => {
                setBadge(res.data.length);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {/* <Container> */}

      {/* <ResponsiveAppBar  /> */}

      <ResponsiveAppBarNew badge={badge} />

      <center>
        <Typography
          variant="h4"
          component="h3"
          style={{ fontWeight: 700, color: "#686965" }}
          sx={{ mt: 10 }}
        >
          All Items
        </Typography>
      </center>

      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={10}
        sx={{ mt: 4, ml: 3 }}
      ></Grid>
      {/* </Container> */}
      <center>
        <div>
          <TextField
            id="outlined-basic"
            label="Search Items Here"
            size="small"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <SearchIcon sx={{ mt: 1 }} />
        </div>
      </center>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={10}
        sx={{ mt: 3, p: 2, ml: 3 }}
      >
        {filterItems.map((item, key) => (
          <Card
            sx={{ width: 300, height: 420, mx: 2, my: 3 }}
            key={key}
            style={{ backgroundColor: "#ffff" }}
            elevation={3}
          >
            <br />
            <CardActionArea>
              <center>
                <Avatar
                  alt="Item Image"
                  src={item.image}
                  sx={{ width: 170, height: 170 }}
                />
              </center>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ fontWeight: 500, color: "#A3A3A3" }}
                >
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  style={{ fontWeight: 700, color: "#686965" }}
                >
                  Price : Rs. {parseInt(item.price).toLocaleString("en-US")}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                variant="outlined"
                startIcon={<AddShoppingCartIcon />}
                style={{
                  color: "#22b14c",
                }}
                onClick={() => {
                  addItemToCart(item);
                }}
              >
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        ))}
      </Grid>
    </div>
  );
}

export default ViewAllItems;
