import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { Add, Remove, Delete } from "@mui/icons-material"
import { useDispatch } from 'react-redux';
import { addAmount, minusAmount, deleteProduct } from '../redux/cartSlice'

const Product = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  background-image: linear-gradient(-225deg, #9EFBD3 0%, #57E9F2 48%, #45D4FB 100%);
  box-shadow: 0px 9px 30px 10px rgba(0,0,0,0.1);
  border-radius: 20px;
  overflow: hidden;
  ${'' /* border: 1px solid black; */}
`

const ProductInfo = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  gap: 15px;
`

const Img = styled.img`
  width: 200px;
  aspect-ratio: 1;
  object-fit: contain;
  background-color: #CDDCDC;
  background-image: radial-gradient(at 50% 100%, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%), linear-gradient(to bottom, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0.25) 100%);
  background-blend-mode: screen, overlay;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ProductName = styled.span`
  white-space: nowrap;
`

const ProductId = styled.span``

const ProductColor = styled.div`
  width: 50px;
  height: 20px;
  border-radius: 10px;
  background-color: ${({bg}) => bg}
`

const ProductSize = styled.span``

const PriceInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-inline: 3px;
  background-color: #CDDCDC;
  background-image: radial-gradient(at 50% 100%, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%), linear-gradient(to bottom, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0.25) 100%);
  background-blend-mode: screen, overlay;
  border-radius: 20px;
`;

const Amount = styled.div`
  font-size: 24px;
  margin-inline: 5px;
`;

const Price = styled.div`
  font-size: 30px;
  font-weight: 500;
`;

const DeleteButton = styled.div`
  flex: .1;
  height: 100%;
  display: flex;
  align-items: center;
  background-image: linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%);
  cursor: pointer;
`



const CartProduct = ({item: {_id, img, title,desc, color, size, price, amount: quantity}}) => {

  const [amount, setAmount] = useState(quantity)

  const dispatch = useDispatch()

  const handleClick = (type) => {
    if (type === 'add'){
      setAmount(prev => prev + 1)
      dispatch(addAmount({_id, amount: amount + 1}))
    } else {
      setAmount(prev => prev - 1)
      dispatch(minusAmount({_id, amount: amount + 1}))
    }
  } 

  const handleDelete = (_id) => {
    dispatch(deleteProduct({id: _id}))
  }
  return (
    <Product>
      <ProductInfo>
        <Img src={img} />
        <Details>
          <ProductName>
            <b>Product:</b>  {title}
          </ProductName>
          <ProductId>
            <b>Type:</b> { desc }
          </ProductId>
          <ProductColor bg={color} />
          <ProductSize>
            <b>Size:</b> {size}
          </ProductSize>
        </Details>
      </ProductInfo>
      <PriceInfo>
        <ProductAmountContainer>
          <Add onClick = {() => handleClick('add')}/>
          <Amount>{amount}</Amount>
          {amount > 0 && <Remove onClick = {() => handleClick('remove')}/>}
        </ProductAmountContainer>
        <Price>$ {price * amount}</Price>
      </PriceInfo>
      <DeleteButton onClick={() => handleDelete(_id)}>
        <Delete />
      </DeleteButton>
    </Product>
  )
}

export default CartProduct