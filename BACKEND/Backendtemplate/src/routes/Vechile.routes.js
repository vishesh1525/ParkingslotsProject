import express from "express";

import { createVehicle, deleteVehicle, getVechiles } from "../controllers/Vechile.controller.js";

const router=express.Router();
router.post("/vechile",createVehicle)
router.post("/vechiles",getVechiles)
router.delete("/vechile",deleteVehicle)
export default router;