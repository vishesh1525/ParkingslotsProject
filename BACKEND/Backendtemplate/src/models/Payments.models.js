import mongoose, { Schema } from "mongoose";

const PaymentSchema = new Schema({
    reservation_id: {
        type: Schema.Types.ObjectId,
        ref: "ParkingSpots",
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    paymentMethod: {
        type: String,
        enum: ["cash", "online-payment"],
        required: true
    },
    upiId: {
        type: String,
        validate: {
            validator: function(v) {
                return this.paymentMethod !== "online-payment" || (this.paymentMethod === "online-payment" && v);
            },
            message: "UPI ID is required for online payments"
        }
    }
});

const PaymentModel = mongoose.model("Payment", PaymentSchema);
export default PaymentModel;
