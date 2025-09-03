const express = require("express");
const { Hotel, User } = require("../bin/DataBase");
const router = express.Router();

let RemaningRoomsLeft = 10
router.get('/HotelBooking', async (req, res) => {
    try {
        const { HotelBookingId, UserEmail, Requiredrooms } = req.query
        console.log('before booking the rooms total', RemaningRoomsLeft, "\n")
        if (RemaningRoomsLeft < Requiredrooms) {
            return res.json({ message: "Insufficient rooms available for your booking request." })
        }
        RemaningRoomsLeft -= Requiredrooms; // subtract requested rooms
        console.log(RemaningRoomsLeft, 'after booking rooms left ')




        if (!UserEmail) {
            return res.json({ message: "UserEmail not found " })
        }
        if (!HotelBookingId) {
            return res.json({ message: "The id is missing while getting the hotel admin data" })
        }
        const HotelAdminData = await Hotel.findOne({ _id: HotelBookingId })
        const userInfoBooking = await User.findOne({ Email: UserEmail }).select(["Email", "FirstName", "LastName"])
        // now i am getting the data of user and hotelBooking(owner data)
        // now we need to find the rooms based on the available like required rooms for user are 2 now we need to check the empty 2room's if its empty we will allow the user (booking:status:success) or booking:status failed 
        console.log(userInfoBooking, 'user data fro hotel booking ');
        console.log(HotelAdminData.owner, 'hotel owner data')

        res.json({ message: "rooms are booked please check your email" })

    } catch (error) {
        console.log(error.message, 'error message')
        return res.json({ message: error.message })
    }


});

module.exports = router;
