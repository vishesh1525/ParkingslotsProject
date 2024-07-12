import express from "express";
import mongoose from "mongoose";
import { createPayment, getAllPayments } from "../controllers/Payments.controller.js";

const router=express.Router();

router.post("/Payment",createPayment)
router.get("/Payment",getAllPayments)
export default router