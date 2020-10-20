import React, { forwardRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
   display:flex;
   flex-direction:column;
   justify-content:center;
   align-items:flex-start;
   height:60px;
`

const InputStyled = styled.input`
   width:100%;
   border: 1px solid currentColor;
   border-radius:5px;
   padding:8px;
   outline:none;
   font-size:14px;

   &:focus{
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
   }
`

const Error = styled.span`
   color:red;
   font-size:14px;
   position:relative;
`

export const Input = forwardRef((props, ref)=>{

   return (
      <Container>
         <InputStyled {...props} ref={ref}/>
         <Error>{props.error}</Error>
      </Container>
   )
})