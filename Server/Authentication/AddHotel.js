const express = require("express");
const { Hotel, User } = require("../bin/DataBase");
const router = express.Router();

let RemaningRoomsLeft = 10
router.get('/HotelBooking', async (req, res) => {
    try {
        const {BookingData } = req.query
        console.log(BookingData)

        if (RemaningRoomsLeft < BookingData.RequiredRooms) {
            return res.json({ message: "Insufficient rooms available for your booking request." })
        }

        if (!BookingData.UserEmail) {
            return res.json({ message: "UserEmail not found " })
        }
        if (!BookingData.HotelBookingId) {
            return res.json({ message: "The id is missing while getting the hotel admin data" })
        }
        const HotelAdminData = await Hotel.findOne({ _id: BookingData.HotelBookingId })
        const userInfoBooking = await User.findOne({ Email: BookingData.UserEmail }).select(["Email", "FirstName", "LastName"])
        // now i am getting the data of user and hotelBooking(owner data)
        // now we need to find the rooms based on the available like required rooms for user are 2 now we need to check the empty 2room's if its empty we will allow the user (booking:status:success) or booking:status failed 
        const RemaninfHotelLeft=HotelAdminData.remainingRooms;
        console.log(userInfoBooking, 'user data fro hotel booking ',RemaninfHotelLeft,"RemaninfHotelLeft");
        console.log(HotelAdminData.owner, 'hotel owner data')
        res.json({ message: "rooms are booked please check your email" })

    } catch (error) {
        console.log(error.message, 'error message')
        return res.json({ message: error.message })
    }


});

module.exports = router;
