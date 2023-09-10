import React from 'react'
import styled from '@emotion/styled'
import {Link} from "react-router-dom";


const Card = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`
const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Title = styled.div`
  color: white;
  margin-bottom: 20px;
`

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`


const CategoryItem = ({item: {id, img, title, cat}}) => {
  return (
    <Card>
      <Image src={img} />
      <Info>
        <Title>{title}</Title>

        {/* Click button to set products's categories */}
        <Link to={`products/${cat}`}>
          <Button>SHOP NOW</Button>
        </Link>
      </Info>
    </Card>
  )
}

export default CategoryItem