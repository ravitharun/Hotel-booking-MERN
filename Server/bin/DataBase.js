const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hotelbooking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a simple Hotel schema
const UserSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Role: { type: String, required: true, default: "user" },
  Email: { type: String, required: true },
  ConfirmPassword: { type: String, required: true },
  Password: { type: String, required: true },
});
const hotelSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String, required: true },
  chain: { type: String },
  description: { type: String },
  starCategory: { type: Number, min: 1, max: 5 },

  location: {
    address: String,
    city: String,
    state: String,
    country: String,
    zipcode: String,
    latitude: Number,
    longitude: Number,
    distanceFromAirport: String,
    distanceFromRailwayStation: String
  },

  rating: { type: Number, min: 0, max: 5 },
  reviewsCount: { type: Number, default: 0 },
  remainingRooms: { type: Number, default: 0 },

  reviews: [
    {
      user: String,
      comment: String,
      rating: { type: Number, min: 0, max: 5 },
      date: { type: Date, default: Date.now }
    }
  ],

  pricing: {
    pricePerNight: Number,
    currency: { type: String, default: "INR" },
    discount: Number,
    finalPrice: Number,
    taxIncluded: { type: Boolean, default: true },
    offers: [String]
  },
rooms: [
  {
    roomId: Number,
    type: String,
    capacity: Number,
    bedType: String,
    size: String,
    price: Number,
    available: Number,
    facilities: [String],
    images: [String]
  }
],

  food: {
    breakfast: { type: Boolean, default: false },
    lunch: { type: Boolean, default: false },
    dinner: { type: Boolean, default: false },
    restaurantName: String,
    cuisine: [String],
    roomService: { type: Boolean, default: false },
    bar: { type: Boolean, default: false }
  },

  amenities: [String],
  images: [String],

  bookingInfo: {
    checkInTime: String,
    checkOutTime: String,
    cancellationPolicy: String,
    paymentMethods: [String]
  },

  guestsInfo: {
    maxGuestsAllowed: Number,
    familyFriendly: { type: Boolean, default: true },
    coupleFriendly: { type: Boolean, default: true }
  },

  nearbyAttractions: [String],

  system: {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    isFeatured: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "inactive"], default: "active" }
  }
});
// Create a Hotel model
const User = mongoose.model('UserLoginData', UserSchema);
const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = { User, Hotel };