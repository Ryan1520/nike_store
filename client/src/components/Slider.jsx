import React from 'react'
import { useState } from 'react';
import styled from 'styled-components'
import {sliderItems} from '../data'
import {ArrowCircleLeftOutlined, ArrowCircleRightOutlined} from '@mui/icons-material';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
`
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({direction}) => direction === "left" && "10px"};
  right: ${({direction}) => direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`
const Wrapper = styled.div`
  display: flex;
  height: 100%;
  transition: all 1.5s ease;
  transform: translateX(${({slideIndex}) => slideIndex * -100}vw);
`

const Slide = styled.div`
  flex: 1 0 100vw; 
  ${'' /* width: 100vw; */}
  height: 100vh;
  display: flex;
  align-items: center;
  background-image: ${(props) => props.bg};
`

const ImgContainer = styled.div`
  flex: 1.2;
  height: 100%;
  padding-inline: 0px;
`

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  object-position: center;
  transform: rotate(${props => props.rot});
`

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`
const Title = styled.h1`
  font-size: 70px;
`
const Desc = styled.p`
  margin-block: 50px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`

const Button = styled.div`
  padding: 20px 30px;
  font-size: 20px;
  background-color: white;
  width: fit-content;
  border-radius: 50px; 
  cursor: pointer;
  font-weight: 500;
  transition: all .3s ease-in-out; 
  
  &:hover{
    transform: scale(1.2)
  }
`
const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0)
  const handleClick = (direction) => {
    console.log(slideIndex)
    if (direction === "left"){
      setSlideIndex(prevValue => prevValue > 0 ? prevValue - 1 : 2)
      // or: setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
    } else {
      setSlideIndex(prevValue => prevValue < 2 ? prevValue + 1 : 0)
      // or: setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
    }
  }
  return (
    <Container>
      <Arrow direction="left" onClick = {() => handleClick("left")}>
        <ArrowCircleLeftOutlined />
      </Arrow>
      <Wrapper slideIndex = {slideIndex}>
        {sliderItems.map(item => (
          <Slide bg={item.bg}>
            <ImgContainer>
              <Image src={item.img} rot={item.deg}/>
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>MORE INFO</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick = {() => handleClick("right")}>
        <ArrowCircleRightOutlined />
      </Arrow>
    </Container>
  )
}

export default Slider