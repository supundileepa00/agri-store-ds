import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Grid } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ResponsiveAppBarNew from "../common/ResponsiveAppBarNew";

function ViewItems_Farmers() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [itemID, setItemID] = useState("");
  const [userID, setUserID] = useState("");
  const [badge, setBadge] = useState(0);

  let navigate = useNavigate();

  const handleClickOpen = (id) => {
    setOpen(true);
    setItemID(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteTemplate = (id) => {
    setOpen(false);
    axios.delete("http://localhost:5500/agri/items/delete/" + id).then(() => {
      window.location.reload(false);
    });
  };
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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      function getItems() {
        axios
          .get(
            "http://localhost:5500/agri/items/getUserItems/" +
              localStorage.getItem("userID")
          )
          .then((res) => {
            setItems(res.data.items);
            setUserID(localStorage.getItem("userID"));
            console.log(userID);
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

  const filterItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <ResponsiveAppBarNew badge={badge} />
      {/* <Container> */}
      <center>
        <Typography
          variant="h4"
          component="h3"
          sx={{ mt: 13 }}
          style={{ fontWeight: 600, color: "#686965" }}
        >
          Farmer's Home Page
        </Typography>
      </center>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={10}
        sx={{ mt: 2, ml: 3 }}
      ></Grid>
      {/* </Container> */}
      <center>
        <TextField
          id="outlined-basic"
          label="Search Your Items Here"
          size="small"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <SearchIcon sx={{ mt: 1 }} />
      </center>
      <Button
        variant="outlined"
        sx={{ ml: 8, mt: 4 }}
        endIcon={<AddBoxIcon />}
        onClick={() => {
          navigate("/farmer/addItem");
        }}
      >
        Add Item To Store
      </Button>

      <Button
        variant="outlined"
        sx={{ ml: 8, mt: 4 }}
        endIcon={<ListAltIcon />}
        onClick={() => {
          navigate("/allItems");
        }}
      >
        View All Items in the Store
      </Button>
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
            sx={{ width: 300, height: 430, mx: 2, my: 3 }}
            key={key}
            style={{ backgroundColor: "#ffff" }}
            elevation={3}
          >
            <br />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-end"
              spacing={2}
              sx={{ mx: 2 }}
            >
              <Link to={"update/" + item._id}>
                <IconButton aria-label="edit" color="warning">
                  <EditIcon />
                </IconButton>
              </Link>

              <IconButton
                aria-label="delete"
                color="error"
                onClick={() => {
                  handleClickOpen(item._id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>

            <CardActionArea>
              <center>
                <Avatar
                  alt="Item Image"
                  src={item.image}
                  sx={{ width: 130, height: 110 }}
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
                  Date :{item.postedDate}
                </Typography>
                <br />
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
            {/* <CardActions>
              <Button
                variant="outlined"
                startIcon={<AddShoppingCartIcon />}
                style={{
                  color: "#22b14c",
                }}
              >
                Add to Cart
              </Button>
            </CardActions> */}
          </Card>
        ))}
      </Grid>

      {/* Delete Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Alert</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this Item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button
            onClick={() => {
              deleteTemplate(itemID);
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ViewItems_Farmers;
