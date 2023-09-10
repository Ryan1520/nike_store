const router = require('express').Router()

const { 
  verifyToken, 
  verifyTokenAndAuthorize, 
  verifyTokenAndAdmin } = require('./verifyToken')

const Cart = require('../models/Cart')
  
//Create
router.post('/', verifyToken, async (req,res) => {
  const newCart = new Cart(req.body)

  try{
    const savedCart = await newCart.save()
    res.status(200).json(savedCart)
  } catch (err) {
    res.status(500).json(err)
  }
})

//Update
router.put("/:id", verifyTokenAndAuthorize, async (req, res) => {
  try{
    const updateCart = await Cart.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {new: true}) 

    res.status(200).json(updateCart)
  } catch (err) {
    res.status(500).json(err)
  }
})

//Delete
router.delete("/:id", verifyTokenAndAuthorize, async (req, res) => {
  try{
    await Cart.findByIdAndDelete(req.params.id) 

    res.status(200).json("Cart has been deleted from your shop")
  } catch (err) {
    res.status(500).json(err)
  }
})

//Get a cart
router.get("/find/:userId", verifyTokenAndAuthorize, async (req, res) => {
  try{
    const cart = await Cart.findOne({userId: req.params.userId})
    res.status(200).json(cart)
  } catch(err) {
    res.status(500).json(err)
  }
})

//Get all Cart
router.get("/", verifyTokenAndAdmin, async (req, res) => {

  try{
    const carts = await Cart.find()

    res.status(200).json(carts)
  } catch (err){
    res.status(500).json(err)
  }
})

module.exports = router 