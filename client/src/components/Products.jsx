import React, {useState, useEffect} from 'react'
import { popularProducts } from '../data'
import styled from 'styled-components'
import Product from './Product'
import axios from "axios"


const Container = styled.div`
  ${'' /* border: 1px solid black; */}
  padding: 20px;
  ${'' /* display: flex;
  flex-wrap: wrap;
  justify-content: center; */}
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 440px);
  grid-auto-rows: 440px;
  gap: 30px;
`

const MostPopular = styled.h1`

`

const Products = ({cat, filters, sort}) => {
  // console.log(cat, filters, sort)

  //products fetched from DB (and apply 'cat' parameter)
  const [products, setProducts] = useState([])

  //filteredProducts after apply filters by user
  const [filteredProducts, setFilteredProducts] = useState([])

  //fetching all products (or with categories) from DB
  useEffect(() => {
    const getProducts = async () => {
      try{
        const res = await axios.get(
          cat 
            ?`http://localhost:5000/api/products?category=${cat}`
            :"http://localhost:5000/api/products"
        )
        // console.log(res)
        setProducts(res.data)
      } catch (err){
        console.log(err)
      }
    }

    getProducts()
  }, [cat])

  //filtering 'products' whenever 'filters selector' change
  useEffect(() => {
    cat && 
    setFilteredProducts(
      // https://stackoverflow.com/questions/31005396/filter-array-of-objects-with-another-array-of-objects
      // https://stackoverflow.com/questions/12433604/how-can-i-find-matching-values-in-two-arrays
      // https://bobbyhadz.com/blog/javascript-check-if-all-values-in-array-equal
      // https://www.educative.io/answers/how-to-get-keys-values-and-entries-in-javascript-object
      products.filter(item => 
        Object.entries(filters).every(([key, value]) => item[key].includes(value)))
    )
  }, [filters, cat, products])

  //Sorting 'filterProducts' whenever 'sort selector' change
  useEffect(() => {
    if(sort === 'newest'){
      setFilteredProducts(prev => [...prev].sort((a,b) => a.createdAt - b.createdAt))
    } else if (sort === 'asc'){
      setFilteredProducts(prev => [...prev].sort((a,b) => a.price - b.price))
    } else {
      setFilteredProducts(prev => [...prev].sort((a,b) => b.price - a.price))
    }
  }, [sort])

  return (
    //'Products' component imported by Home page and ProductList page
    //In Home page, 'products' state used because 'filters & sort selector' not exist
    //In ProductList page, 'filters & sort selector' will create 'filteredProducts' state
    <Container>
      {cat 
        ? filteredProducts.map((item) => (
          <Product item={item} key={item.id} />
        ))
        // https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
        : products.sort((a, b) => 0.5 - Math.random()).slice(0,8).map((item) => (
            <Product item={item} key={item.id} />
        ))
      }
    </Container>
    
  )
}

export default Products