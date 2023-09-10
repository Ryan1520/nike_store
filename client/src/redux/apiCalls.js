//Login process:

//import 3 action start-success/failure of login request
import {loginStart, loginSuccess, loginFailure} from './userSlice'
//import non-protected request created in requestMethod
import { publicRequest } from '../requestMethod'

export const login = async (dispatch, user) => {
  dispatch(loginStart()) //isFetching = true

  try{
    const res = await publicRequest.post('/auth/login', user) //login request
    dispatch(loginSuccess(res.data)) //isFetching = false, user = res.data
  } catch (err) {
    dispatch(loginFailure()) //isFetching = false, error = true
    console.log(err)
  }
}