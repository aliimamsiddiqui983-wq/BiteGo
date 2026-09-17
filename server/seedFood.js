import "dotenv/config";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import axios from "axios";

import foodModel from "./models/foodModel.js";
import { ConnectDB } from "./config/db.js";

const foodData = {
  Salad: [
    ["Classic Green Salad", "Fresh vegetables with a healthy dressing", 99],
    ["Greek Salad", "Cucumber, tomato, onion and olives", 149],
    ["Caesar Salad", "Crispy lettuce with creamy Caesar dressing", 179],
    ["Chicken Salad", "High protein chicken with fresh vegetables", 199],
    ["Paneer Salad", "Fresh paneer with colorful vegetables", 189],
    ["Corn Salad", "Sweet corn with fresh vegetables", 129],
    ["Fruit Salad", "Fresh seasonal fruits", 149],
    ["Avocado Salad", "Healthy avocado with fresh vegetables", 219],
    ["Sprout Salad", "Protein-rich sprouts with vegetables", 119],
    ["Italian Salad", "Italian style fresh vegetable salad", 159],
    ["Mexican Salad", "Spicy Mexican style vegetable salad", 169],
    ["Tandoori Chicken Salad", "Grilled tandoori chicken with salad", 229],
    ["Protein Salad", "High protein healthy salad", 239],
    ["Cucumber Salad", "Fresh cucumber with herbs and dressing", 89],
    ["Garden Salad", "Fresh garden vegetables and herbs", 109],
  ],

  Rolls: [
    ["Veg Roll", "Fresh vegetables wrapped in soft roti", 89],
    ["Paneer Roll", "Spicy paneer wrapped with vegetables", 129],
    ["Chicken Roll", "Juicy chicken with onions and sauces", 149],
    ["Egg Roll", "Egg wrapped with onions and spices", 109],
    ["Cheese Roll", "Cheesy roll with fresh vegetables", 119],
    ["Tandoori Roll", "Tandoori filling with spicy sauce", 159],
    ["Mushroom Roll", "Fresh mushroom and vegetable filling", 129],
    ["Peri Peri Chicken Roll", "Spicy peri peri chicken roll", 179],
    ["Aloo Roll", "Spiced potato filling in soft roti", 79],
    ["Corn Cheese Roll", "Sweet corn with melted cheese", 129],
    ["Malai Paneer Roll", "Creamy malai paneer filling", 149],
    ["Double Chicken Roll", "Double chicken filling with sauces", 199],
    ["Schezwan Roll", "Spicy Schezwan vegetable roll", 119],
    ["BBQ Chicken Roll", "BBQ chicken with fresh vegetables", 169],
    ["Veg Cheese Roll", "Vegetables with melted cheese", 119],
  ],

  Deserts: [
    ["Chocolate Brownie", "Warm chocolate brownie", 129],
    ["Gulab Jamun", "Soft gulab jamun served warm", 89],
    ["Rasmalai", "Soft cottage cheese dumplings in milk", 119],
    ["Chocolate Mousse", "Creamy chocolate mousse", 149],
    ["Ice Cream Sundae", "Ice cream with chocolate toppings", 159],
    ["Fruit Custard", "Fresh fruits with creamy custard", 109],
    ["Cheesecake", "Creamy classic cheesecake", 179],
    ["Chocolate Cake", "Rich chocolate cake slice", 139],
    ["Brownie With Ice Cream", "Warm brownie with vanilla ice cream", 189],
    ["Kheer", "Traditional creamy rice pudding", 99],
    ["Caramel Pudding", "Soft caramel pudding", 119],
    ["Chocolate Lava Cake", "Warm cake with molten chocolate", 199],
    ["Vanilla Ice Cream", "Classic creamy vanilla ice cream", 79],
    ["Strawberry Cream", "Fresh strawberries with cream", 129],
    ["Oreo Dessert", "Creamy Oreo based dessert", 149],
  ],

  Sandwich: [
    ["Veg Sandwich", "Fresh vegetables with creamy spread", 89],
    ["Grilled Sandwich", "Grilled bread with vegetable filling", 109],
    ["Cheese Sandwich", "Melted cheese with fresh vegetables", 129],
    ["Chicken Sandwich", "Grilled chicken with fresh vegetables", 159],
    ["Club Sandwich", "Triple layered sandwich with vegetables", 189],
    ["Paneer Sandwich", "Spicy paneer sandwich", 139],
    ["Corn Sandwich", "Sweet corn and cheese sandwich", 119],
    ["Tandoori Sandwich", "Tandoori filling with spicy sauce", 149],
    ["Peri Peri Sandwich", "Spicy peri peri sandwich", 139],
    ["Egg Sandwich", "Egg and vegetable sandwich", 109],
    ["Mushroom Sandwich", "Fresh mushroom and cheese", 129],
    ["BBQ Chicken Sandwich", "BBQ chicken with fresh vegetables", 179],
    ["Cheese Grill Sandwich", "Extra cheesy grilled sandwich", 149],
    ["Mexican Sandwich", "Mexican style spicy sandwich", 139],
    ["Double Cheese Sandwich", "Loaded with double cheese", 169],
  ],

  Cake: [
    ["Chocolate Cake", "Rich chocolate cake", 399],
    ["Vanilla Cake", "Soft vanilla cream cake", 349],
    ["Red Velvet Cake", "Classic red velvet cake", 499],
    ["Black Forest Cake", "Chocolate cake with cherries", 449],
    ["Butterscotch Cake", "Creamy butterscotch cake", 449],
    ["Pineapple Cake", "Fresh pineapple cream cake", 399],
    ["Strawberry Cake", "Fresh strawberry cream cake", 449],
    ["Mango Cake", "Fresh mango flavored cake", 449],
    ["Oreo Cake", "Chocolate Oreo cream cake", 499],
    ["KitKat Cake", "Chocolate cake with KitKat", 549],
    ["Ferrero Rocher Cake", "Premium chocolate cake", 599],
    ["Coffee Cake", "Coffee flavored cream cake", 449],
    ["Choco Truffle Cake", "Rich chocolate truffle cake", 499],
    ["Fruit Cake", "Fresh fruit cream cake", 449],
    ["Premium Chocolate Cake", "Premium dark chocolate cake", 649],
  ],

  "Pure Veg": [
    ["Paneer Tikka", "Grilled paneer with spices", 199],
    ["Veg Biryani", "Aromatic rice with vegetables", 179],
    ["Dal Makhani", "Creamy black lentils", 159],
    ["Shahi Paneer", "Paneer in rich creamy gravy", 199],
    ["Kadai Paneer", "Paneer with capsicum and spices", 189],
    ["Chole Bhature", "Spicy chickpeas with bhature", 149],
    ["Rajma Rice", "Rajma served with steamed rice", 139],
    ["Veg Manchurian", "Crispy vegetable balls in sauce", 169],
    ["Mix Veg", "Fresh mixed vegetables", 159],
    ["Palak Paneer", "Paneer cooked with spinach", 189],
    ["Aloo Gobi", "Potato and cauliflower curry", 139],
    ["Malai Kofta", "Kofta in creamy gravy", 199],
    ["Veg Pulao", "Aromatic vegetable rice", 129],
    ["Matar Paneer", "Paneer with green peas", 179],
    ["Paneer Butter Masala", "Paneer in buttery tomato gravy", 209],
  ],

  Pasta: [
    ["White Sauce Pasta", "Creamy Italian white sauce pasta", 179],
    ["Red Sauce Pasta", "Pasta with rich tomato sauce", 169],
    ["Pink Sauce Pasta", "Creamy tomato and cheese sauce", 189],
    ["Pesto Pasta", "Pasta with fresh basil pesto", 219],
    ["Arrabbiata Pasta", "Spicy Italian tomato pasta", 179],
    ["Cheese Pasta", "Loaded cheese pasta", 199],
    ["Chicken Pasta", "Pasta with juicy chicken", 229],
    ["Chicken Alfredo", "Creamy Alfredo pasta with chicken", 249],
    ["Veg Alfredo", "Creamy Alfredo pasta with vegetables", 199],
    ["Mushroom Pasta", "Creamy mushroom pasta", 209],
    ["Peri Peri Pasta", "Spicy peri peri pasta", 199],
    ["Tandoori Pasta", "Indian style tandoori pasta", 219],
    ["Corn Pasta", "Sweet corn and creamy pasta", 189],
    ["Cheesy Arrabbiata", "Spicy tomato pasta with cheese", 209],
    ["Premium Pasta", "Loaded premium Italian pasta", 269],
  ],

  Noodles: [
    ["Veg Hakka Noodles", "Classic vegetable Hakka noodles", 129],
    ["Chicken Hakka Noodles", "Hakka noodles with chicken", 179],
    ["Schezwan Noodles", "Spicy Schezwan noodles", 149],
    ["Chilli Garlic Noodles", "Garlic noodles with chilli", 139],
    ["Paneer Noodles", "Noodles with spicy paneer", 169],
    ["Egg Noodles", "Noodles with scrambled egg", 149],
    ["Singapore Noodles", "Singapore style noodles", 179],
    ["Manchurian Noodles", "Noodles with Manchurian", 189],
    ["Peri Peri Noodles", "Spicy peri peri noodles", 159],
    ["Mushroom Noodles", "Noodles with fresh mushrooms", 159],
    ["Chicken Schezwan Noodles", "Chicken with spicy Schezwan sauce", 199],
    ["Triple Schezwan Noodles", "Loaded triple Schezwan noodles", 229],
    ["Cheese Noodles", "Creamy cheesy noodles", 179],
    ["Garlic Chicken Noodles", "Chicken noodles with garlic", 199],
    ["Special Mix Noodles", "Loaded noodles with mixed ingredients", 219],
  ],
};

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;


