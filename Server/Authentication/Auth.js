const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require("../bin/DataBase");
const salt = bcrypt.genSaltSync(10);



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
    // checking the user data
    if (IsValid_user.Email === UserCheck.Email && IsValid_user.Role === UserCheck.Role) {
      return res.json({ message: "User login successfully", data: UserCheck });
    } else {
      console.log('Unauthorized person')
      return res.json({ message: "Unauthorized person" });
    }
  } catch (error) {
    console.log(error.message, 'error.message')
    // res.json({ message: error.message })
  }
})




module.exports = router;
