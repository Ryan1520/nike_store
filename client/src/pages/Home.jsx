import React from 'react'
import styled from 'styled-components'
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import Search from '../components/Search';

const ProductsContainer = styled.div`
  ${'' /* border: 1px solid black; */}
  background-color: #98EECC;
  margin-block: 50px;
`

const Title = styled.h1`
  padding: 20px 25px;
  background-color: #79E0EE
`

const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Search />
      <Slider />
      <Categories cat="running" cardColor="F5EFE7" top="D8C4B6" bottom="4F709C" seeall="213555"/>
      <Categories cat="soccer" cardColor="F6F1F1" top="AFD3E2" bottom="19A7CE" seeall="146C94"/>
      <Categories cat="t-shirt" cardColor="FFFBF5" top="F7EFE5" bottom="C3ACD0" seeall="674188"/>
      <ProductsContainer>
        <Title>Recommended for you</Title>
        <Products />
      </ProductsContainer>
      <Newsletter/>
      <Footer/>
    </div>
  )
}

export default Home