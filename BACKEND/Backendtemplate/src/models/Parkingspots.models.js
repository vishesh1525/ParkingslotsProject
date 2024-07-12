// ParkingSpots [icon:car ]{
//     spotId string pk
//     AdminID Objectid AdminLogin
//     spotNumber string,
//     floor string,
//     Customerid Objectid Customers
//     status enum "Available" "Not  Available"
//   }
import mongoose,{Schema} from "mongoose";
const ParkingSpotsSchema=new Schema({
    user_id: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    Spot_number:{
        type:String,
        required:true,
        unique:true,
    },
    floor:{
        type:String
    },
    status:{
        type:String,
        default:"Available",
        enum:["Available","Not  Available"]
    }
},{
    timestamps:true
});

export const ParkingSpots=mongoose.model("ParkingSpots",ParkingSpotsSchema);





