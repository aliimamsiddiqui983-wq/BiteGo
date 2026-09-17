import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");

  const { url, setCartItems } = useContext(StoreContext);

  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!orderId) {
          navigate("/cart");
          return;
        }

        const response = await axios.post(
          url + "/api/order/verify",
          {
            orderId,
          }
        );

        console.log("Verify response:", response.data);

        if (response.data.success) {
          // Clear frontend cart
          setCartItems({});

          navigate("/myorders");
        } else {
          navigate("/cart");
        }
      } catch (error) {
        console.log(
          "Verify error:",
          error.response?.data || error.message
        );

        navigate("/cart");
      }
    };

    verifyPayment();
  }, [orderId, url, navigate, setCartItems]);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;