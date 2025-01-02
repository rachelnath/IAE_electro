import Category from "../models/category.js";

export const ShowCategory = async (req, res) => {
  try {
    const response = await Category.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.json({ msg: Error });
  }
};
