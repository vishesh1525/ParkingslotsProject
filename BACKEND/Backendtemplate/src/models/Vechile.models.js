import mongoose from 'mongoose';
const { Schema } = mongoose;

const VehicleSchema = new Schema(
    {
        user_id: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        license_plate: {
            type: String,
            required: true
        },
        vehicle_type: {
            type: String,
            enum: ["car", "bike"],
            required: true
        },
        make: {
            type: String,
            enum: ["petrol","diesel", "EV"],
            required: true
        },
        model: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true // This will add `createdAt` and `updatedAt` fields
    }
);



export const Vehicle = mongoose.model("Vehicle", VehicleSchema);
