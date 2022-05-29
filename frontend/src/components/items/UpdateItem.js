import { Button, Container, Grid, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../common/ResponsiveAppBar";

function UpdateItem() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [showText, setShowText] = useState(false);
  const paramID = useParams("");
  let navigate = useNavigate();
  const [currentItem, setCurrentItem] = useState({});

  // const userID = "6270211872d0ce048dd73fb5";

  useEffect(() => {
    axios
      .get("http://localhost:5500/agri/items/get/" + paramID.id)
      .then((res) => {
        setCurrentItem(res.data.item);

        setName(res.data.item.name);
        setDescription(res.data.item.description);
        setPrice(res.data.item.price);
      })

      .catch((err) => {
        console.log(err);
      });
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
      .put("http://localhost:5500/agri/items/update/" + paramID.id, formData)
      .then((res) => {
        console.log(res);
        console.log("Item Updated!!");

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
            <h2>Update Details of an Item</h2>

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
                  erorText="Maximum number of characters enterted"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <br />
                <br />

                <Input
                  type="number"
                  variant="outlined"
                  placeholder="Price"
                  required
                  min={0}
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
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
                  Update Item
                </Button>
                {showText ? (
                  <Typography variant="subtitle1" color="#00e676">
                    Details Updated
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

export default UpdateItem;
