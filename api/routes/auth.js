const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken')


//Register
router.post('/register', async (req, res) => {
  // console.log(req.body)
  const newUser = new User({
    username: req.body.username,  
    email: req.body.email,  
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),  
  })

  try{
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch(err) {
    res.status(500).json(err)
  }
})


//Login
router.post("/login", async (req, res) => {
  // console.log(req.body)
  try{
    const user = await User.findOne({username: req.body.username})
    !user && res.status(401).json("User not found!")  //ternary operator

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);
    const passwordString = hashedPassword.toString(CryptoJS.enc.Utf8)
    passwordString !== req.body.password && res.status(401).json("Wrong password!")   //ternary operator

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    )
    //using ._doc to get JSON data from mongodb + split off password in response
    const {password, ...others} = user._doc
    
    //send response include: 'others' + jwt created above
    res.status(200).json({...others, accessToken})
  } catch (err) {
    res.status(500).json(err)
  }
})
module.exports = router