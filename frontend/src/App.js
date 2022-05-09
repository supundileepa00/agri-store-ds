import logo from "./logo.svg";
import "./App.css";
import ResponsiveAppBar from "./components/common/ResponsiveAppBar";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import AddItem from "./components/items/AddItems";
import ViewAllItems from "./components/items/ViewAllItems";
import ViewItems_Farmers from "./components/items/ViewItems_Farmers";
import UpdateItem from "./components/items/UpdateItem";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/common/footer/Footer";
import NotFoundPage from "./components/NotFoundPage";
import Payment from "./components/payment/Payment";
import Cart from "./components/cart/Cart";
import CustomizedTables from "./components/cart/Table";

function App() {
  return (
    <div className="app">
      <style>{"body { background-color: #f1f3f0; }"}</style>

      <BrowserRouter>
        {/* routes */}
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route path="/farmer/addItem" element={<AddItem />}></Route>
          <Route path="/allItems" element={<ViewAllItems />}></Route>
          <Route path="/farmer/items" element={<ViewItems_Farmers />}></Route>

          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/table" element={<CustomizedTables />}></Route>

          <Route
            path="/farmer/items/update/:id"
            element={<UpdateItem />}
          ></Route>

          <Route path="/notFound" element={<NotFoundPage />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
