//step 1: import createSlice
import {createSlice} from "@reduxjs/toolkit"

//step 2: declare for determined slice... ->
const cartSlice = createSlice({
  //a. Name
  name: "cart",
  //b. Initial Global States
  initialState: {
    products: [],
    amount: 0,
    total: 0,
  },
  //c. The REDUCERS which define how state changed base on each ACTION dispatched
  reducers:{
    addProduct: (state, action) => {
      state.amount += 1
      state.products.push(action.payload)
      state.total += action.payload.price * action.payload.amount
    },
    addAmount: (state, action) => {
      // https://stackoverflow.com/questions/35206125/how-can-i-find-and-update-values-in-an-array-of-objects
      state.products[state.products.findIndex((item) => item._id === action.payload._id)].amount = action.payload.amount
      state.total += state.products[state.products.findIndex((item) => item._id === action.payload._id)].price
      // state.total = state.products?.reduce((a,b) => a.price + b.price)
    },
    minusAmount: (state, action) => {
      // https://stackoverflow.com/questions/35206125/how-can-i-find-and-update-values-in-an-array-of-objects
      state.products[state.products.findIndex((item) => item._id === action.payload._id)].amount = action.payload.amount
      state.total -= state.products[state.products.findIndex((item) => item._id === action.payload._id)].price
      // state.total = state.products?.reduce((a,b) => a.price + b.price)
    },
    deleteProduct: (state, action) => {
      state.total -= state.products[state.products.findIndex((item) => item._id === action.payload.id)].price * state.products[state.products.findIndex((item) => item._id === action.payload.id)].amount
      state.products = state.products.filter(item => item._id !== action.payload.id)
      state.amount -= 1
    }
  }
})

//step 3: export actions that will be imported by components to dispatch
export const {addProduct, addAmount, minusAmount, deleteProduct} = cartSlice.actions

//step 4: export reducer that will be imported by store.js
export default cartSlice.reducer