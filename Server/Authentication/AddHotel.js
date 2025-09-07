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
router.get("/BookingUser/Admin", async (req, res) => {
    try {
        const email = 'owner.delhi@theleela.com'
        const GetHotelBookingInfo = await Booking.find({})
        for (let i = 0; i < GetHotelBookingInfo.length; i++) {

            const HotelOwner = await Hotel.findOne({
                "owner._id": new mongoose.Types.ObjectId(GetHotelBookingInfo[i].HotelOwner)
            });

            // console.log(HotelOwner.owner._id,'HotelOwner.owner._id'); 
            // if(){}else{}
        }
    } 
    catch (error) 
    {
        console.log(error.message,'error message')
    }
})

module.exports = router;
