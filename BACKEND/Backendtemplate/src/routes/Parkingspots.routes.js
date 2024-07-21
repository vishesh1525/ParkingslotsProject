import express, { Router } from "express";

import { CreateParkingSpot, deleteParkingspots, getparkingspot, getparkingspotbyspotnumber, getParkingSpotBystatus } from "../controllers/ParkingSpots.contoller.js";

const router=express.Router();

router.post("/ParkingSpots",CreateParkingSpot)
router.get("/ParkingSpots",getparkingspot)
router.get("/ParkingSlotbyslot",getparkingspotbyspotnumber)
router.delete("/ParkingSpots",deleteParkingspots)
router.get("/parkingSpotbystatus",getParkingSpotBystatus)
export default router
