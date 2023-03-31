import express from "express";
const router = express.Router();
import { ProductsController } from "../../controllers/products.controller.js";

router.get("/", ProductsController.getProducts)
router.get("/:id", ProductsController.getProductById)
router.get("/category/:category", ProductsController.getProductByCategory)
router.post("/", ProductsController.uploadProduct)
router.put("/:id", ProductsController.updateProduct)
router.delete("/:id", ProductsController.deleteProductById)

export{router as productsRouter}