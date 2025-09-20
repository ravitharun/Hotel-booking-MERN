const express = require("express");
const { Hotel, User, Booking } = require("../bin/DataBase");
const { default: mongoose } = require("mongoose");
const router = express.Router();

let RemaningRoomsLeft = 10
router.get('/HotelBooking', async (req, res) => {
    // now i am getting the data of user and hotelBooking(owner data)
    // now we need to find the rooms based on the available like required rooms for user are 2 now we need to check the empty 2room's if its empty we will allow the user (booking:status:success) or booking:status failed 
    try {
        const { BookingData } = req.query
        console.log(BookingData, 'BookingData')
        if (RemaningRoomsLeft < BookingData.RequiredRooms) {
            return res.json({ message: "Insufficient rooms available for your booking request." })
        }
        if (!BookingData.UserEmail) {
            return res.json({ message: "UserEmail not found " })
        }
        if (!BookingData.HotelBookingId) {
            return res.json({ message: "The id is missing while getting the hotel admin data" })
        }
        const HotelAdminData = await Hotel.findOne({ _id: BookingData.HotelBookingId });
        const userInfoBooking = await User.findOne({ Email: BookingData.UserEmail });
        // console.log(HotelAdminData.rooms[0].price,'HotelAdminData.rooms.price')

        const UserBooking = new Booking({
            HotelBookingId: BookingData.HotelBookingId,
            RequiredRooms: Number(BookingData.RequiredRooms),
            BookingCheckIn: BookingData.BookingCheckIn,
            BookingCheckOut: BookingData.BookingCheckOut,
            User: userInfoBooking._id,          // only the ObjectId
            HotelOwner: HotelAdminData.owner._id, // only the ObjectId
            Status: "pending",
            totalAmount: Number(BookingData.RequiredRooms) * Number(HotelAdminData.rooms[0].price)
        });
        await UserBooking.save()
        console.log(UserBooking, 'UserBooking')
        res.json({ message: "rooms are booked please check your email" })


    } catch (error) {
        console.error(error)
        return res.json({ message: error.message })
    }
});
// these will get the booking based on email to show in ui
router.get("/BookingUser/Admin", async (req, res) => {
    try {
        const { Email } = req.query;

        // Find all hotels owned by this email
        const hotels = await Hotel.find({ 'owner.email': Email });

        if (hotels.length === 0) {
            return res.status(404).json({ message: "No hotels found for this email" });
        }

        let allBookings = [];

        for (let i = 0; i < hotels.length; i++) {
            const hotelBookings = await Booking.find({ HotelOwner: hotels[i].owner._id });
            allBookings = allBookings.concat(hotelBookings);
        }

        if (allBookings.length === 0) {
            return res.json({ message: "No bookings found for this owner's hotels" });
        }
        let userInfoArray = [];

        for (let i = 0; i < allBookings.length; i++) {
            const GetUserInfo = await User.find({ _id: allBookings[i].User });
            userInfoArray.push(GetUserInfo[0]); // push single user document
        }

        console.log(allBookings, "All bookings");
        console.log(userInfoArray, "User Info");

        res.json({ bookings: allBookings, userInfo: userInfoArray });


    } catch (error) {
        console.error(error.message, "error message");
        res.status(500).json({ message: "Server error" });
    }
});

// booking status (approve/reject) and send email to that approve or reject 
router.put('/BookingStatus/Admin', (req, res) => {
    try {
        const { CheckStatus, id } = req.body;

        console.log({ CheckStatus, id })
        return res.json({ message: 'data go it from ui ' })
    }
    catch (err) {
        return res.json({ meessage: err.message })
    }
})

router.get('/ManageHotel/Admin', async (req, res) => {
    try {
        const { Email } = req.query;
        console.log(Email)
        if (!Email) {
            return res.json({ message: 'Some thing went wrong ' })
        }
        const GetHotelAdmin = await Hotel.find({ 'owner.email': Email })
        console.log(GetHotelAdmin, 'GetHotelAdmin')
        if (GetHotelAdmin.length == 0) {
            return res.json({ message: 'No Hotels Added' })
        }

        return res.json({ message: GetHotelAdmin })
    }
    catch (err) {
        res.json({ message: err.message })
    }
})

module.exports = router;
