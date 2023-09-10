import React from 'react'
import styled from 'styled-components'
import { Announcements } from '../data';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Container = styled.div`
  width: 100%;
  height: 2em;
  background-color: white;
  color: black;
  font-size: 1em;
  font-weight: 500;
`

const Wrapper = styled.div`
  height: 100%;
  width: 400px;
  margin-inline: auto;
  
  display: flex;
  align-items: center;
  justify-content: center;
`

const Label = styled.h4`
  text-align: center;
`
const Anouncement = () => {
  return (
    <Container>
      <Wrapper>
        <Swiper
        // install Swiper modules
        modules={ [Navigation, Autoplay, A11y] }
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')} 
        >
          {Announcements.map(a => (
            <SwiperSlide>
              <Label>{a}</Label>
            </SwiperSlide>
          ))}
        </Swiper>
      </Wrapper>
    </Container>
  )
}

export default Anouncement