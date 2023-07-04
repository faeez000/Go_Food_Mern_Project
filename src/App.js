import "./App.css";
import Home from "./Screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Screens/Login";
import SignUp from "./Screens/SignUp";
import Cart from "./Screens/Cart";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js//bootstrap.bundle.min";
import { CartProvider } from "./Components/ContextReducer";

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signUp" element={<SignUp />} />
            {/* <Route exact path="/cart" element={<Cart />} /> */}
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
