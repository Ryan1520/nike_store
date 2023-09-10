//axios import
import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/"
let TOKEN = "abc"

// console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user))
if (localStorage.getItem("persist:root") === null){
  console.log("!!!Please Login!!!")
} else if (JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser === null){
  console.log("!!!Please Login!!!")
}else {
  TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken
}






//create normal axios request with BASE_URL(server's root url) 
export const publicRequest = axios.create({
  baseURL: BASE_URL,
})

//create protected axios request('login' required) with BASE_URL(server's root url) and  JWT token
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `Bearer ${TOKEN}`
  }
})