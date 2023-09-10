import React, {useState, useEffect} from 'react'
import {categories} from '../data'
import styled from 'styled-components'
import CategoryItem from './CategoryItem'
import { popularProducts } from '../data'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { publicRequest } from '../requestMethod'

import {Link} from 'react-router-dom'

// import Swiper core and required modules
import { Autoplay, Navigation, Pagination, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// const Container = styled.div`
//   display: flex;
//   padding: 20px;
//   justify-content: space-between;
// `

const Container = styled.div`
  ${'' /* max-width: 95%;
  margin-inline: auto; */}
  width: 100%;
  margin-block: 40px;
  background-color: white;
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #${props => props.bg};
`
const Cat = styled.h1`
  margin: 20px 10px;
`
const Seeall = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  font-size: 15px;
  margin-right: 30px;
  padding: 6px;
  ${'' /* background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%); */}
  background-color: #${props => props.bg};
  border-radius: 20px;
  transition: all .3s ease-in-out;
  
  &:hover{
    box-shadow: 0px 0px 10px 7px rgba(0,0,0,0.1);
  }
`

const Bottom = styled.div`
  padding: 10px 10px;
  background-color: #${props => props.bg};
`
const Card = styled.div`
  background-color: #${props => props.bg};
  ${'' /* background-image: ${props => props.bg}; */}

  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`

const Img = styled.img`
  width: 100%;
  height: 50%;
  object-fit: contain;
  object-position: center;
  margin: 20px 0;
`

const ContentContainer = styled.div`
  padding: 20px 20px;
`

const Title = styled.h2`
  font-weight: 400;
  font-size: 20px;
`

const Price = styled.h5`
  margin-top: 10px;
  font-size: 15px;
`

const Discount = styled.div`
  padding: 5px 15px;
  margin-top: 10px;
  border: 2px solid black;
  border-radius: 9px;
  width: fit-content;
`


const Categories = ({cat, cardColor, top, bottom, seeall}) => {

  const [products, setProducts] = useState([])
  
  useEffect(() => {
    const getData = async() => {
      try{
        const res = await publicRequest.get('/products?category=' + cat)
        setProducts(res.data)
        console.log(res.data)
      } catch {}
    }
    getData()
  }, [cat])

  return (
    // <Container>
    //   {categories.map(item => (
    //     <CategoryItem item={item} key={item.id} />
    //   ))}
    
    <Container>
      <Top bg={top}>
        <Cat>{cat.toUpperCase()}</Cat>
        <Link 
        style={{
        textDecoration: 'none', 
        color:'white'}} 
        to={`/products/${cat}`}>
          <Seeall bg={seeall}>See all <ChevronRightIcon /></Seeall>
        </Link>
      </Top>
      <Bottom bg={bottom}>
        <Swiper
          // install Swiper modules
          modules={[Autoplay, Navigation, Pagination, A11y]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }} 
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log('slide change')}
        >
          {products.map(product => (
            <SwiperSlide>
              <Card bg={cardColor}>
                <Img src={product.img} />
              
                <ContentContainer>
                  <Title>{product.title}</Title>
                  <Price>$ {product.price}</Price>
                  <Discount>-50%</Discount>
                </ContentContainer>
              </Card>
            </SwiperSlide>
          ))}
        
        </Swiper>
      </Bottom>
    </Container>
  )
}

export default Categories