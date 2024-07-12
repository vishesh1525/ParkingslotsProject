import express from "express";
import dotenv from "dotenv";
import { Vehicle } from "../models/Vechile.models.js"; // Correct the file name if necessary
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";

dotenv.config();
export const getVechiles = async (req, res) => {
    try {
        const response = await Vehicle.find();
        if (response.length === 0) {
            console.log("Vehicles are not registered");
            return res.status(400).json(new ApiError(400, "No vehicles registered"));
        }
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}
export const createVehicle = async (req, res) => {
  try {
    const { username, license_plate, vehicle_type, make, model, color } = req.body;

    
    const user1 = await User.findOne({ username:username}).select('_id');
    if (!user1) {
      console.log("User is not registered");
      return res.status(400).json(new ApiError(400, "User is not registered"));
    }

    
    const vehicle = new Vehicle({
      user_id:user1,
      license_plate: license_plate,
      vehicle_type,
      make,
      model,
      color
    });

    
    const response = await vehicle.save();

    
    return res.status(201).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
};

export const deleteVehicle = async (req, res) => {
  try {
   

    const { vehicle_license } = req.body;

    
    ;

    
    const vehicle = await Vehicle.findOne({ license_plate: vehicle_license});

    
    console.log('Vehicle found:', vehicle);

    if (!vehicle) {
      return res.status(400).json("Vehicle not found");
    }

    
    const response = await Vehicle.deleteOne({ license_plate: vehicle_license });

    
    console.log('Delete response:', response);

    if (response.deletedCount > 0) {
      return res.status(200).json("Deleted Successfully");
    }

    return res.status(400).json("Vehicle not found");

  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
}
