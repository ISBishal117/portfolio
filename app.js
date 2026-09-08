const dns = require("dns");
dns.setServers(["8.8.8.8"]);

require("dotenv").config();

const express = require("express");
const mongodbConnect = require("./database");
const Product = require("./model/productModel");

mongodbConnect();

const app = express();

app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

// Create product
app.post("/product", async (req, res) => {
  try {
    const { title, price, description, image } = req.body;

    const product = await Product.create({
      title,
      price,
      description,
      image,
    });

    res.status(201).json({
      message: "Product created successfully.",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// Get single product
app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const singleProduct = await Product.findById(id);

    if (!singleProduct) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    res.json({
      data: singleProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});
// Update product
app.patch("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, description, image } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      {
        title,
        price,
        description,
        image,
      },
      { new: true },
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product updated successfully.",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});
// Get all products
app.get("/product", async (req, res) => {
  try {
    const product = await Product.find();

    res.json({
      message: "Products retrieved successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is connected on port ${process.env.PORT}`);
});
