//Import middleware
const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")

//import routes
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const productRoute = require("./routes/product")
const orderRoute = require("./routes/order")
const cartRoute = require("./routes/cart")
const stripeRoute = require("./routes/stripe");

//plugin 'dotenv'
dotenv.config();

//start 'express'
const app = express();

//apply cors
app.use(cors())

//connect to mongodb
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DBConnection Successfull!"))
.catch((err) => console.log(err))

//allow JSON request
app.use(express.json())


//authentification route
app.use('/api/auth', authRoute)

//user route
app.use('/api/users', userRoute)

//product route
app.use('/api/products', productRoute)

//cart route
app.use('/api/carts', cartRoute)

//order route
app.use('/api/orders', orderRoute)

//stripe checkout route
app.use("/api/checkout", stripeRoute);


//setting port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Backend server is running on PORT ${PORT}`)
})