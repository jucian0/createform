import React, { forwardRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
   display:flex;
   justify-content:center;
   align-items:center;
`

const InputStyled = styled.textarea`
   width:100%;
   min-width:calc(100% - 20px);
   border: 2px solid ${({theme})=> theme.colors.gray};
   border-radius:5px;
   padding:8px;
   font-size:${({theme})=> theme.font.size};

   &::placeholder{
      color:${({theme})=> theme.colors.placeholder};
      font-family:${({theme})=> theme.font.family};
      font-size:${({theme})=> theme.font.size};
   }
`

export const Textarea = forwardRef((props, ref)=>{

   return (
      <Container>
         <InputStyled {...props} ref={ref}/>
      </Container>
   )
})