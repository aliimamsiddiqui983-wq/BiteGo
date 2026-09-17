import Navbar from "./components/Navbar/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import FloatingCartButton from "./components/FloatingCartButton/FloatingCartButton";
import AdminLogin from "./pages/AdminLogin/AdminLogin";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  const isAdminLoginPage = location.pathname === "/admin-login";

  return (
    <>
      {showLogin && !isAdminLoginPage && (
        <LoginPopup setShowLogin={setShowLogin} />
      )}

      <div className="app">
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>

      <Footer />
      <FloatingCartButton />
    </>
  );
};

export default App;