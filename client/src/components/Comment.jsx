import React from 'react'
import styled from 'styled-components';
import { Star, StarBorder } from "@mui/icons-material"
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';

const CommentSection = styled.div`
  max-width: 80%;
  margin-left: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 17px;
`

const Vote = styled.div` `

const StarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const Text = styled.div`
  font-size: 12px;
  font-weight: 500;
`

const Comment = () => {
  return (
    <CommentSection>
      <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
      <Vote>
        <StarSection>
          <Star sx={{width: 15, color: 'gray'}}/>
          <Star sx={{width: 15, color: 'gray'}}/>
          <Star sx={{width: 15, color: 'gray'}}/>
          <Star sx={{width: 15, color: 'gray'}}/>
          <StarBorder sx={{width: 15, color: 'gray'}}/>
        </StarSection>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Text>
      </Vote>
    </CommentSection>
  )
}

export default Comment