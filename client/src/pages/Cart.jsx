import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer";
import CartProduct from '../components/CartProduct';
import {Link} from 'react-router-dom';

//import redux  useSelector to GET State in cartSlice
import { useSelector } from 'react-redux';

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  max-width: 1100px;
  margin-inline: auto;
`

const Info = styled.div`
  ${'' /* border: 1px solid black; */}
  flex: 3;
  display: flex; 
  flex-direction: column;
  justify-content: center;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  width: 90%;
  margin-inline: auto;
  height: 2px;
`
const Summary = styled.div`
  flex: 1;
  border: 3px dashed black;
  border-radius: 10px;
  padding: 20px;
  margin-block: 20px;
  height: 90vh;
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
`

const SummaryTitle = styled.h1`
  font-weight: 400;
`

const SummaryItem = styled.div`
  margin-block: 15px;
  display: flex;
  justify-content: space-between;
  font-weight: ${({type}) => (type === 'total' ? '500' : '400')};
  font-size : ${({type}) => (type === 'total' && '24px')};
`

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  border-radius: 20px;
  transition: all .3s ease-in-out;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const Container = styled.div`

`
const Wrapper = styled.div`
  display: flex;
  gap: 40px;
  max-width: 1100px;
  margin-inline: auto;
  margin-block: 50px;
  
`
const DeliveryInfo = styled.div`
  flex: 3;
  padding: 30px;
  border: 2px dotted #333;
  border-radius: 20px;
  background-color: #FFDEE9;
  background-image: linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%);

`

const Label = styled.h1`
  margin-bottom: 20px;
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const Input = styled.input`
  padding: 10px;
  border: 2px solid #333;
  border-radius: 10px;
`

const SelectSection = styled.div`
  display: flex;
  gap: 30px;
`
const Select = styled.select`
  padding: 10px;
  width: 50%;
  border: 2px solid #333;
  border-radius: 10px
`

const Option = styled.option`
  
`

const TextArea = styled.textarea`
  resize: none;
  padding: 10px;
  border: 2px solid #333;
  border-radius: 10px
`

const PaymentSection = styled.div`
  flex: 2;
  padding: 30px;
  margin-left: 0;
  border: 2px solid #333;
  border: 2px dotted #333;
  border-radius: 20px;
  background-color: #85FFBD;
  background-image: linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%);

`

const Method = styled.label`
  border: 2px solid #333;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 20px;
  
`

const Check = styled.input`

`

const Text =styled.label`

`
const Cart = () => {
  const cart = useSelector(state => state.cart)

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <DeliveryInfo>
          <Label>Delivery Infomation</Label>
          <Form>
            <Input type="text" placeholder="Name"/>
            <Input type="text" placeholder="Phone Number"/>
            <Input type="text" placeholder="Email"/>
            <Input type="text" placeholder="Address"/>
            <SelectSection>
              <Select>
                <Option hidden>Province</Option>
                <Option>Quang Nam</Option>
                <Option>Quang Ngai</Option>
                <Option>Da Nang</Option>
                <Option>Ha Noi</Option>
              </Select>
              <Select>
                <Option hidden>City</Option>
                <Option>Hoi An</Option>
                <Option>Dong Hoi</Option>
                <Option>Tam Ky</Option>
                <Option>Can Tho</Option>
              </Select>
            </SelectSection>
            <TextArea type="text" placeholder="Notice for seller..."/>
          </Form>
        </DeliveryInfo>

        <PaymentSection>
          <Label>Payment Method</Label>
          <Method>
            <Check type="radio" name="radio" id="cod"/>
            <Text for="cod">COD</Text>
          </Method>
          <Method>
            <Check type="radio" name="radio" id="momo" />
            <Text for="momo">MomoPay</Text>
          </Method>
          <Method>
            <Check type="radio" name="radio" id="zalo" />
            <Text for="zalo">ZaloPay</Text>
          </Method>
          <Method>
            <Check type="radio" name="radio" id="shopee" />
            <Text for="shopee">ShopeePay</Text>
          </Method>
          <Method>
            <Check type="radio" name="radio" id="vn" />
            <Text for="vn">VNPay</Text>
          </Method>
        </PaymentSection>
      </Wrapper>

      <Bottom>
        <Info>
          {
            cart.products.length === 0 
            ? "Please Add Some Products !" 
            : cart.products?.map(item => (
                <CartProduct item = {item} />
              )
            )
          }
        </Info>
        <Summary>
          <SummaryTitle>ORDER SUMMARY</SummaryTitle>
          <SummaryItem>
            <SummaryItemText>Subtotal</SummaryItemText>
            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
          </SummaryItem>
          <Hr />
          <SummaryItem>
            <SummaryItemText>Discount</SummaryItemText>
            <SummaryItemPrice>$ -{cart.total * 30 / 100}</SummaryItemPrice>
          </SummaryItem>
          <Hr />
          <SummaryItem>
            <SummaryItemText>Shipping Cost</SummaryItemText>
            <SummaryItemPrice>$ 5.90</SummaryItemPrice>
          </SummaryItem>
          <Hr />
          <SummaryItem>
            <SummaryItemText>Shipping Discount</SummaryItemText>
            <SummaryItemPrice>$ -5.90</SummaryItemPrice>
          </SummaryItem>
          <Hr />
          <SummaryItem type="total">
            <SummaryItemText>Total</SummaryItemText>
            <SummaryItemPrice>$ {cart.total - cart.total * 30 / 100}</SummaryItemPrice>
          </SummaryItem>
          
          <Link to='/success'>
            <Button>CHECKOUT</Button>
          </Link>
          
          <Link to='/'>
            <Button>BACK TO SHOP</Button>
          </Link>
            
        </Summary>
      </Bottom>
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default Cart