// Download image from Pexels
const downloadFoodImage = async (foodName) => {
  try {
    console.log(`🔍 Searching image for: ${foodName}`);

    const response = await axios.get(
      "https://api.pexels.com/v1/search",
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
        params: {
          query: `${foodName} food`,
          per_page: 1,
          orientation: "square",
        },
      }
    );

    const photos = response.data.photos;

    if (!photos || photos.length === 0) {
      console.log(`❌ No image found for: ${foodName}`);
      return null;
    }

    const photo = photos[0];

    const safeName = foodName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const fileName = `${safeName}.jpg`;

    const uploadPath = path.join("uploads", fileName);

    const imageResponse = await axios.get(photo.src.large, {
      responseType: "arraybuffer",
    });

    fs.writeFileSync(uploadPath, imageResponse.data);

    console.log(`✅ Image downloaded: ${fileName}`);

    return fileName;

  } catch (error) {
    console.log(
      `❌ Error downloading image for ${foodName}:`,
      error.response?.data || error.message
    );

    return null;
  }
};


// Seed food
const seedFood = async () => {

  try {

    // Check API key
    if (!PEXELS_API_KEY) {
      console.log("❌ PEXELS_API_KEY is missing in .env");
      process.exit(1);
    }

    // Connect MongoDB
    await ConnectDB();

    // Delete old food data
    await foodModel.deleteMany({});

    const foods = [];

    let testCount = 0;

    // TEST MODE
    // We will download only 3 images first
    const TEST_MODE = false;

    for (const category in foodData) {

      for (const item of foodData[category]) {

        // Stop after 3 foods during testing
        if (TEST_MODE && testCount >= 3) {
          break;
        }

        const name = item[0];
        const description = item[1];
        const price = item[2];

        // Download image automatically
        const image = await downloadFoodImage(name);

        if (!image) {
          console.log(`⚠️ Skipping ${name}`);
          continue;
        }

        foods.push({
          name: name,
          description: description,
          price: price,
          category: category,
          image: image,
        });

        testCount++;

        // Small delay to avoid sending requests too quickly
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      if (TEST_MODE && testCount >= 3) {
        break;
      }
    }

    // Insert food into MongoDB
    if (foods.length > 0) {
      await foodModel.insertMany(foods);
    }

    console.log("");
    console.log(`✅ ${foods.length} food items added successfully!`);

    console.log(
      "📁 Images saved inside:",
      path.resolve("uploads")
    );

    process.exit(0);

  } catch (error) {

    console.error("❌ Error seeding food:", error);

    process.exit(1);
  }
};


seedFood();