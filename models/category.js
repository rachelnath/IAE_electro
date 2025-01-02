import { Sequelize } from "sequelize";
import db from "../config/config.js";

const { DataTypes } = Sequelize;

const Category = db.define(
  "categories",
  {
    category_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    category_name: DataTypes.STRING(30),
  },
  { freezeTableName: true }
);

// Function to create default categories
const createDefaultCategories = async () => {
  const defaultCategories = [
    { category_name: "Laptop" },
    { category_name: "Handphone" },
    { category_name: "Accessories" },
  ];

  try {
    // Check if categories already exist
    const count = await Category.count();
    if (count === 0) {
      await Category.bulkCreate(defaultCategories);
      console.log("Default categories created successfully.");
    } else {
      console.log("Categories already exist, skipping creation.");
    }
  } catch (error) {
    console.error("Error creating default categories:", error);
  }
};

// Sync the database and create default categories
const syncDatabase = async () => {
  try {
    await db.sync();
    console.log("Database synchronized successfully.");
    await createDefaultCategories(); // Call the function to create default categories
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};

syncDatabase(); // Call the function to sync the database and create default categories

export default Category;
