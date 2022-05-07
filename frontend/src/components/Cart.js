import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    function getCart() {
      setUserID(localStorage.getItem("userID"));
      axios
        .get("http://localhost:5500/agri/cart/" + userID)
        .then((res) => {
          setCart(res.data);
          setTotal(res.data.reduce((total, item) => total + item.price, 0)); //total price}
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getCart(); //getCart();
  }, []); //useEffect

    const deleteCart = (id) => {
        axios.delete("http://localhost:5500/agri/cart/delete/" + id).then(() => {
            window.location.reload(false);
            Swal.fire({
                title: "Success",
                text: "Proceed to Payment",
                icon: "success",
                confirmButtonText: "OK",
            });
        }
        ); 
    }
} //Cart

export default Cart;
