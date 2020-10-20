import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
   padding:10px 20px;
   min-width:100px;
   border-color:#2EC4B6;
   border-radius:4px;
   background-color:#2EC4B6;
   color:#fff;
   font-size:16px;
   font-weight:400;
   font-stretch:500;
   cursor: pointer;
   &:hover, &:focus{
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      outline:none;
   }
   + button {
      margin-left: 10px;
   }
`

export const Button = ({children,...props})=>{
   return <StyledButton {...props}>{children}</StyledButton>
}

export const Buttons = styled.div`
   display:flex;
   justify-content:flex-end;
   align-items:center;
   margin-top:5px;
}
`