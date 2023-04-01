import express from "express";
const router = express.Router();
import { CartController } from "../../controllers/cart.controller.js";

router.get("/", CartController.getCart)
router.get("/:id", CartController.getCartById)
router.post("/", CartController.uploadCart)
router.put("/:id", CartController.updateCart)
router.delete("/:id",CartController.deleteCartById)

export{router as cartRouter}