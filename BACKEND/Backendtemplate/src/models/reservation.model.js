// reservations[icon:alert-circle]{
//     _id string pk
//     Customerid Objectid user
//     spotnumber Objectid ParkingSpots
//     vechileid Objectid[] Payments
//     start_time Date
//     end_time Date
//     reservationstatus enum "active" "completed" "cancelled"
//   }


import mongoose,{Schema} from "mongoose";


const ReservationSchema=new Schema({
     user_id:[
        {
            type:Schema.Types.ObjectId,
            ref:"user"
        }
     ],
     Spot_number:[
        {
            type:Schema.Types.ObjectId,
            ref:"ParkingSpots",
            unique:true
        }
     ],
     vechile_id:[
        {
            type:Schema.Types.ObjectId,
            ref:"Vehicle"
        }
     ],
     End_time:
     {
        type:Date,
        required:true
     }
     
})

export const Reservation=mongoose.model("Resrvation",ReservationSchema)