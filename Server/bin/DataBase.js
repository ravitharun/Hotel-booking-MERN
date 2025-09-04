const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/hotelbooking")
  .then(() => console.log("✅ MongoDB connected to hotelbooking"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Define a simple Hotel schema
const UserSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Role: { type: String, required: true, default: "user" },
  Email: { type: String, required: true },
  ConfirmPassword: { type: String, required: true },
  Password: { type: String, required: true },
});


// related to the hotelgit initgiifenaipcfshgyiku
const locationSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zipcode: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  distanceFromAirport: { type: String },
  distanceFromRailwayStation: { type: String },
});

const ownerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const roomSchema = new mongoose.Schema({
  roomId: { type: Number, required: true },
  type: { type: String, required: true },
  capacity: { type: Number, required: true },
  bedType: { type: String },
  size: { type: String },
  price: { type: Number, required: true },
  totalRooms: { type: Number, required: true },
  available: { type: Number, required: true },
  facilities: [{ type: String }],
  images: [{ type: String }],
});



const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  chain: { type: String },
  description: { type: String },
  starCategory: { type: Number, min: 1, max: 5 },
  location: { type: locationSchema, required: true },
  owner: { type: ownerSchema, required: true },
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  remainingRooms: { type: Number, default: 0 },
  rooms: [roomSchema],
  bookings: [bookingSchema],
}, { timestamps: true });


const bookingSchema = new mongoose.Schema(
  {
    HotelBookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    RequiredRooms: { type: Number, required: true },
    BookingCheckIn: { type: Date, required: true },
    BookingCheckOut: { type: Date, required: true },
    User: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    HotelOwner: { type: mongoose.Schema.Types.ObjectId, ref: "HotelOwner", required: true },
    totalAmount: { type: Number },
    Status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true }
);



// Create a Hotel model
const User = mongoose.model('UserLoginData', UserSchema);
const Booking = mongoose.model('BookingSchema', bookingSchema);
const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = { User, Hotel, Booking };