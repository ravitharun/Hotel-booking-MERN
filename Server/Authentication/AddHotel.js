const express = require("express");
const { Hotel, User, Booking, HotelSave } = require("../bin/DataBase");
const { default: mongoose } = require("mongoose");
const http = require("http");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();
let RemaningRoomsLeft = 10
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.From_Email,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
})
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
      UserEmail: BookingData.UserEmail,
      totalAmount: Number(BookingData.RequiredRooms) * Number(HotelAdminData.rooms[0].price)
    });
    await UserBooking.save();
    console.log(UserBooking, 'UserBooking')
    const mailOptions = {
      from: process.env.From_Email,
      to: userInfoBooking.Email,
      subject: "Your Hotel Booking Request is Received – Awaiting Confirmation",
      html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Booking Pending</title>
  </head>
  <body style="margin:0; padding:0; font-family:Arial, sans-serif; background:#f9f9f9;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background:#f9f9f9; padding:20px;">
      <tr>
        <td align="center">
          <table width="600" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 8px rgba(0,0,0,0.05);">
            
            <!-- Header -->
            <tr>
              <td style="background:#2a9d8f; padding:20px; text-align:center; color:#fff; font-size:22px; font-weight:bold;">
                Hotel Booking Request Received
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px; color:#333; font-size:16px; line-height:1.6;">
                <p>Dear <strong>${userInfoBooking.FirstName}</strong>,</p>
                <p>Thank you for choosing our hotel. We have received your booking request, but it is currently <strong>pending confirmation</strong>.</p>
                <p>Once our team verifies the availability, we’ll send you an update with your booking status.</p>

                <!-- Booking Info Box -->
                <table width="100%" style="margin:20px 0; border:1px solid #eee; border-radius:8px;">
                  <tr>
                    <td style="padding:12px; background:#f4f4f4; font-weight:bold;">Booking Details</td>
                  </tr>
                  <tr>
                    <td style="padding:12px;">
                      <p><strong>Hotel:</strong> ${BookingData.HotelName}</p>
                      <p><strong>Check-in:</strong> ${BookingData.BookingCheckIn}</p>
                      <p><strong>Check-out:</strong> ${BookingData.BookingCheckOut}</p>
                      <p><strong>Guests:</strong> ${BookingData.RequiredRooms}</p>
                    </td>
                  </tr>
                </table>

                <p style="margin-top:20px;">We appreciate your patience while we confirm your reservation. You’ll receive another email soon.</p>

                <!-- CTA Button -->
                <p style="text-align:center; margin:30px 0;">
                  <a href="https://yourhotelwebsite.com/my-bookings" 
                    style="background:#2a9d8f; color:#fff; padding:12px 24px; text-decoration:none; border-radius:6px; font-weight:bold;">
                    View My Booking
                  </a>
                </p>

                <p style="color:#777; font-size:14px;">If you have any questions, please contact our support team.</p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f4f4f4; padding:15px; text-align:center; font-size:12px; color:#666;">
                © 2025 Your Hotel. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `
    };
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptions);
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

    // Find all hotels owned console.log(process.env ,'env data')by this email
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
      const GetUserInfo = await User.find({ _id: allBookings[i].User }).select("FirstName");
      userInfoArray.push(GetUserInfo[0]); // push single user document
    }
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
// get  all hotel of the admin
router.get('/ManageHotel/Admin', async (req, res) => {
  try {
    const { Email } = req.query;

    if (!Email) {
      return res.json({ message: 'Some thing went wrong ' })
    }
    const GetHotelAdmin = await Hotel.find({ 'owner.email': Email })
    console.log(process.env.From_Email, 'env data')
    if (GetHotelAdmin.length == 0) {
      return res.json({ message: 'No Hotels Added' })
    }
    return res.json({ message: GetHotelAdmin })
  }
  catch (err) {
    res.json({ message: err.message })
  }
})



// hotel add to save
router.post("/SaveHotel", async (req, res) => {
  try {
    const { hotelinfo } = req.body;
    console.log(hotelinfo)
    const SaveHotelUSer = new HotelSave({
      Hotelid: hotelinfo.Hotelid, hotelName: hotelinfo.hotelName, hotelDescription: hotelinfo.hotelDescription, Usereamil: hotelinfo.Usereamil, hotelPrice: hotelinfo.hotelPrice
    })
    await SaveHotelUSer.save()
    console.log(hotelinfo);
    res.json({ message: 'Hotel is added in the whilist' })
  }
  catch (err) {
    console.log(err.message)
  }
})

// get HotelSaved based on user
router.get("/GetHotel/Saved", async (req, res) => {
  try {
    const { Email } = req.query
    const gethotelsaved = await HotelSave.find({ Usereamil: Email })
    console.log(gethotelsaved, 'Email')

    // console.log(hotelInfo,'hotelInfo')
    if (gethotelsaved.length == 0) {

      return res.json({ message: "no hotel are saved by u" })
    }
    res.json({ message: gethotelsaved, })
  }
  catch (Err) {
    console.log(Err.message, 'ERROR FROM THE GETHOTEL/saved route')
  }
})


// getting hotel info
router.get("/gethotelInfo/Hotel", async (req, res) => {
  try {
    const { HotelId } = req.query;
    console.log(HotelId)
    if (!HotelId) {
      return res.json({ message: 'Something  went wrong' })
    }
    const hotelInfo = await Hotel.findOne({ _id: HotelId });

    console.log(hotelInfo)
    res.json({ message: hotelInfo })
  }
  catch (err) {
    return res.json({ message: err.message })
  }
})

router.post("/form/new", async (req, res) => {
  try {
    const { FormData } = req.body;
    console.log("FormData",FormData )
  }
  catch (err) {
    return res.json({ message: err.message })
  }
})
module.exports = router;
