import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { Cashfree, CFEnvironment } from "cashfree-pg";

const cashfree = new Cashfree(
  CFEnvironment.SANDBOX,
  process.env.CASHFREE_CLIENT_ID,
  process.env.CASHFREE_CLIENT_SECRET
);

// placing user order from frontend
const placeOrder = async (req, res) => {

  const frontend_url = process.env.FRONTEND_URL;

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address
    });

    await newOrder.save();

    // await userModel.findByIdAndUpdate(
    //   req.body.userId,
    //   { cartData: {} }
    // );

    const cashfreeOrderId = `BITEGO_${newOrder._id}`;

    const request = {
      order_amount: Number(req.body.amount),
      order_currency: "INR",

      order_id: cashfreeOrderId,

      customer_details: {
        customer_id: String(req.body.userId),
        customer_name: `${req.body.address.firstName} ${req.body.address.lastName}`,
        customer_email: req.body.address.email,
        customer_phone: req.body.address.phone
      },

      order_meta: {
  return_url: `${frontend_url}/verify?orderId=${newOrder._id}&cashfreeOrderId={order_id}`
}
    };

    const response = await cashfree.PGCreateOrder(request);

    console.log("Cashfree order created:", response.data);

    res.json({
      success: true,
      payment_session_id: response.data.payment_session_id,
      order_id: newOrder._id
    });

  } catch (error) {

    console.log("Cashfree Error:", error.response?.data || error.message);

    res.json({
      success: false,
      message: "Error creating payment"
    });
  }
};


const verifyOrder = async (req, res) => {
  const { orderId } = req.body;

  try {
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    // Cashfree order ID
    const cashfreeOrderId = `BITEGO_${order._id}`;

    const response = await cashfree.PGFetchOrder(cashfreeOrderId);

    console.log("Cashfree order status:", response.data);

    if (response.data.order_status === "PAID") {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
      });

      // Clear MongoDB cart after successful payment
      await userModel.findByIdAndUpdate(order.userId, {
        cartData: {},
      });

      return res.json({
        success: true,
        message: "Payment successful",
      });
    }

    return res.json({
      success: false,
      message: "Payment not completed",
    });

  } catch (error) {
    console.log(
      "Cashfree verification error:",
      error.response?.data || error.message
    );

    return res.json({
      success: false,
      message: "Payment verification failed",
    });
  }
};


// user orders for frontend
const userOrders = async (req, res) => {

  try {

    const orders = await orderModel.find({
      userId: req.body.userId
    });

    res.json({
      success: true,
      data: orders
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: "Error"
    });
  }
};


// listing order for admin panel
const listOrders = async (req, res) => {

  try {

    const orders = await orderModel.find({});

    res.json({
      success: true,
      data: orders
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: "Error"
    });
  }
};


// api for updating order status
const updateStatus = async (req, res) => {

  try {

    await orderModel.findByIdAndUpdate(
      req.body.orderId,
      { status: req.body.status }
    );

    res.json({
      success: true,
      message: "Status Updated"
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: "Error"
    });
  }
};


export {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus
};