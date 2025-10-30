import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    event: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Booking = mongoose.model("Booking", bookingSchema);