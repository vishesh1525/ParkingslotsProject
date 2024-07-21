import { User } from "../models/user.models.js";
import { ParkingSpots } from "../models/Parkingspots.models.js";
import PaymentModel from "../models/Payments.models.js";
import { ApiError } from "../utils/ApiError.js";
import { Reservation } from "../models/reservation.model.js";
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

// Create Payment Function
export const createPayment = async (req, res) => {
    try {
        const { username, vechile_license, reservationspot, amount, method, upiId } = req.body;

        // Log the request body
        console.log('Request body:', req.body);

        // Find user by username
        const user = await User.findOne({ username }).select("_id");
        if (!user) {
            console.log("User is not registered");
            return res.status(400).json({ message: "User is not registered" });
        }

        // Validate amount
        const amountNumber = parseFloat(amount);
        if (isNaN(amountNumber)) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        // Find reservation by ID
        
        console.log(reservationspot)
        const parkingSpot = await ParkingSpots.findOne({ Spot_number:reservationspot });
        if (!parkingSpot) {
            console.log(`Parking spot with Spot_number ${reservationspot} not found`);
            return res.status(400).json({ message: "Parking spot not found" });
        }
        console.log(parkingSpot);

        // Check if payment method is online and validate UPI ID
        if (method === "online-payment" && !upiId) {
            return res.status(400).json({ message: "UPI ID is required for online payments" });
        }
        
        // Update parking spot status
        const updatedParkingSpot = await ParkingSpots.findByIdAndUpdate(parkingSpot._id, { status: "Not Available" }, { new: true });
        if (!updatedParkingSpot) {
            return res.status(500).json({ message: "Failed to update parking spot status" });
        }

        // Create new payment
        const payment = new PaymentModel({
            reservation_id: parkingSpot._id, // Assuming you want to save the parking spot ID
            user_id: user._id,
            amount: amountNumber,
            vechile_license,
            paymentMethod: method,
            ...(method === "online-payment" && { upiId }) 
        });

        const response = await payment.save();
        return res.status(201).json(response);
    } catch (error) {
        console.error('Error in createPayment:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



export const getAllPayments = async (req, res) => {
    try {
        const response = await PaymentModel.find();
        if (response.length === 0) {
            return res.status(401).json(new ApiError(401, "No payments are done"));
        }
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
};