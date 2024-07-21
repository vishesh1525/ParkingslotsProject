import dotenv from "dotenv";
import { ParkingSpots } from "../models/Parkingspots.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";

dotenv.config();

export const CreateParkingSpot = async (req, res) => {
  try {
    const { username, spot_number, floor, status } = req.body;
    const user = await User.findOne({ username, role: "Admin" }).select('_id');
    
    if (!user) {
      console.log("User is not registered");
      return res.status(400).json(new ApiError(400, "User is not registered"));
    }

    const parkingSpot = new ParkingSpots({
      user_id: user._id,
      username:username,
      Spot_number:spot_number,
      floor,
      status
    });

    const savedSpot = await parkingSpot.save();
    return res.status(201).json(savedSpot);
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
};

export const getparkingspot=async(req,res)=>{
  try {
    const parkingSpotdata=await ParkingSpots.find();
    if(!parkingSpotdata)
    {
      return res.status(400).json(new ApiError(400,"NO PARKING SPOTS"))
    }
    return res.status(200).json(parkingSpotdata);
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
}

export const getparkingspotbyspotnumber=async(req,res)=>{
  try {
    const {spot_number}=req.body;
    const parkingSpotdata=await ParkingSpots.find({Spot_number:spot_number});
    if(!parkingSpotdata)
    {
      return res.status(400).json(new ApiError(400,"NO PARKING SPOTS"))
    }
    return res.status(200).json(parkingSpotdata);
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
}

export const getParkingSpotBystatus = async (req, res) => {
  try {
    // Fetch parking spots with status "Not Available"
    const parkingSpots = await ParkingSpots.find({});

    if (!parkingSpots.length) {
      return res.status(400).json("NO PARKING SPOTS");
    }

    // Extract user IDs from the parking spots
    

    // Create a map of user IDs to usernames
   

    // Attach usernames to the parking spots
    

    return res.status(200).json(parkingSpots);
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
};






export const deleteParkingspots=async(req,res)=>{
  try {
    const {username,spot_number}=req.body;
    const user = await User.findOne({ username, role: "Admin" }).select('_id');
    
    if (!user) {
      console.log("User is not a Admin");
      return res.status(400).json(new ApiError(400, "User is not a Admin"));
    }
    const response=await ParkingSpots.deleteOne({Spot_number:spot_number});
    console.log(response.data)
    if (response.deletedCount > 0) {
      return res.status(200).json("Deleted Successfully");
    }

    return res.status(400).json("Vehicle not found");
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
}