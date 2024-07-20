import mongoose, { Schema } from "mongoose";

const PaymentSchema = new Schema({
    reservation_id: {
        type: Schema.Types.ObjectId,
        ref: "Parking Spot", // Ensure this matches the correct model name
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    vechile_license: {
        type: String
    },
    amount: {
        type: Number,
        required: true
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
                return this.paymentMethod !== "online-payment" || v;
            },
            message: "UPI ID is required for online payments"
        }
    }
});

const PaymentModel = mongoose.model("Payment", PaymentSchema);
export default PaymentModel;
