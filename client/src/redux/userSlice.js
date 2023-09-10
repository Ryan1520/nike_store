//step 1: import createSlice
import {createSlice} from "@reduxjs/toolkit"

//step 2: declare for determined slice... ->
const userSlice = createSlice({
  //a. Name
  name: "user",
  //b. Initial Global States
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  //c. The REDUCERS which define how state changed base on each ACTION dispatched
  reducers:{
    loginStart: (state) => {
      state.isFetching = true
    },
    loginSuccess: (state, action) => {
      state.isFetching = false
      state.currentUser = action.payload
    },
    loginFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
  }
})

//step 3: export actions that will be imported by components to dispatch
export const {loginStart, loginSuccess, loginFailure} = userSlice.actions

//step 4: export reducer that will be imported by store.js
export default userSlice.reducer