import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import CircularProgress from '@mui/material/CircularProgress';

import { login } from '../redux/apiCalls';
import {useDispatch, useSelector} from 'react-redux';
import { UseSelector } from 'react-redux';


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  min-width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;

  &:disabled{
    background-color: gray;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.h5`
  font-weight: 200;
  color: red;
`

const Login = () => {
  //get username & password in input box
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  //get fetching state(isFetching) from redux userSlice -> display circle progress
  //get error state(error) from redux userSlice -> display error warning
  const {isFetching, error} = useSelector(state => state.user)

  const dispatch = useDispatch()

  //execute login process when click login button
  const handleClick = (e) => {
    e.preventDefault()

    let user = {username, password}
    login(dispatch, user)
  }

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input 
          placeholder = "username" 
          onChange = {(e) => setUsername(e.target.value)} />
          <Input 
          placeholder = "password" 
          type = "password"
          onChange = {(e) => setPassword(e.target.value)} />
          <Button 
          onClick = {handleClick}
          disabled = {isFetching}>
          {isFetching? <CircularProgress size="20px"/> : 'LOGIN'}
          </Button>
          {error && <Error>Something went wrong!</Error>}
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Login