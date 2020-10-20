import React, { forwardRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
   display:flex;
   justify-content:center;
   align-items:center;
`

const InputStyled = styled.input`
   width:100%;
   border-radius:5px;
   font-size:14px;
   cursor: pointer;
      border-right:4px solid currentColor;
      border-left:4px solid currentColor;

   &[type='range'] {
      overflow: hidden;
      -webkit-appearance: none;
      background-color: currentColor;
      border: 1px solid #fff;
    }

    &[type='range']::-webkit-slider-thumb{
      width: 10px;
      border-radius:5px;
      height: 10px;
      -webkit-appearance: none;
      background-color: #fff;
    }

   &:focus {
    outline: none;
   }
`

export const Range = forwardRef((props, ref)=>{

   return (
      <Container>
         <InputStyled {...props} type="range" ref={ref}/>
      </Container>
   )
})