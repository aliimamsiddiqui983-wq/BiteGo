import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Create JWT token
const createToken = (id, isAdmin) => {
  return jwt.sign(
    {
      id,
      isAdmin,
    },
    process.env.JWT_SECRET
  );
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (user.role === "admin") {
      return res.json({
        success: false,
        message: "Please use Admin Login",
      });
    }

    const token = createToken(user._id, false);

    return res.json({
      success: true,
      token,
      isAdmin: false,
    });
  } catch (error) {
    console.log("User login error:", error);

    return res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Admin login
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    if (user.role !== "admin") {
      return res.json({
        success: false,
        message: "You are not an admin",
      });
    }

    const token = createToken(user._id, true);

    return res.json({
      success: true,
      token,
      isAdmin: true,
    });
  } catch (error) {
    console.log("Admin login error:", error);

    return res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    const user = await newUser.save();

    const token = createToken(user._id, false);

    return res.json({
      success: true,
      token,
      isAdmin: false,
    });
  } catch (error) {
    console.log("Register error:", error);

    return res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export {
  loginUser,
  adminLogin,
  registerUser,
};