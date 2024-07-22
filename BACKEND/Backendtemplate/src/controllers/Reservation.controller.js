
import { ParkingSpots } from "../models/Parkingspots.models.js";
import dotenv from "dotenv";
import { Vehicle } from "../models/Vechile.models.js"; // Correct the file name if necessary
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { Reservation } from "../models/reservation.model.js";

 export const CreateReservation=async(req,res)=>{
    try {
        const {username,spotnumber,end_time}=req.body;
    const user=await User.findOne({username:username}).select("_id");
    if(!user)
    {
        return res.status(400).json(new ApiError(200,"User is not registred"));

    }
    const spot_number=await ParkingSpots.findOne({Spot_number:spotnumber,status:"Available"}).select("_id");
    if(!spot_number)
    {
        return res.status(400).json(new ApiError(200,"Parking Spot is not avaliable "));
    }
    

    const reservationdata=new Reservation({
        user_id:user,
        Spot_number:spot_number,

        End_time:end_time
    }) 
    const response=await reservationdata.save();
    return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}

export const getreservations=async(req,res)=>{
    try {
        const { username } = req.query;
        if (!username) {
            return res.status(400).json(new ApiError(400, "Username is required"));
        }

        const user = await User.findOne({ username }).select("_id");
        if (!user) {
            return res.status(400).json(new ApiError(400, "User is not registered"));
        }

        const reservations = await Reservation.find({ user_id: user._id });
        return res.status(200).json(reservations);
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
};

export const getallreservations=async(req,res)=>{
    try {
        

            const response=await Reservation.find();
            return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    
    }
}

export const deletereservations = async (req, res) => {
    try {
      const { spot_no } = req.body;
      const spot = await ParkingSpots.findOne({ Spot_number: spot_no }).select("_id");
  
      if (!spot) {
        return res.status(404).json({ message: "Parking spot not found" });
      }
  
      const response = await Reservation.findOneAndDelete({ Spot_number: spot._id });
  
      if (!response) {
        return res.status(404).json({ message: "Reservation not found" });
      }
  
      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
  }
  

export const updateReservation = async (req, res) => {
    try {
        const { reservation_id, end_time } = req.body;

        
        if (!reservation_id || !end_time) {
            return res.status(400).json(new ApiError(400, "Reservation ID and End Time are required"));
        }

        
        const updatedReservation = await Reservation.findByIdAndUpdate(reservation_id, { End_time: end_time }, { new: true });
        if (!updatedReservation) {
            return res.status(404).json(new ApiError(404, "Reservation not found"));
        }

        return res.status(200).json(updatedReservation);
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
};

export const searchReservationsBySpot = async (req, res) => {
    try {
        const { spot_number } = req.params;

        // Validate input
        if (!spot_number) {
            return res.status(400).json(new ApiError(400, "Spot Number is required"));
        }

        // Find reservations by spot number
        const reservations = await Reservation.find({ Spot_number: spot_number });
        return res.status(200).json(reservations);
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
};



