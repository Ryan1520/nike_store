import React from 'react'
import styled from 'styled-components'
import { ShoppingCartOutlined, 
         SearchOutlined, 
         FavoriteBorderOutlined } from '@mui/icons-material'
import {Link} from 'react-router-dom'


// const Info = styled.div`
//   opacity: 0;
//   background-color: rgba(0, 0, 0, 0.2);
//   position: absolute;
//   inset: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 1em;
//   z-index: 3;
//   cursor: pointer;
//   transition: all 0.5s ease;
// `
         
// const ProductCard = styled.div`
//   flex: 1;
//   margin: 5px;
//   min-width: 280px;
//   height: 350px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: #f5fbfd;
//   position: relative;

//   &:hover ${Info}{
//     opacity: 1;
//   } 
// `

// const Circle = styled.div`
//   width: 200px;
//   height: 200px;
//   border-radius: 50%;
//   background-color: white;
//   position: absolute;
// `;

// const Image = styled.img`
//   width: 100%;
//   height: 75%;
//   object-fit: contain;
//   z-index: 2;
// `
// const Icon = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: white;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 10px;
//   transition: all 0.5s ease;

//   &:hover {
//     background-color: #e9f5f5;
//     transform: scale(1.1)
//   }
// `

const ProductCard = styled.div`
  ${'' /* width: 280px;
  height: 440px;
  margin: 5px; */}
  border-radius: 25px;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  position: relative;
`

const BrandLogo = styled.img`
  width: 60px;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
`

const ProductImg = styled.img`
  width: 100%;
  height: 50%;
  object-fit: contain;
  object-position: center;
`

const InfoArea = styled.div`
  padding: 20px;
  margin-bottom: 10px;
  background-image: linear-gradient(-20deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%);
  ${'' /* border: 1px solid black; */}
`

const Title = styled.h3`
  white-space: nowrap
`

const Desc = styled.p`
  margin-top: 8px;
`

const PriceAndColor = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`

const Price = styled.h1`

`
const ColorOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
const Color = styled.div`
  width: 20px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: ${({color}) => color};
  cursor: pointer;
`

const Discount = styled.div`
  width: fit-content;
  padding: 7px;
  margin: 0 20px;
  border: 2px solid #333;
  border-radius: 10px;
`
//'item' props import from DB in Products.jsx
const Product = ({item}) => {
  return (
    // <ProductCard>
    //   <Image src={item.img} alt={item.img} />
    //   <Circle />
    //   <Info>
    //     <Icon>
    //       <ShoppingCartOutlined />
    //     </Icon>
    //     <Icon>
    //       {/* each product carry an '_id' created by mongoDB, 
    //       this id will be used to locate Product page and fetching single product data */}
    //       <Link to={`/product/${item._id}`}>
    //         <SearchOutlined />
    //       </Link>
    //     </Icon>
    //     <Icon>
    //       <FavoriteBorderOutlined />
    //     </Icon>
    //   </Info>
    // </ProductCard>

      <ProductCard>
        <BrandLogo src="https://i.ibb.co/BK5CV0m/Nike-Logo.png"/>
        <ProductImg src={item.img}/>

        <InfoArea>
          <Link 
          style={{
            textDecoration: 'none', 
            color:'black'}} 
          to={`/product/${item._id}`}>
            <Title>{item.title}</Title>
          </Link>
          <Desc>{item.desc}</Desc>
          <PriceAndColor>
            <Price>$ {item.price}</Price>
            <ColorOptions>
              {item.color?.map(c => (
                <Color color={c} />
              ))}
            </ColorOptions>
          </PriceAndColor>
        </InfoArea>
        <Discount>30% Off for Members</Discount>
      </ProductCard>
  )
}

export default Product