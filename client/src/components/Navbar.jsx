import React from 'react'
import styled from 'styled-components'
import Badge from '@mui/material/Badge';
import { ShoppingCartOutlined, Search } from '@mui/icons-material';
import {Link} from 'react-router-dom'

//import useSelector to GET State in cartSlice
import { useSelector } from 'react-redux';


const Container = styled.div`
  height: 60px;
  padding-block: 10px ;
  background-image: linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%);
`

const Wrapper = styled.div`
  max-width: 90%;
  margin-inline: auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
`
const Language = styled.div`
  font-size: 14px;
  cursor: pointer;
`

const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  padding: 5px;
  margin-left: 25px; 
`
const Input = styled.input`
  border: none;

  &:focus{
    outline: none;
  }
`

const Center = styled.div`
  flex: 1;
  text-align: center;
`

const Logo = styled.h1`
  font-weight: bold;
  color: white;
`;

const NikeLogo = styled.img`
  height: 60px;
  position: absolute;
  left: 200px;
  top: 8px;
`
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color: white;
  transition: all .2s ease-in-out;

  &:hover{
    border: 2px solid white;
    border-radius: 10px;
    padding: 5px;
  }
`
const Navbar = () => {
  //get the whole state
  const cart = useSelector((state) => state.cart)
  // console.log(cart)

  //get the 'amount' field 
  const amount = useSelector((state) => state.cart.amount)

  return (
    <Container>
      <Wrapper>
        <Link style={{textDecoration: 'none'}} to='/'>
          <Left>
            <Logo>NikeCollections</Logo>
            <NikeLogo src="https://i.ibb.co/mvxc8cr/nike-logo.png" />
          </Left>
        </Link>

        <Right>
          <MenuItem>REGISTER</MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <Link to={`/cart`}>
            <MenuItem>
              <Badge badgeContent={amount} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper> 
    </Container>
  )
}

export default Navbar