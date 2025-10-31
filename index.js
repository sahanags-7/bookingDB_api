import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
const PORT=3001;
import {Booking} from "./models/booking.js";
const app = express();
app.use(express.json());
connectDB();
app.get("/", (req, res) => {
res.send("Welcome to the Synergia Management System API");
});

app.get("/bookings", async (req, res) => {
  try {
         const bookings = await Booking.find();
         res.json(bookings);
     } catch (error) {
         res.status(500).json({ error: error.message });
     }
 });

app.get("/bookings/search", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email query parameter is required" });
    }

    const booking = await Booking.findOne({ email });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 
app.get("/bookings/filter", async (req, res) => {
  try {
    const { event } = req.query;
    if (!event) {
      return res.status(400).json({ message: "Event query parameter is required" });
    }

    const booking = await Booking.findOne({ event });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); 

app.get("/bookings/:id", async (req, res) => {
     try {
         const booking = await Booking.findById(req.params.id);
         if (!booking) {
             return res.status(404).json({ message: "Booking not found" });
         }
         res.json(booking);
     } catch (error) {
         res.status(500).json({ error: error.message });
     }
});





 app.put("/bookings/:id", async (req, res) => {
     try {
         const booking = await Booking.findByIdAndUpdate(req .params.id , req.body, {
             new: true,
         });
         if (!booking) {
             return res.status(404).json({ message: "Booking not found" });
         }
         res.json({ message: "Booking updated successfully", booking });
     } catch (error) {
         res.status(400).json({ error: error.message });
     }
 });



app.post("/bookings", async (req, res) => {
     try {
         const booking=new Booking(req.body);
         await booking.save();
         res.status(201).json({message:"Booking created successfully",booking});
     } catch (error) {
         res.status(400).json({error:error.message});
     }
 });

        
app.delete("/bookings/:id", async (req, res) => {
     try {
         const booking = await Booking.findByIdAndDelete(req.params.id);
         if (!booking) {
             return res.status(404).json({ message: "Booking not found" });
         }
         res.json({ message: "Booking deleted successfully" });
     } catch (error) {
         res.status(500).json({ error: error.message });
     }
 });      


app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
