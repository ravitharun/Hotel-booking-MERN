const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hotelbooking', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a simple Hotel schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true, default: "user" },
    Email: { type: String, required: true },
    ConfirmPassword: { type: String, required: true },
    Password: { type: String, required: true },
});

// Create a Hotel model
const User = mongoose.model('UserLoginData', UserSchema);

module.exports = { User };