import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import ResponsiveAppBarLogin from "./common/ResponsiveAppBarLogin";

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div>
      <ResponsiveAppBarLogin />
      <Container sx={{ mt: 20 }}>
        <center>
          <Typography
            variant="h1"
            gutterBottom
            component="div"
            style={{
              color: "#A4A4A4",
            }}
          >
            404
          </Typography>
          <Typography
            variant="h3"
            gutterBottom
            component="div"
            style={{
              color: "#A4A4A4",
            }}
          >
            Not Found !
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            component="div"
            style={{
              color: "#A4A4A4",
            }}
          >
            Please login to the system.
          </Typography>

          <br />
          <br />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, width: 200 }}
            style={{
              backgroundColor: "#22b14c",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            GO to Login
          </Button>
          <br />
          <br />
          <br />
        </center>
      </Container>
    </div>
  );
}

export default NotFoundPage;
