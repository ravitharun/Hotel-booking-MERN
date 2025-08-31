const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Hotel } = require("../bin/DataBase");
const salt = bcrypt.genSaltSync(10);
const hotelInfo = require('../hotel.json');
const JWT_SECRET = "tharun2005";

// const jwt = require("jsonwebtoken");
// http://localhost:3000/Hotel/LoginUser

// create a new account route
router.post("/CreateAccountUser", async (req, res) => {
  try {
    const { UserInfo } = req.body
    console.log("Received:", UserInfo);
    if (UserInfo.ConfirmPassword != UserInfo.Password) { return res.json({ message: "The Password of both are not same " }) }
    const UserInfoConfirmPassword = await bcrypt.hash(UserInfo.ConfirmPassword, salt);
    const Password = await bcrypt.hash(UserInfo.Password, salt);
    const User_save = await User({
      FirstName: UserInfo.FirstName,
      LastName: UserInfo.LastName,
      Role: UserInfo.Role,
      Email: UserInfo.Email,
      Password: Password,
      ConfirmPassword: UserInfoConfirmPassword
    })
    await User_save.save()
    res.json({ message: "User created successfully", data: 'User_save' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Checking the User Is Exits or not else we will redirect to Create Page Account Or else we will Info Them That No user Found
router.get("/LoginUser", async (req, res) => {
  try {
    const { UserCheck } = req.query
    // check the value is empty logic
    if (UserCheck.Email === '' || UserCheck.Password === '') {
      return res.json({ message: "Fill The required Details" })
    }
    // we are checking the user is exits
    const IsValid_user = await User.findOne({ Email: UserCheck.Email })
    if (!IsValid_user) {
      return res.status(404).json({ message: "user not found" })
    }
    //  We Are Checking the Password
    const isMatch = await bcrypt.compare(UserCheck.Password, IsValid_user.Password);

    if (!isMatch) {
      console.log('Wrong password')
      return res.json({ message: 'Wrong password' })
    };
    const token = jwt.sign({ _id: IsValid_user._id, Email: IsValid_user.email }, JWT_SECRET, {
      expiresIn: "1h", // token expiry
    });

    // checking the user data

    if (IsValid_user.Email === UserCheck.Email && IsValid_user.Role === UserCheck.Role) {
      console.log(token, 'token')
      return res.json({ message: "User login successfully", data: UserCheck, token });
    } else {
      console.log('Unauthorized person')
      return res.json({ message: "Unauthorized person" });
    }
  } catch (error) {
    console.log(error.message, 'error.message')
    // res.json({ message: error.message })
  }
})



// adding the hotel info
router.post("/check", async (req, res) => {
  try {
    const count = await Hotel.countDocuments();
    if (count > 0) {
      return res.status(400).json({ message: "Hotels already exist in DB" });
    }

    const savedHotels = await Hotel.insertMany(hotelInfo);
    res.status(201).json({
      message: "Hotels saved successfully",
      data: savedHotels
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/all",async(req,res)=>{
  const data=await Hotel.find({})
  console.log(data,'data')
  res.send(data)
})
module.exports = router;
