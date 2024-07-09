
import { CreateReservation, deletereservations, getallreservations, getreservations, searchReservationsBySpot, updateReservation } from "../controllers/Reservation.controller.js";
import express from "express"

const router=express.Router();

router
.post("/Reservation",CreateReservation)
.get("/Reservation",getreservations)
.get("/Reservations",getallreservations)
.patch("/Reservation",updateReservation)
.delete("/Reservation",deletereservations)
.post("/Reservation",searchReservationsBySpot)
export default router;
