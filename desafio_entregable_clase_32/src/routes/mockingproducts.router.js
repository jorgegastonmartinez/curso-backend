import { Router } from "express";
import { generateProductsMock, getProductsMock } from "../controllers/mockingproducts.controller.js";

const router = Router();

router.get("/mockingproducts", getProductsMock)
router.post("/mockingproducts", generateProductsMock)

export default router;