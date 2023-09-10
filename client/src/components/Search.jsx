import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom'
import {publicRequest} from '../requestMethod'

const Container = styled.div `
  min-height: 300px;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #D5DEE7 0%, #E8EBF2 50%, #E2E7ED 100%), linear-gradient(to bottom, rgba(0,0,0,0.02) 50%, rgba(255,255,255,0.02) 61%, rgba(0,0,0,0.02) 73%), linear-gradient(33deg, rgba(255,255,255,0.20) 0%, rgba(0,0,0,0.20) 100%);
  background-blend-mode: normal,color-burn;
  margin-block: 20px;
`

const Wrapper = styled.div`
  max-width: 700px;
  height: 100%;
  padding: 10px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${'' /* border: 2px solid black */}
`

const Label = styled.h1`
  margin-bottom: 20px;
`

const InputSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${'' /* border: 1px solid black; */}
  border-radius: 30px;
  padding: 10px 30px;
  background-image: linear-gradient(-225deg, #D4FFEC 0%, #57F2CC 48%, #4596FB 100%);
  margin-bottom: 5px;
`

const Input = styled.input`
  height: 100%;
  border:none;
  background-color: transparent;

  &:focus{ 
    outline: none;
  }
`

const SearchResults = styled.div`
  ${'' /* border: 1px solid black; */}
  border-radius: 10px 0px 0px 10px;
  width: 250px;
  height: 100px;
  overflow-y: scroll;
  padding: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const Result = styled.h4`
  margin-block: 5px;
  padding: 5px 10px;
  cursor: pointer;
  border-left: 4px solid green;
  transition: all .2s ease-in-out;

  &:hover{
    border-radius: 20px;
    background-color: #E4E4E1;
    background-image: radial-gradient(at top center, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.03) 100%), linear-gradient(to top, rgba(255,255,255,0.1) 0%, rgba(143,152,157,0.60) 100%);
 	  background-blend-mode: normal, multiply;
  }
`
const Popular = styled.h4`
  margin-block: 10px;
`

const KeyWords = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

const Key = styled.div`
  padding: 7px;
  border: 1px solid black;
  border-radius: 10px;
  cursor: pointer;
  transition: all .2s ease-in-out;

  &:hover{
    background: black;
    color: white;
  }
`
const Search = () => {
  const [products, setProducts] = useState([])
  const [word, setWord] = useState('')
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try{
        const res = await publicRequest.get("http://localhost:5000/api/products")
        // console.log(res)
        setProducts(res.data.map(p => ({
            id: p._id,
            title: p.title.toLowerCase(), 
            desc: p.desc.toLowerCase()
          })
        ))
      } catch (err){
        console.log(err)
      }
    }

    getProducts()
  }, [])
  // console.log(products)

  const handleSearch = (e) => {
    setWord(e.target.value)

    //https://askjavascript.com/how-to-filter-an-array-with-multiple-conditions-in-javascript/#:~:text=To%20filter%20an%20array%20with%20multiple%20conditions%20in%20JavaScript%2C%20you,by%20the%20filter()%20method.
    const searchMatch = products.filter(p => p.desc.includes(word.toLowerCase()) || p.title.includes(word.toLowerCase()))
    setSearchResult(searchMatch)
  }
  console.log(searchResult)

  return (
    <Container>
      <Wrapper>
        <Label>What are you looking for?</Label>
        
        <InputSection>
          <Input 
          type="text" 
          placeholder="Search..."
          onChange={handleSearch} />
          <SearchIcon />
        </InputSection>
        {word && <SearchResults>
          {searchResult.map(result => (
            <Link 
            style={{
            textDecoration: 'none', 
            color:'black'}} 
            to={`/product/${result.id}`}>
              <Result>{result.title}</Result>
            </Link> 
          ))}
        </SearchResults>}
        <Popular>Most Popular</Popular>
        <KeyWords>
          <Key>Turf</Key>
          <Key>Tiempo</Key>
          <Key>Mercurial</Key>
          <Key>Running</Key>
          <Key>Men</Key>
        </KeyWords>
      </Wrapper>
    </Container>
  )
}

export default Search