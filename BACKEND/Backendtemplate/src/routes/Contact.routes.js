import express from "express";
import { createcontact } from "../controllers/contact.controller.js";

const router=express.Router();

router.post("/Contact",createcontact)

export default router