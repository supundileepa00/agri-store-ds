import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#e4eaeb",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export default function CustomizedTables() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [userID, setUserID] = useState("");

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

  const deleteItem = (itemID) => {
    axios
      .delete("http://localhost:5500/agri/carts/delete/item/" + itemID)
      .then((res) => {
        Swal.fire({
          title: "Success",
          text: "Item Deleted",
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload(false);
          }
        });
        console.log(res);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Image</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((row) => (
            <StyledTableRow>
              <StyledTableCell component="th" scope="row" sx={{ maxWidth: 30 }}>
                <Avatar
                  alt="Item Image"
                  src={row.image}
                  sx={{ width: 100, height: 100 }}
                />
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ maxWidth: 30 }}>
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="justify" sx={{ maxWidth: 100 }}>
                {row.description}
              </StyledTableCell>
              <StyledTableCell align="right">Rs. {row.price}</StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  color="error"
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    deleteItem(row._id);
                  }}
                >
                  Remove Item
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
