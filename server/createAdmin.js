import mongoose from "mongoose";
import bcrypt from "bcrypt";
import "dotenv/config";
import userModel from "./models/userModel.js";

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    // Hash admin password
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    // Find existing admin
    const existingAdmin = await userModel.findOne({
      email: "admin@bitego.com",
    });

    if (existingAdmin) {
      // Update existing user as admin
      existingAdmin.role = "admin";
      existingAdmin.password = hashedPassword;

      await existingAdmin.save();

      console.log("Admin updated successfully");
    } else {
      // Create new admin
      const admin = new userModel({
        name: "Admin",
        email: "admin@bitego.com",
        password: hashedPassword,
        role: "admin",
      });

      await admin.save();

      console.log("Admin created successfully");
    }

    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (error) {
    console.log("Error creating admin:", error);
  }
};

createAdmin();