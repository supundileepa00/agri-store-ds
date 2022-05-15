import { Button, Container, Grid, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../common/ResponsiveAppBar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function AddItem() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [showText, setShowText] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
    } else {
      navigate("/notFound");
    }
  }, []);

  const handleSubmit = (e) => {
    setShowText(false);
    setLoading(true);
    const formData = new FormData();
    var form = document.getElementById("form");

    formData.append("userID", localStorage.getItem("userID"));
    formData.append("name", name);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("price", price);

    console.log(formData);
    e.preventDefault();

    axios
      .post("http://localhost:5500/agri/items/add/", formData)
      .then((res) => {
        console.log(res);
        console.log("Item Added!!");

        setName("");
        setDescription("");
        setPrice("");
        setImage("");
        form.reset();
        setLoading(false);
        setShowText(true);

        navigate("/farmer/items");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <ResponsiveAppBar />

      <Container>
        <Paper elevation={7} sx={{ mt: 20 }}>
          <Box sx={{ m: 5 }}>
            <br></br>
            <IconButton
              color="warning"
              aria-label="upload picture"
              component="span"
              size="large"
              onClick={() => {
                navigate("/farmer/items");
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <h2>Add Item for Store</h2>

            <Grid>
              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                id="form"
              >
                <Grid item md={6}>
                  <br />
                </Grid>
                <TextField
                  id="outlined-basic"
                  label="Item Name"
                  variant="outlined"
                  value={name}
                  required
                  fullWidth
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <br />
                <br />
                <TextField
                  variant="outlined"
                  label="Description"
                  value={description}
                  required
                  multiline
                  inputProps={{ maxLength: 100 }}
                  erortext="Maximum number of characters enterted"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <br />
                <br />

                <TextField
                  type="number"
                  variant="outlined"
                  label="Price"
                  value={price}
                  required
                  onChange={(e) => {
                    if (e.target.value < 0) {
                      setPrice(0);
                    } else {
                      setPrice(e.target.value);
                    }
                  }}
                />
                <br />
                <br />
                <Input
                  id="raised-button-file"
                  type="file"
                  color="primary"
                  required
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
                <br />
                <br />

                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  style={{
                    backgroundColor: "#22b14c",
                  }}
                >
                  Add Item
                </Button>
                {showText ? (
                  <Typography variant="subtitle1" color="#00e676">
                    Details Added
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
    </div>
  );
}

export default AddItem;
