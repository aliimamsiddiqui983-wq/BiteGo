import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const {
    getTotalCartAmount,
    token,
    url,
    food_list,
    cartItems,
    setCartItems,
    buttonRef,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id]) {
        const itemInfo = {
          ...item,
          quantity: cartItems[item._id],
        };

        orderItems.push(itemInfo);
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 99,
      paymentMethod,
    };

    try {
      const response = await axios.post(
        url + "/api/order/place",
        orderData,
        {
          headers: { token },
        }
      );

      if (!response.data.success) {
        alert(response.data.message || "Error");
        return;
      }

      // COD
      if (paymentMethod === "cod") {
  setCartItems({});
  
  alert("Order placed successfully!");
  
  navigate("/myorders");
  return;
}

      // Cashfree
      const cashfree = window.Cashfree({
        mode: "sandbox",
      });

      cashfree.checkout({
        paymentSessionId: response.data.payment_session_id,
        redirectTarget: "_self",
      });
    } catch (error) {
      console.log("Order Error:", error);
      console.log("Server Response:", error.response?.data);

      alert(
        error.response?.data?.message ||
          "Something went wrong while placing the order"
      );
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");

      setTimeout(() => {
        if (buttonRef?.current) {
          buttonRef.current.click();
        }
      }, 100);
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, getTotalCartAmount, navigate, buttonRef]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input
            required
            onChange={onChangeHandler}
            value={data.firstName}
            name="firstName"
            type="text"
            placeholder="First Name"
          />

          <input
            required
            onChange={onChangeHandler}
            value={data.lastName}
            name="lastName"
            type="text"
            placeholder="Last Name"
          />
        </div>

        <input
          required
          onChange={onChangeHandler}
          value={data.email}
          name="email"
          type="email"
          placeholder="Email address"
        />

        <input
          required
          onChange={onChangeHandler}
          value={data.street}
          name="street"
          type="text"
          placeholder="Street"
        />

        <div className="multi-fields">
          <input
            required
            onChange={onChangeHandler}
            value={data.city}
            name="city"
            type="text"
            placeholder="City"
          />

          <input
            required
            onChange={onChangeHandler}
            value={data.state}
            name="state"
            type="text"
            placeholder="State"
          />
        </div>

        <div className="multi-fields">
          <input
            required
            onChange={onChangeHandler}
            value={data.pincode}
            name="pincode"
            type="text"
            placeholder="Pin Code"
          />

          <input
            required
            onChange={onChangeHandler}
            value={data.country}
            name="country"
            type="text"
            placeholder="Country"
          />
        </div>

        <input
          required
          onChange={onChangeHandler}
          value={data.phone}
          name="phone"
          type="text"
          placeholder="Phone"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>

          <hr />

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{getTotalCartAmount() === 0 ? 0 : 99}</p>
          </div>

          <hr />

          <div className="cart-total-details total">
            <b>Total</b>

            <b>
              ₹
              {getTotalCartAmount() === 0
                ? 0
                : getTotalCartAmount() + 99}
            </b>
          </div>

          <div className="payment-method">
            <h3>Payment Method</h3>

            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />
              <span>COD (Cash on delivery)</span>
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="cashfree"
                checked={paymentMethod === "cashfree"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />
              <span>Cashfree (Credit / Debit / UPI)</span>
            </label>
          </div>

          <button type="submit">Place Order</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;