import { User } from "../models/user.models.js";
import { ParkingSpots } from "../models/Parkingspots.models.js";
import PaymentModel from "../models/Payments.models.js";
import { ApiError } from "../utils/ApiError.js";

export const createPayment = async (req, res) => {
    try {
        const { username, reservationspot, amount, method, upiId } = req.body;

        // Find user by username
        const user = await User.findOne({ username }).select("_id");
        if (!user) {
            console.log("User is not registered");
            return res.status(400).json(new ApiError(400, "User is not registered"));
        }

        // Find parking spot by Spot_number
        const parkingSpot = await ParkingSpots.findOne({ Spot_number: reservationspot }).select("_id");
        if (!parkingSpot) {
            console.log("ParkingSpot is not available");
            return res.status(400).json(new ApiError(400, "ParkingSpot is not available"));
        }

        // Check if payment method is online and validate UPI ID
        if (method === "online-payment" && !upiId) {
            return res.status(400).json(new ApiError(400, "UPI ID is required for online payments"));
        }

        // Update parking spot status
        const updatedParkingSpot = await ParkingSpots.findByIdAndUpdate(parkingSpot._id, { status: "Not Available" });
        if (!updatedParkingSpot) {
            return res.status(500).json(new ApiError(500, "Internal Server Error"));
        }

        // Create new payment
        const payment = new PaymentModel({
            reservation_id: parkingSpot._id,
            user_id: user._id,
            amount,
            paymentMethod: method,
            ...(method === "online-payment" && { upiId }) // Conditionally add upiId if online payment
        });

        const response = await payment.save();
        return res.status(201).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
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