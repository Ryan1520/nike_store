import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import { Add, CloseFullscreen, Remove } from "@mui/icons-material"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { publicRequest } from '../requestMethod';
import Comment from '../components/Comment';

//import redux
import {addProduct} from '../redux/cartSlice'
import { useDispatch } from 'react-redux';



const Container = styled.div``

const Wrapper = styled.div`
  max-width: 1000px;
  margin-inline: auto;
  padding: 50px;
  display: flex;
  overflow: auto;
  border-radius: 20px;
  background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
`

const ImgContainer = styled.div`
  flex: 2;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  align-self: flex-start;
  border: 3px dashed #333;
  border-radius: 20px;
`

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: contain;
`

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 80px;
`

const Title = styled.h1`
  font-weight: 500;
`

const Desc = styled.p`
  margin: 20px 0px;
`

const Price = styled.span`
  font-weight: 300;
  font-size: 40px;
`

const SelectToBuy = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  margin-top: 20px;
  overflow: hidden;
`

const SelectToBuyTitle = styled.h5`
  background-color: #070A52;
  color: white;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  padding: 5px;
  width: fit-content;
  border-bottom-right-radius: 10px;
`

const OptionArea = styled.div`
  width: 50%;
  margin: 15px;
  display: flex;
  gap: 15px;
`

const Option = styled.div`
  display: flex;
  align-items: center;
`

const OptionType = styled.span`
  font-size: 20px;
  font-weight: 200;
`

const Color = styled.label`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
  
  ${'' /* https://stackoverflow.com/questions/5275857/highlight-label-if-checkbox-is-checked */}
  #${(props) => props.color}:checked + &{
    transform: scale(1.4)
  }
`

const SizeSelector = styled.select`
  margin-left: 10px;
  padding: 5px;
  border-radius: 10px;
`

const Size = styled.option``

const DealConfirm = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`

const AmountArea = styled.div`
  display: flex;
  margin: 15px 10px;
  align-items: center;
  font-weight: 700;
  gap: 5px;
`

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`

const AddButton = styled.button`
  width: 100%;
  padding: 15px;
  border: 3px solid white;
  border-radius: 20px;
  background-image: linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%);
  color: navy;
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
  margin-top: 30px;

  &:hover{
    background-image: linear-gradient(to top, #4481eb 0%, #04befe 100%);
  }
`

const ProductDetail = styled.div`
  max-width: 700px;
  margin-inline: auto;
  padding: 10px;
`

const Topic = styled.h1` 
  margin-bottom: 10px;
`

const OpenPara = styled.p`
  font-weight: 500;
  margin-bottom: 20px;
  letter-spacing: 1px;
  line-height: 23px;
  border-left: 3px solid orange;
  padding-left: 30px;
`

const Bullet = styled.h3`
  margin-bottom: 5px;
`

const Detail = styled.p`
  margin-bottom: 20px;
  letter-spacing: 1px;
  line-height: 23px;
  border-left: 3px solid orange;
  padding-left: 30px;
`

const Check = styled.input `
  display: none;
`
const Product = () => {
  //declare redux dispatch 
  const dispatch = useDispatch()

  //get product's id from URL
  const location = useLocation()
  const id = location.pathname.split("/")[2]

  //product info fetched from DB
  const [product, setProduct] = useState({})

  
  //amount, size, color set by user
  const [amount, setAmount] = useState(1)
  const [size, setSize] = useState("48")
  const [color, setColor] = useState("")


  //Fetching single product info from DB
  useEffect(() => {
    const getProduct = async () => {
      try{
        const res = await publicRequest.get(`products/find/${id}`) 
        // console.log(res.data)
        setProduct(res.data)
      } catch (err) {
        console.log(err)
      }
    } 
    getProduct()
    // console.log(product.size)
  }, [id])

  const handleClick = () => {
    //Using dispatch(action(state)) to update State in 'cart' slice ]
    color && 
    dispatch(
      addProduct({...product, color, size, amount})
    )
  }
  // console.log(color, size)
  
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>
            {product.desc}
          </Desc>

          <Price>$ {product.price}</Price>

          <SelectToBuy>
            <SelectToBuyTitle>Select to buy</SelectToBuyTitle>
            <OptionArea>
              <Option>
                <OptionType>Color: </OptionType>
                {/* user set color (place '?' before .map to make sure it work) */}
                {/* <Color 
                  color={c} 
                  key={c}
                  onClick={() => setColor(c)} /> */}
                {/* https://stackoverflow.com/questions/5275857/highlight-label-if-checkbox-is-checked */}
                {product.color?.map((c) => (
                  <>
                    <Check type='radio' name='radio' id={c} />
                    <Color 
                    for={c} 
                    color={c} 
                    onClick={() => setColor(c)} />
                  </>
                ))}
              </Option>
              
              <Option>
                <OptionType>Size:</OptionType>
                <SizeSelector onChange={(e) => setSize(e.target.value)} >
                  {/* user set size (place '?' before .map to make sure it work) */}
                  {product.size?.map((s) => (
                    <Size key={s}>{s}</Size>
                  ))}
                </SizeSelector>
              </Option>
            </OptionArea>

            <AmountArea>
              <Add onClick={() => setAmount((prevAmount) => prevAmount + 1)}/>
              <Amount>{amount}</Amount>
              <Remove onClick={() => setAmount((prevAmount) => (prevAmount > 1 ? prevAmount - 1 : 1))} />
            </AmountArea>
          </SelectToBuy>

          <DealConfirm>
            <AddButton onClick={handleClick}>ADD TO CART</AddButton>
            <AddButton onClick={handleClick}>BUY NOW</AddButton>
          </DealConfirm>

        </InfoContainer>
      </Wrapper>
      
      <ProductDetail>
        <Topic>Product Detail</Topic>
        <OpenPara>
          Step into the dawn of a new day and put the globe on notice about your skills. A flashy iridescent design, futuristic graphic and vibrant colors resembling a gradient sunrise speak to the gravitational power of the women’s game, a full-fledged force capable of uniting us on and off the field. Made to take your game to the next level, it has FlyTouch Lite engineered leather to help you dictate the pace of your match.
        </OpenPara>
        <Bullet>Amplified Touch</Bullet>
        <Detail>
          See those microdots on the upper? They amplify touch zones for shooting, dribbling and passing. They make for a sleeker look while taking out the extra padding. Even better, they don't sacrifice the ball control you crave on the field. We shaved down the foam pods from the Tiempo 9, so your foot can get even closer to the ball when it’s in your control. Instead, we molded the lines into the shoe.
        </Detail>
        <Bullet>Natural, Conforming Fit</Bullet>
        <Detail>
          FlyTouch Lite engineered leather is incredibly soft. It helps the shoe mold to your foot for comfort without overstretching the material. Tongue construction with additional padding gives you a secure feel and comfort in key strike zones. Microfiber lining creates a premium feel.
        </Detail>
        <Bullet>Traction for the Field</Bullet>
        <Detail>Rubber outsole gives you traction on turf surfaces.</Detail>

        <Accordion sx={{marginTop: '50px'}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"  
          >
            <Typography>Environmental Commitment</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{marginTop: '10px'}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header" 
          >
            <Typography>How it was made?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{marginTop: '10px'}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header" 
          >
            <Typography>Reviews</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Comment />
            <Comment />
            <Comment />
          </AccordionDetails>
        </Accordion>
        
      </ProductDetail>
      
      <Footer />
    </Container>
  )
}

export default Product