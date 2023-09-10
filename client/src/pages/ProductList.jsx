import React, {useState} from 'react'
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import styled from 'styled-components';
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';


const Container = styled.div`

`

const Title = styled.h1`
  margin: 20px 40px;
`

const FilterArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 40px;
  padding: 10px 0px 10px 10px;
  background-image: linear-gradient(to top, #d9afd9 0%, #97d9e1 100%);
  box-shadow: 0px 7px 25px 3px rgba(0,0,0,0.3);
  border-radius: 20px;
  ${'' /* border: 1px solid black; */}
`

const Filter = styled.div`
  display: flex;
  align-items: center;
`

const FilterLabel = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`

const Select = styled.select`
  padding: 5px;
  margin-right: 20px;
  border-radius: 10px;
  cursor: pointer;
`

const Option = styled.option`

`

const Button = styled.button`
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all .3s ease-in-out;

  &:hover{
    border: 1px solid black;
    color: red;
  }
`

const ProductList = () => {
  // extract catrgories param from URL
  const location = useLocation()
  const cat = location.pathname.split("/")[2]
  // console.log(location.pathname.split("/"))

  //filters = {color:..., size:...} and sort type
  const [filters, setFilters] = useState({}) 
  const [sort, setSort] = useState("newest") 

  //Set 'filters' whenever Selectors change
  const handleFilters = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value.toLowerCase()
    })
  }
  console.log(filters)

  //Set 'sort' whenever Selector change
  const handleSort = (e) => {
    setSort(e.target.value)
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      
      <Title>{cat.toUpperCase()}</Title>
      <FilterArea>
        <Filter>
          <FilterLabel>Filter products:</FilterLabel>

          <Select 
          name="color" 
          onChange={handleFilters}>
            <Option hidden>Color</Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Silver</Option>
            <Option>Orange</Option>
          </Select>

          <Select 
          name="size" 
          onChange={handleFilters}>
          {
            cat === 't-shirt' ? (
              <>
              <Option hidden>Size</Option>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
              <Option>XL</Option>
              </>
            ) : (
              <>
              <Option hidden>Size</Option>
              <Option>45</Option>
              <Option>46</Option>
              <Option>47</Option>
              <Option>48</Option>
              </>
            )
          }
          </Select>

          <Button onClick={() => setFilters({})}><ClearIcon /></Button>
        </Filter>

        <Filter>
          <FilterLabel>Sort products:</FilterLabel>
          <Select 
          onChange={handleSort}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterArea>

      {/* Transfer categories, filters, sort to fetch products from mongoDB */}
      <Products 
      cat={cat} 
      filters={filters} 
      sort={sort} />
      <Newsletter />
      <Footer />
    </Container>  
  )
}

export default ProductList