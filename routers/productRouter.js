import express from "express";
import { getAllProducts, getProductById } from "../controllers/productController.js";
import { createProduct } from "../controllers/productController.js";
import { deleteProduct } from "../controllers/productController.js";
import { updateProduct } from "../controllers/productController.js";

const productRouter = express.Router();


productRouter.get("/",getAllProducts);
productRouter.post("/",createProduct)
productRouter.delete("/:prodctId", deleteProduct)
productRouter.put("/:prodctId", updateProduct)
productRouter.get("/:prodctId", getProductById)

export default productRouter;