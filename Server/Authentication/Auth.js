const express = require("express");
const router = express.Router();


// create a new account route
router.post("/CreateAccountUser", async (req, res) => {
  try {
    const UserInfo = {
      "name": "Ravi Tharun",
      "email": "tharun@example.com"
    }
    console.log("Received:", UserInfo);
    res.json({ message: "User created successfully", data: UserInfo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Checking the User Is Exits or not else we will redirect to Create Page Account Or else we will Info Them That No user Found
router.get("/LoginUser",async(req,res)=>{
  res.send('/LoginUser route running ')
})




module.exports = router;
