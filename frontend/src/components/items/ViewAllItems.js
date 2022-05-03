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

function ViewAllItems() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    function getTemplates() {
      axios
        .get("http://localhost:5500/agri/items")
        .then((res) => {
          setItems(res.data);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getTemplates();
  }, []);

  const filterItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* <Container> */}
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={10}
        sx={{ mt: 3, ml: 3 }}
      >
        <Typography variant="h3" component="h3">
          Store Items
        </Typography>
      </Grid>
      {/* </Container> */}
      <center>
        <SearchIcon />
        <TextField
          id="outlined-basic"
          label="Search Your Items Here"
          size="small"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
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
                  alt="Remy Sharp"
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
                  Price : {item.price} LKR
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
