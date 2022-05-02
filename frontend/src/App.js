import logo from "./logo.svg";
import "./App.css";
import ResponsiveAppBar from "./components/common/ResponsiveAppBar";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import AddItem from "./components/items/AddItems";
import ViewAllItems from "./components/items/ViewAllItems";
import ViewItems_Farmers from "./components/items/ViewItems_Farmers";
import UpdateItem from "./components/items/UpdateItem";

function App() {
  return (
    <div className="app">
      <style>{"body { background-color: #f1f3f0; }"}</style>
      <ResponsiveAppBar />

      <BrowserRouter>
        {/* routes */}
        <Routes>
          <Route path="/farmer/addItem" element={<AddItem />}></Route>
          <Route path="/allItems" element={<ViewAllItems />}></Route>
          <Route path="/farmer/items" element={<ViewItems_Farmers />}></Route>

          <Route
            path="/farmer/items/update/:id"
            element={<UpdateItem />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
