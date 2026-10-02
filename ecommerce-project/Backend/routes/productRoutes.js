const express = require("express");

const { getProducts , createProduct , getProductById , updateProduct , deleteProduct } = require("../controller/productcontroller");

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id",getProductById);
router.put("/:d",updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;