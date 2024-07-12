import express from "express"
import {login} from "../controllers/userlogin.controller.js"
import {createUser} from "../controllers/usersignup.controller.js"

const router=express.Router();
router.post("/signup",createUser);
router.post("/login",login);
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
  }); 
export default router;